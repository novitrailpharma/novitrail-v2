import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as dns } from "node:dns";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_INTERVAL_MS = 3000;
const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  company: 160,
  country: 120,
  message: 4000,
  remarks: 4000,
  product: 160,
  productCount: 20,
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type TurnstileVerificationResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function pruneRateLimitStore(now: number) {
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(key: string, now: number) {
  pruneRateLimitStore(now);

  const existingEntry = rateLimitStore.get(key);
  if (!existingEntry || existingEntry.resetAt <= now) {
    const nextEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
    rateLimitStore.set(key, nextEntry);
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt: nextEntry.resetAt };
  }

  if (existingEntry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existingEntry.resetAt };
  }

  existingEntry.count += 1;
  rateLimitStore.set(key, existingEntry);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - existingEntry.count,
    resetAt: existingEntry.resetAt,
  };
}

function isValidEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return false;
  }

  const domain = email.split("@").pop()?.toLowerCase();
  if (!domain || domain.length > 253 || domain.includes("..")) {
    return false;
  }

  return domain.split(".").every((label) => {
    return (
      label.length > 0 &&
      label.length <= 63 &&
      !label.startsWith("-") &&
      !label.endsWith("-") &&
      /^[a-z0-9-]+$/.test(label)
    );
  });
}

async function hasMailReceivingDomain(email: string) {
  const domain = email.split("@").pop()?.toLowerCase();
  if (!domain) {
    return false;
  }

  try {
    const mxRecords = await dns.resolveMx(domain);
    return mxRecords.some((record) => record.exchange && record.exchange !== ".");
  } catch {
    return false;
  }
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";

  if (!host) {
    return false;
  }

  return origin === `${proto}://${host}`;
}

function isTooLong(value: string, maxLength: number) {
  return value.length > maxLength;
}

