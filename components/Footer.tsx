import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-novitrail-blue text-gray-300 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="text-xl text-white mb-4">Novitrail Pharmaceuticals</h3>

            <p className="text-sm leading-relaxed">
              A global pharmaceutical marketer, manufacturer, wholesaler, and
              exporter with over 10 years of expertise in pharmaceutical trade.
              Established in 2017, we provide comprehensive sourcing solutions
              for specialty medicines, generic drugs, and surgical disposables.
            </p>

            <div className="border-l-2 border-novitrail-orange pl-4 mt-4">
              <p className="text-sm italic">
                “Our mission is to become a holistic pharmaceutical marketing
                company worldwide and achieve sustained growth through
                consistent delivery of innovative, superior quality products
                to meet customer expectations.”
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-5 text-gray-400">
              <a href="#" className="hover:text-novitrail-orange transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-novitrail-orange transition">
                <Twitter size={18} />
              </a>
              <a href="https://www.linkedin.com/in/abhay-kumar-sen-44aa8714/" target="_blank" rel="noopener noreferrer" className="hover:text-novitrail-orange transition">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
                Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-novitrail-orange">About Us</a></li>
              <li><a href="/products" className="hover:text-novitrail-orange">Our Products</a></li>
              <li><a href="/formulations" className="hover:text-novitrail-orange">Formulations</a></li>
              <li><a href="/export" className="hover:text-novitrail-orange">Export</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <MapPin className="text-novitrail-orange mt-1" size={18} />
                <p>
                  <strong>Head Office:</strong><br />
                  SN.123, Vardhman Crown Mall, Sector-19, Dwarka,
                  New Delhi – 110075
                </p>
              </div>

              <div className="flex gap-3">
                <MapPin className="text-novitrail-orange mt-1" size={18} />
                <p>
                  <strong>Corporate Office:</strong><br />
                  Radha Krishan Complex, Heera Ganj,
                  Katni – 483501
                </p>
              </div>

              <div className="flex gap-3">
                <Phone className="text-novitrail-orange mt-1" size={18} />
                <p>
                  Tel: +91-7622-490181, 494181<br />
                  Mobile: +91-9990115992
                </p>
              </div>

              <div className="flex gap-3">
                <Mail className="text-novitrail-orange mt-1" size={18} />
                <p>
                  <a
                    href="mailto:info@novitrail.com"
                    className="hover:text-novitrail-orange"
                  >
                    info@novitrail.com
                  </a><br />
                  <a
                    href="mailto:novitrailpharma1@gmail.com"
                    className="hover:text-novitrail-orange"
                  >
                    novitrailpharma1@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex gap-3">
                <Globe className="text-novitrail-orange mt-1" size={18} />
                <a
                  href="https://www.novitrail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-novitrail-orange"
                >
                  novitrail.com
                </a>
              </div>

              <div className="flex gap-3">
                <Clock className="text-novitrail-orange mt-1" size={18} />
                <p>Mon – Sat: 9:00 AM – 8:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-3">
              Subscribe to receive updates on new products and export markets.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-novitrail-orange"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-400">
          © {year} Novitrail Pharmaceuticals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
