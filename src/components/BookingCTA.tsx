import Link from "next/link";
import { BadgePercent, Globe } from "lucide-react";

export default function BookingCTA() {
  return (
    <section className="py-20 bg-brand-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-brand-200 text-xs font-semibold tracking-widest uppercase">
          Ready to Visit?
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mt-2 mb-4">
          Book Your Stay
        </h2>
        <p className="text-brand-100 max-w-xl mx-auto mb-12 text-base">
          Book direct for the best rate and pay straight to the property — or
          use Booking.com if you prefer a familiar platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Direct booking card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-brand-50">
              <BadgePercent size={28} className="text-brand-600" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-earth-800 mb-1">
                Book Direct
              </h3>
              <p className="text-earth-500 text-sm">
                Best rate guaranteed. Pay securely via mobile money (MTN/Airtel)
                or card — funds go directly to Brownstone.
              </p>
            </div>
            <ul className="text-xs text-earth-500 space-y-1 text-left w-full">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" />
                No OTA commission — support the property directly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" />
                MTN Mobile Money, Airtel Money, Visa &amp; Mastercard
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 shrink-0" />
                Instant confirmation by email &amp; WhatsApp
              </li>
            </ul>
            <Link
              href="/book"
              className="w-full text-center py-3 bg-brand-600 hover:bg-brand-500 text-cream font-semibold rounded-lg transition-colors"
            >
              Book Direct Now
            </Link>
          </div>

          {/* Booking.com card */}
          <div className="bg-[#003580] rounded-2xl p-8 flex flex-col items-center gap-4 shadow-lg">
            <div className="p-3 rounded-full bg-white/10">
              <Globe size={28} className="text-white" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-xl font-bold text-white mb-1">
                Booking.com
              </h3>
              <p className="text-blue-200 text-sm">
                Already listed on Booking.com. Use this option if you prefer to
                pay via their platform or have existing booking credits.
              </p>
            </div>
            <ul className="text-xs text-blue-200 space-y-1 text-left w-full">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                Familiar platform with buyer protections
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                Free cancellation options available
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0" />
                Genius rewards applicable
              </li>
            </ul>
            <a
              href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-3 bg-white text-[#003580] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Book on Booking.com
            </a>
          </div>
        </div>

        <p className="text-brand-200 text-sm mt-8">
          Questions?{" "}
          <a
            href="https://wa.me/256772480055"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream underline hover:no-underline"
          >
            Message George on WhatsApp
          </a>{" "}
          — he&apos;s very responsive.
        </p>
      </div>
    </section>
  );
}