async function verifyTurnstileToken(token: string, remoteIp: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (!secretKey) {
    return { success: false, error: "Turnstile is not configured on the server." };
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (remoteIp && remoteIp !== "unknown") {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    return { success: false, error: "Turnstile verification failed." };
  }

  const data = (await response.json()) as TurnstileVerificationResponse;
  if (!data.success) {
    return {
      success: false,
      error: "Please complete the verification challenge and try again.",
    };
  }

  if (
    allowedHostnames.length > 0 &&
    data.hostname &&
    !allowedHostnames.includes(data.hostname)
  ) {
    return {
      success: false,
      error: "Verification hostname did not match the expected domain.",
    };
  }

  return { success: true };
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  const ip = getClientIp(request);

  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json(
        { error: "Request origin is not allowed." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const company = String(body?.company || "").trim();
    const country = String(body?.country || "").trim();
    const message = String(body?.message || "").trim();
    const remarks = String(body?.remarks || "").trim();
    const website = String(body?.website || "").trim();
    const submittedAt = Number(body?.submittedAt || 0);
    const turnstileToken = String(body?.turnstileToken || "").trim();
    const selectedProducts = Array.isArray(body?.selectedProducts)
      ? body.selectedProducts
          .map((value: unknown) => String(value).trim())
          .filter(Boolean)
          .slice(0, MAX_FIELD_LENGTHS.productCount)
      : [];
    const selectedFormulations = Array.isArray(body?.selectedFormulations)
      ? body.selectedFormulations
          .map((value: unknown) => String(value).trim())
          .filter(Boolean)
          .slice(0, MAX_FIELD_LENGTHS.productCount)
      : [];
    const selectedItemCount = selectedProducts.length + selectedFormulations.length;

    if (website) {
      return NextResponse.json(
        { success: true, message: "Your enquiry has been sent successfully." },
        { status: 200 }
      );
    }

    if (!name || !email || !company || !country || !remarks) {
      return NextResponse.json(
        { error: "Name, email, company name, country, and enquiry details are required." },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Please complete the verification challenge." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!(await hasMailReceivingDomain(email))) {
      return NextResponse.json(
        { error: "Please enter an email address with a valid mail-receiving domain." },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(submittedAt) ||
      submittedAt <= 0 ||
      now - submittedAt < MIN_SUBMIT_INTERVAL_MS
    ) {
      return NextResponse.json(
        { error: "Please wait a moment before submitting the form." },
        { status: 400 }
      );
    }

    if (
      isTooLong(name, MAX_FIELD_LENGTHS.name) ||
      isTooLong(email, MAX_FIELD_LENGTHS.email) ||
      isTooLong(company, MAX_FIELD_LENGTHS.company) ||
      isTooLong(country, MAX_FIELD_LENGTHS.country) ||
      isTooLong(message, MAX_FIELD_LENGTHS.message) ||
      isTooLong(remarks, MAX_FIELD_LENGTHS.remarks) ||
      selectedProducts.some((product: string) => isTooLong(product, MAX_FIELD_LENGTHS.product)) ||
      selectedFormulations.some((formulation: string) =>
        isTooLong(formulation, MAX_FIELD_LENGTHS.product)
      )
    ) {
      return NextResponse.json(
        { error: "One or more fields are too long." },
        { status: 400 }
      );
    }

    const turnstileCheck = await verifyTurnstileToken(turnstileToken, ip);
    if (!turnstileCheck.success) {
      return NextResponse.json(
        { error: turnstileCheck.error || "Verification failed." },
        { status: 400 }
      );
    }

    const rateLimitKeys = [`ip:${ip}`, `email:${email.toLowerCase()}`];
    let mostRestrictiveResetAt = now;

    for (const key of rateLimitKeys) {
      const result = checkRateLimit(key, now);
      mostRestrictiveResetAt = Math.max(mostRestrictiveResetAt, result.resetAt);

      if (!result.allowed) {
        const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - now) / 1000));
        return NextResponse.json(
          {
            error: "Too many enquiries from this source. Please try again later.",
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(retryAfterSeconds),
            },
          }
        );
      }
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;
    const contactToEmail = process.env.CONTACT_TO_EMAIL;

    if (!smtpUser || !smtpPass || !smtpFromEmail || !contactToEmail) {
      return NextResponse.json(
        { error: "We could not send your enquiry right now. Please try again shortly." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    let subject = `General Enquiry from ${company}`;
    if (selectedItemCount > 1) {
      subject = `Enquiry for ${selectedItemCount} Items - ${company}`;
    } else if (selectedProducts.length === 1) {
      subject = `Enquiry for ${selectedProducts[0]} - ${company}`;
    } else if (selectedFormulations.length === 1) {
      subject = `Enquiry for ${selectedFormulations[0]} - ${company}`;
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Country: ${country}`,
      selectedProducts.length ? `Our Products: ${selectedProducts.join(", ")}` : "Our Products: None",
      selectedFormulations.length
        ? `Formulations: ${selectedFormulations.join(", ")}`
        : "Formulations: None",
      "",
      "Enquiry Details:",
      remarks,
    ]
      .filter(Boolean)
      .join("\n");

    const buildSelectedItemsHtmlRows = (items: string[], emptyLabel: string) =>
      items.length
        ? items
            .map(
              (item: string, index: number) => `
              <tr>
                <td style="width:56px; padding:10px 12px; border-bottom:1px solid #fed7aa; color:#c2410c; font-size:12px; font-weight:700; text-align:center;">${index + 1}</td>
                <td style="padding:10px 14px; border-bottom:1px solid #fed7aa; color:#7c2d12; font-size:14px; font-weight:600;">${escapeHtml(item)}</td>
              </tr>
            `
            )
            .join("")
        : `
        <tr>
          <td colspan="2" style="padding:12px 14px; color:#64748b; font-size:14px;">No ${escapeHtml(emptyLabel)} selected</td>
        </tr>
      `;

    const html = `
      <div style="margin:0; padding:0; background:#f8fafc; font-family:Arial, sans-serif; color:#0f172a;">
        <div style="max-width:680px; margin:0 auto; padding:28px 16px;">
          <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; overflow:hidden; box-shadow:0 12px 28px rgba(15, 23, 42, 0.08);">
            <div style="background:linear-gradient(135deg, #0f3b67 0%, #145f8d 58%, #f97316 100%); padding:24px 28px; color:#ffffff;">
              <p style="margin:0 0 6px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.82;">Novitrail Website</p>
              <h2 style="margin:0; font-size:24px; line-height:1.25;">New Website Enquiry</h2>
            </div>

            <div style="padding:24px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; border:1px solid #e2e8f0; border-radius:12px; overflow:hidden;">
                <tr>
                  <td colspan="2" style="padding:14px 16px; background:#0f3b67; color:#ffffff; font-size:14px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase;">Enquiry Summary</td>
                </tr>
                <tr>
                  <td style="width:34%; padding:13px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-size:13px; font-weight:700;">Name</td>
                  <td style="padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px; font-weight:600;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-size:13px; font-weight:700;">Email</td>
                  <td style="padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#0f5f8f; font-weight:600; text-decoration:none;">${escapeHtml(email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-size:13px; font-weight:700;">Company</td>
                  <td style="padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px; font-weight:600;">${escapeHtml(company)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569; font-size:13px; font-weight:700;">Country</td>
                  <td style="padding:13px 16px; border-bottom:1px solid #e2e8f0; font-size:14px; font-weight:600;">${escapeHtml(country)}</td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#fffaf5; border-bottom:1px solid #e2e8f0; color:#9a3412; font-size:13px; font-weight:700; vertical-align:top;">Our Products</td>
                  <td style="padding:0; border-bottom:1px solid #e2e8f0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; background:#fffaf5;">
                      <tr>
                        <td style="width:56px; padding:8px 12px; border-bottom:1px solid #fed7aa; color:#9a3412; font-size:11px; font-weight:700; text-align:center; text-transform:uppercase;">No.</td>
                        <td style="padding:8px 14px; border-bottom:1px solid #fed7aa; color:#9a3412; font-size:11px; font-weight:700; text-transform:uppercase;">Item</td>
                      </tr>
                      ${buildSelectedItemsHtmlRows(selectedProducts, "products")}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#fffaf5; border-bottom:1px solid #e2e8f0; color:#9a3412; font-size:13px; font-weight:700; vertical-align:top;">Formulations</td>
                  <td style="padding:0; border-bottom:1px solid #e2e8f0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%; border-collapse:collapse; background:#fffaf5;">
                      <tr>
                        <td style="width:56px; padding:8px 12px; border-bottom:1px solid #fed7aa; color:#9a3412; font-size:11px; font-weight:700; text-align:center; text-transform:uppercase;">No.</td>
                        <td style="padding:8px 14px; border-bottom:1px solid #fed7aa; color:#9a3412; font-size:11px; font-weight:700; text-transform:uppercase;">Item</td>
                      </tr>
                      ${buildSelectedItemsHtmlRows(selectedFormulations, "formulations")}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:13px 16px; background:#f8fafc; color:#475569; font-size:13px; font-weight:700; vertical-align:top;">Enquiry Details</td>
                  <td style="padding:14px 16px; font-size:14px; line-height:1.65;">
                    <pre style="white-space:pre-wrap; margin:0; font-family:Arial, sans-serif; color:#0f172a;">${escapeHtml(remarks)}</pre>
                  </td>
                </tr>
              </table>

              <div style="margin-top:22px; padding-top:16px; border-top:1px solid #e2e8f0; color:#64748b; font-size:12px; line-height:1.6;">
                Reply directly to this email to contact the sender. A copy is attempted to the entered email address via CC.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: smtpFromEmail,
        to: contactToEmail,
        cc: email,
        replyTo: email,
        subject,
        text,
        html,
      });
    } catch {
      const fallbackText = [
        text,
        "",
        "Delivery note: Sending a CC copy to the entered email failed. The entered email may be incorrect or unable to receive mail.",
      ].join("\n");

      const fallbackHtml = `
        ${html}
        <p style="margin-top: 16px; color: #b45309;">
          <strong>Delivery note:</strong> Sending a CC copy to the entered email failed. The entered email may be incorrect or unable to receive mail.
        </p>
      `;

      await transporter.sendMail({
        from: smtpFromEmail,
        to: contactToEmail,
        replyTo: email,
        subject: `[Email CC failed] ${subject}`,
        text: fallbackText,
        html: fallbackHtml,
      });

      return NextResponse.json(
        {
          success: true,
          message:
            "Your enquiry was sent to our team, but we could not send a copy to the entered email address. Please check whether the email is correct and working.",
        },
        {
          status: 202,
          headers: {
            "Cache-Control": "no-store",
            "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
            "X-RateLimit-Reset": String(Math.ceil((mostRestrictiveResetAt - now) / 1000)),
          },
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your enquiry has been sent successfully." },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Limit": String(RATE_LIMIT_MAX_REQUESTS),
          "X-RateLimit-Reset": String(Math.ceil((mostRestrictiveResetAt - now) / 1000)),
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
