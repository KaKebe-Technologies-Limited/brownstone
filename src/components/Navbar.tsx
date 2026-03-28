"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/#rooms", label: "Rooms" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#location", label: "Location" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-earth-900/95 backdrop-blur-sm border-b border-earth-700/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold text-cream tracking-wide">
              Brownstone
            </span>
            <span className="text-xs text-brand-300 tracking-widest uppercase">
              Country Home · Lira
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-earth-200 hover:text-brand-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/256772480055"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-earth-200 hover:text-brand-300 transition-colors"
            >
              <Phone size={14} />
              WhatsApp
            </a>
            <Link
              href="/book"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-cream text-sm font-medium rounded transition-colors"
            >
              Book Direct
            </Link>
            <a
              href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#003580] hover:bg-[#00266a] text-white text-sm font-medium rounded transition-colors"
            >
              Booking.com
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-cream p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-earth-900 border-t border-earth-700/40 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-earth-200 hover:text-brand-300 text-sm transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="block text-center py-2 bg-brand-600 text-cream text-sm font-medium rounded"
            >
              Book Direct
            </Link>
            <a
              href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 bg-[#003580] text-white text-sm font-medium rounded"
            >
              Book on Booking.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
