import Link from "next/link";
import { ExternalLink, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Rooms & Rates", href: "/#rooms" },
  { label: "Amenities", href: "/#amenities" },
  { label: "Location", href: "/#location" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Book Direct", href: "/book" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-earth-950 text-earth-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold text-cream mb-2">
              Brownstone Country Home
            </h3>
            <p className="text-earth-400 text-sm mb-5 leading-relaxed">
              A peaceful rural oasis in northern Uganda. TripAdvisor Travelers&apos;
              Choice — #1 Guest House in Lira.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/BrownstoneCountryHome"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-earth-800 hover:bg-earth-700 text-earth-300 hover:text-cream transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink size={16} />
              </a>
              <a
                href="mailto:brownstoneanai@gmail.com"
                className="p-2 rounded-lg bg-earth-800 hover:bg-earth-700 text-earth-300 hover:text-cream transition-colors"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://wa.me/256772480055"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-earth-800 hover:bg-earth-700 text-earth-300 hover:text-cream transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cream font-semibold text-sm mb-4 tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-earth-400 hover:text-brand-300 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-cream font-semibold text-sm mb-4 tracking-wide uppercase">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-500 mt-0.5 shrink-0" />
                <p className="text-earth-400 text-sm">
                  Plot 730, Block 7, Erute County<br />
                  Lira Municipal Council, Uganda
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-brand-500 shrink-0" />
                <a
                  href="https://wa.me/256772480055"
                  className="text-earth-400 hover:text-brand-300 text-sm transition-colors"
                >
                  +256 772 480 055
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-brand-500 shrink-0" />
                <a
                  href="mailto:brownstoneanai@gmail.com"
                  className="text-earth-400 hover:text-brand-300 text-sm transition-colors"
                >
                  brownstoneanai@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-earth-800/50 rounded-xl text-sm">
              <p className="text-cream font-medium mb-1">Check-in / Check-out</p>
              <p className="text-earth-200 text-xs">Check-in: from 2:00 PM</p>
              <p className="text-earth-200 text-xs">Check-out: by 10:00 AM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-earth-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-earth-500">
          <p>© {new Date().getFullYear()} Brownstone Country Home. All rights reserved.</p>
          <p>
            Lira, Uganda ·{" "}
            <a
              href="https://www.tripadvisor.com/Hotel_Review-g800443-d4715193-Reviews-Brownstone_Country_Home-Lira_Northern_Region.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 transition-colors"
            >
              TripAdvisor
            </a>{" "}
            ·{" "}
            <a
              href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 transition-colors"
            >
              Booking.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
