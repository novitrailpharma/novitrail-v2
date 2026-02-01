"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fixed formatting using encodeURIComponent for better email client compatibility
  const subject = `Product Enquiry from ${form.company || "Website"}`;
  const body = `Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Country: ${form.country}

Message:
${form.message}`;

  const mailtoLink = `mailto:info@novitrail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // Basic validation to prevent empty clicks
  const isFormReady = form.name.trim() !== "" && form.email.includes("@");

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl">Enquiry & Contact</h1>

      <p className="mt-3 max-w-2xl text-gray-600">
        For product enquiries, contract manufacturing, and export opportunities,
        please reach out to us using the form below or through our direct contact
        channels.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Enquiry Form */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white hover:border-slate-300 transition">
          <h2 className="text-xl mb-4">Send an Enquiry</h2>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20"
              onChange={handleChange}
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20"
              onChange={handleChange}
            />

            <input
              name="company"
              placeholder="Company Name"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20"
              onChange={handleChange}
            />

            <input
              name="country"
              placeholder="Country"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20"
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your enquiry (products, quantities, market, etc.)"
              rows={4}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20"
              onChange={handleChange}
            />

            <a
              href={isFormReady ? mailtoLink : "#"}
              className={`inline-block px-8 py-3 rounded-md font-medium transition-all text-center ${
                isFormReady
                  ? "bg-novitrail-orange text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              onClick={(e) => !isFormReady && e.preventDefault()}
            >
              Submit Enquiry
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl mb-4">Contact Information</h2>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <MapPin className="text-novitrail-orange mt-1 flex-shrink-0" size={18} />
                <p>
                  <strong>Head Office:</strong>
                  <br />
                  SN.123, Vardhman Crown Mall, Sector-19,
                  <br />
                  Dwarka, New Delhi – 110075
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-novitrail-orange mt-1 flex-shrink-0" size={18} />
                <p>
                  +91-7622-490181, 494181
                  <br />
                  +91-9990115992
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-novitrail-orange mt-1 flex-shrink-0" size={18} />
                <p>
                  <a
                    href="mailto:info@novitrail.com"
                    className="hover:text-novitrail-orange transition"
                  >
                    info@novitrail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="border border-slate-200 rounded-xl p-6 bg-green-50 hover:border-slate-300 transition">
            <h3 className="mb-2">Quick WhatsApp Enquiry</h3>
            <p className="text-sm mb-4">
              For faster communication, contact our sales team on WhatsApp.
            </p>
            <a
              href="https://wa.me/919990115992"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}