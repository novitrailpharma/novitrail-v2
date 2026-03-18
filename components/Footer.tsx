import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Linkedin,
  ArrowRight,
  Send,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 relative overflow-hidden border-t border-slate-200 dark:border-slate-800">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-novitrail-orange/40 to-transparent" />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.3) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-lg text-slate-900 dark:text-white mb-4 font-semibold">Novitrail Pharmaceuticals</h3>

            <p className="text-sm leading-relaxed">
              A global pharmaceutical marketer, manufacturer, wholesaler, and
              exporter with over 10 years of expertise in pharmaceutical trade.
              Established in 2017, we provide comprehensive sourcing solutions
              for specialty medicines, generic drugs, and surgical disposables.
            </p>

            <div className="border-l-2 border-novitrail-orange/40 pl-4 mt-5">
              <p className="text-sm italic text-slate-500 dark:text-slate-500 leading-relaxed">
                &ldquo;Our mission is to become a holistic pharmaceutical marketing
                company worldwide and achieve sustained growth through
                consistent delivery of innovative, superior quality products
                to meet customer expectations.&rdquo;
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/8 rounded-lg hover:bg-novitrail-orange/15 hover:border-novitrail-orange/25 transition-all text-slate-500 hover:text-novitrail-orange">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/in/abhay-kumar-sen-44aa8714/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/8 rounded-lg hover:bg-novitrail-orange/15 hover:border-novitrail-orange/25 transition-all text-slate-500 hover:text-novitrail-orange">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/about", label: "About Us" },
                { href: "/products", label: "Our Products" },
                { href: "/formulations", label: "Formulations" },
                { href: "/export", label: "Export" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-novitrail-orange transition-colors"
                  >
                    <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Contact Us</h4>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Head Office:</strong><br />
                  SN.123, Vardhman Crown Mall, Sector-19, Dwarka, New Delhi – 110075
                </p>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <p>
                  <strong className="text-slate-700 dark:text-slate-300">Corporate Office:</strong><br />
                  Radha Krishan Complex, Heera Ganj, Katni – 483501
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <p>
                  Tel: +91-7622-490181, 494181<br />
                  Mobile: +91-9990115992
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <p>
                  <a href="mailto:info@novitrail.com" className="hover:text-novitrail-orange transition-colors">info@novitrail.com</a><br />
                  <a href="mailto:novitrailpharma1@gmail.com" className="hover:text-novitrail-orange transition-colors">novitrailpharma1@gmail.com</a>
                </p>
              </div>

              <div className="flex gap-3">
                <Globe className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <a href="https://www.novitrail.com" target="_blank" rel="noopener noreferrer" className="hover:text-novitrail-orange transition-colors">novitrail.com</a>
              </div>

              <div className="flex gap-3">
                <Clock className="text-novitrail-orange mt-0.5 shrink-0" size={16} />
                <p>Mon – Sat: 9:00 AM – 8:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe to receive updates on new products and export markets.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-novitrail-orange/40 focus:border-novitrail-orange/40 placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
              />
              <button className="px-3 py-2.5 bg-novitrail-orange rounded-lg hover:bg-orange-600 transition-colors shrink-0">
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-slate-300 dark:border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <span>© {year} Novitrail Pharmaceuticals. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-novitrail-orange transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-novitrail-orange transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
