"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import countriesData from "@/data/countries.json"; // Importing your JSON

function ContactForm() {
  const searchParams = useSearchParams();
  const productInterest = searchParams.get("product"); // Backward compatibility
  const productsInterest = searchParams.get("products"); // New multi-select support

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    message: "",
  });

  // Effect: Prefill message if a product(s) is found in URL
  useEffect(() => {
    if (productsInterest) {
      const productList = productsInterest.split(",").map((p) => p.trim());
      
      let messageText = "";
      if (productList.length === 1) {
        messageText = `I am interested in purchasing ${productList[0]}. Please provide a quotation and minimum order quantity (MOQ) details.`;
      } else {
        const bulletPoints = productList.map(p => `- ${p}`).join("\n");
        messageText = `I am interested in purchasing the following formulations:\n${bulletPoints}\n\nPlease provide quotation and minimum order quantity (MOQ) details.`;
      }

      setForm((prev) => ({
        ...prev,
        message: messageText,
      }));
    } else if (productInterest) {
      setForm((prev) => ({
        ...prev,
        message: `I am interested in purchasing ${productInterest}. Please provide a quotation and minimum order quantity (MOQ) details.`,
      }));
    }
  }, [productInterest, productsInterest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Construct Email Subject
  let subject = `General Enquiry from ${form.company || "Website"}`;
  
  if (productsInterest) {
    const count = productsInterest.split(",").length;
    subject = count === 1 
      ? `Enquiry for ${productsInterest} - ${form.company || form.name}`
      : `Enquiry for ${count} Formulations - ${form.company || form.name}`;
  } else if (productInterest) {
    subject = `Enquiry for ${productInterest} - ${form.company || form.name}`;
  }

  const body = `Name: ${form.name}
Email: ${form.email}
Company: ${form.company}
Country: ${form.country}

Message:
${form.message}`;

  const mailtoLink = `mailto:novitrailpharma1@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const isFormReady = form.name.trim() !== "" && form.email.includes("@");

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-8 bg-white dark:bg-dark-card shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Send an Enquiry</h2>

      <div className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="name"
            placeholder="Your Name"
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-bg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20 focus:border-novitrail-orange transition-all placeholder:text-slate-400 dark:text-gray-200"
            onChange={handleChange}
            value={form.name}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-bg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20 focus:border-novitrail-orange transition-all placeholder:text-slate-400 dark:text-gray-200"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            name="company"
            placeholder="Company Name"
            className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-bg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20 focus:border-novitrail-orange transition-all placeholder:text-slate-400 dark:text-gray-200"
            onChange={handleChange}
            value={form.company}
          />

          {/* Country Dropdown */}
          <div className="relative">
            <select
              name="country"
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-bg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20 focus:border-novitrail-orange transition-all appearance-none text-slate-700 dark:text-gray-200 invalid:text-slate-400"
              onChange={handleChange}
              value={form.country}
              required
            >
              <option value="" disabled>Select Country</option>
              {countriesData.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Your enquiry (products, quantities, market, etc.)"
          rows={5}
          className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-bg px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-novitrail-orange/20 focus:border-novitrail-orange transition-all placeholder:text-slate-400 dark:text-gray-200 resize-none"
          onChange={handleChange}
          value={form.message}
        />

        <a
          href={isFormReady ? mailtoLink : "#"}
          className={`block w-full text-center py-4 rounded-lg font-semibold transition-all shadow-md ${isFormReady
              ? "bg-novitrail-orange text-white hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
            }`}
          onClick={(e) => !isFormReady && e.preventDefault()}
        >
          Submit Enquiry via Email
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-slate-50 dark:bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-12">
          <div className="w-12 h-1 bg-novitrail-orange mb-6" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
            Enquiry & Contact
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            For product enquiries, contract manufacturing, and export opportunities,
            please reach out to us using the form below or through our direct contact
            channels.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">

          {/* Left: Enquiry Form (Wrapped in Suspense for useSearchParams) */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96 bg-white dark:bg-dark-card rounded-xl animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>

          {/* Right: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                  <div className="flex gap-4 items-start group">
                    <div className="p-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-lg group-hover:border-novitrail-orange/50 transition-colors">
                      <MapPin className="text-novitrail-orange" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">Head Office</p>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        SN.123, Vardhman Crown Mall, Sector-19,
                        <br />
                        Dwarka, New Delhi – 110075
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    <div className="p-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-lg group-hover:border-novitrail-orange/50 transition-colors">
                      <Phone className="text-novitrail-orange" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">Phone</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">+91-7622-490181, 494181</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">+91-9990115992</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start group">
                    {/* Icon Box */}
                    <div className="p-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-700 rounded-lg group-hover:border-novitrail-orange/50 transition-colors">
                      <Mail className="text-novitrail-orange" size={20} />
                    </div>

                    {/* Text Content */}
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white mb-1">Email</p>
                      <div className="flex flex-col gap-1">
                        <a
                          href="mailto:novitrailpharma1@gmail.com"
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-novitrail-orange transition underline underline-offset-4"
                        >
                          novitrailpharma1@gmail.com
                        </a>
                        <a
                          href="mailto:info@novitrail.com"
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-novitrail-orange transition underline underline-offset-4"
                        >
                          info@novitrail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="border border-green-200/60 dark:border-green-800/40 rounded-xl p-6 bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-dark-surface hover:shadow-md transition-all">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Quick WhatsApp Enquiry</h3>
                <p className="text-sm text-green-800/80 dark:text-green-400/70 mb-4">
                  For faster communication, chat directly with our sales team.
                </p>
                <a
                  href="https://wa.me/919990115992"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}