import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";
import { Shield, Clock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Direct — Brownstone Country Home",
  description:
    "Book your stay at Brownstone Country Home, Lira, Uganda. Pay via MTN Mobile Money, Airtel, or card. Best rates guaranteed.",
};

export default function BookPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-brand-600 text-xs font-semibold tracking-widest uppercase">
            Direct Booking
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-earth-800 mt-2 mb-3">
            Book Your Stay
          </h1>
          <p className="text-earth-500 max-w-lg mx-auto">
            No OTA commission. Pay directly to Brownstone Country Home via MTN
            Mobile Money, Airtel Money, or international card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-earth-100 p-8">
            <Suspense fallback={<div className="text-earth-400 text-sm">Loading booking form...</div>}>
              <BookingForm />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Why book direct */}
            <div className="bg-white rounded-2xl p-6 border border-earth-100 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-earth-800 mb-4">
                Why Book Direct?
              </h3>
              <ul className="space-y-3">
                {[
                  "Best rate — no middleman markup",
                  "Support the property directly",
                  "Pay via MTN or Airtel mobile money",
                  "Flexible cancellation (contact us)",
                  "Instant WhatsApp confirmation from George",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-earth-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-500 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust signals */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-earth-100 shadow-sm">
                <Shield size={18} className="text-forest-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-earth-800 font-semibold text-sm">Secure Payments</p>
                  <p className="text-earth-400 text-xs mt-0.5">
                    Processed by Pesapal — trusted across East Africa
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-earth-100 shadow-sm">
                <Clock size={18} className="text-forest-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-earth-800 font-semibold text-sm">Instant Confirmation</p>
                  <p className="text-earth-400 text-xs mt-0.5">
                    Email confirmation immediately after payment
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-earth-100 shadow-sm">
                <MessageCircle size={18} className="text-forest-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-earth-800 font-semibold text-sm">WhatsApp Support</p>
                  <p className="text-earth-400 text-xs mt-0.5">
                    George personally follows up on every booking
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-earth-800 rounded-2xl p-6 text-earth-200">
              <p className="font-serif text-base font-bold text-cream mb-2">
                Need Help Booking?
              </p>
              <p className="text-sm text-earth-300 mb-4">
                George is very responsive on WhatsApp — reach out any time.
              </p>
              <a
                href="https://wa.me/256772480055"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2.5 bg-brand-600 hover:bg-brand-500 text-cream text-sm font-semibold rounded-lg transition-colors"
              >
                WhatsApp: +256 772 480 055
              </a>
              <a
                href="mailto:brownstoneanai@gmail.com"
                className="block w-full text-center py-2 text-earth-400 hover:text-brand-300 text-sm transition-colors mt-2"
              >
                brownstoneanai@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
