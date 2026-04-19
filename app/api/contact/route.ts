import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const website = String(body?.website || "").trim();
    const submittedAt = Number(body?.submittedAt || 0);
    const turnstileToken = String(body?.turnstileToken || "").trim();
    const selectedProducts = Array.isArray(body?.selectedProducts)
      ? body.selectedProducts
          .map((value: unknown) => String(value).trim())
          .filter(Boolean)
          .slice(0, MAX_FIELD_LENGTHS.productCount)
      : [];

    if (website) {
      return NextResponse.json(
        { success: true, message: "Your enquiry has been sent successfully." },
        { status: 200 }
      );
    }

    if (!name || !email || !country || !message) {
      return NextResponse.json(
        { error: "Name, email, country, and message are required." },
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
      selectedProducts.some((product: string) => isTooLong(product, MAX_FIELD_LENGTHS.product))
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

    let subject = `General Enquiry from ${company || name || "Website"}`;
    if (selectedProducts.length > 1) {
      subject = `Enquiry for ${selectedProducts.length} Formulations - ${company || name || "Website"}`;
    } else if (selectedProducts.length === 1) {
      subject = `Enquiry for ${selectedProducts[0]} - ${company || name || "Website"}`;
    }

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      `Country: ${country}`,
      selectedProducts.length ? `Selected Products: ${selectedProducts.join(", ")}` : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 16px;">New Website Enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
        <p><strong>Country:</strong> ${escapeHtml(country)}</p>
        ${
          selectedProducts.length
            ? `<p><strong>Selected Products:</strong> ${escapeHtml(selectedProducts.join(", "))}</p>`
            : ""
        }
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: Arial, sans-serif; background: #f8fafc; padding: 16px; border-radius: 8px;">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: smtpFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject,
      text,
      html,
    });

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
