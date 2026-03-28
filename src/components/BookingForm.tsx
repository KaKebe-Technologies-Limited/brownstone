"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Calendar, User, Mail, Phone, Users, CheckCircle2 } from "lucide-react";

const rooms = [
  { name: "Bridal Cottage", priceUSD: 99, priceUGX: 360000 },
  { name: "Deluxe Double", priceUSD: 84, priceUGX: 305000 },
  { name: "Standard Double", priceUSD: 72, priceUGX: 262000 },
  { name: "Family Room", priceUSD: 90, priceUGX: 327000 },
  { name: "Standard Triple", priceUSD: 80, priceUGX: 290000 },
  { name: "Deluxe (Shared Bath)", priceUSD: 65, priceUGX: 237000 },
];

type Currency = "UGX" | "USD";

function generateRef() {
  return `BCH-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export default function BookingForm() {
  const params = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    guests: 1,
    room: params.get("room") || rooms[0].name,
    requests: "",
  });

  const [currency, setCurrency] = useState<Currency>("UGX");
  const [submitted, setSubmitted] = useState(false);
  const [txRef] = useState(generateRef);

  const selectedRoom = rooms.find((r) => r.name === form.room) ?? rooms[0];

  const nights =
    form.checkin && form.checkout
      ? Math.max(
          0,
          Math.round(
            (new Date(form.checkout).getTime() - new Date(form.checkin).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalUGX = selectedRoom.priceUGX * Math.max(nights, 1);
  const totalUSD = selectedRoom.priceUSD * Math.max(nights, 1);
  const displayAmount = currency === "UGX" ? totalUGX : totalUSD;

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "FLWPUBK_TEST-XXXX",
    tx_ref: txRef,
    amount: displayAmount,
    currency,
    payment_options: currency === "UGX" ? "mobilemoneyghandaoruganda,card" : "card",
    customer: {
      email: form.email,
      phone_number: form.phone,
      name: form.name,
    },
    customizations: {
      title: "Brownstone Country Home",
      description: `${form.room} · ${Math.max(nights, 1)} night${nights !== 1 ? "s" : ""}`,
      logo: "https://www.brownstone-lira.ug/logo.png",
    },
    meta: {
      room: form.room,
      checkin: form.checkin,
      checkout: form.checkout,
      guests: form.guests,
      special_requests: form.requests,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleFlutterPayment({
      callback: (response) => {
        closePaymentModal();
        if (response.status === "successful") {
          setSubmitted(true);
        }
      },
      onClose: () => {},
    });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <CheckCircle2 size={56} className="text-forest-500 mb-6" />
        <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">
          Booking Confirmed!
        </h2>
        <p className="text-earth-500 max-w-md mb-2">
          Thank you, {form.name}. Your payment was received and your room is
          reserved.
        </p>
        <p className="text-earth-400 text-sm max-w-md mb-8">
          A confirmation has been sent to <strong>{form.email}</strong>. George
          will also reach out on WhatsApp to confirm your arrival time.
        </p>
        <div className="bg-earth-50 rounded-xl p-6 text-left text-sm max-w-sm w-full border border-earth-200">
          <p className="font-semibold text-earth-800 mb-3">Booking Summary</p>
          <div className="space-y-1.5 text-earth-500">
            <p><span className="text-earth-700 font-medium">Room:</span> {form.room}</p>
            <p><span className="text-earth-700 font-medium">Check-in:</span> {form.checkin}</p>
            <p><span className="text-earth-700 font-medium">Check-out:</span> {form.checkout}</p>
            <p><span className="text-earth-700 font-medium">Guests:</span> {form.guests}</p>
            <p>
              <span className="text-earth-700 font-medium">Total paid:</span>{" "}
              {currency === "UGX"
                ? `UGX ${totalUGX.toLocaleString()}`
                : `USD ${totalUSD}`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Room & currency */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            Room Type
          </label>
          <select
            value={form.room}
            onChange={(e) => set("room", e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            {rooms.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name} — UGX {r.priceUGX.toLocaleString()}/night
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            Payment Currency
          </label>
          <div className="flex gap-2">
            {(["UGX", "USD"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                  currency === c
                    ? "bg-brand-600 text-cream border-brand-600"
                    : "bg-white text-earth-600 border-earth-200 hover:border-brand-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Check-in</span>
          </label>
          <input
            type="date"
            value={form.checkin}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => set("checkin", e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Check-out</span>
          </label>
          <input
            type="date"
            value={form.checkout}
            min={form.checkin || new Date().toISOString().split("T")[0]}
            onChange={(e) => set("checkout", e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-earth-700 mb-1.5">
          <span className="flex items-center gap-1.5"><Users size={14} /> Number of Guests</span>
        </label>
        <select
          value={form.guests}
          onChange={(e) => set("guests", Number(e.target.value))}
          className="w-full sm:w-48 px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>

      {/* Guest details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-earth-800 text-sm uppercase tracking-wide">
          Your Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1.5">
              <span className="flex items-center gap-1.5"><User size={14} /> Full Name</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your full name"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder-earth-300 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-1.5">
              <span className="flex items-center gap-1.5"><Phone size={14} /> Phone / WhatsApp</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+256 7XX XXX XXX"
              required
              className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder-earth-300 focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            <span className="flex items-center gap-1.5"><Mail size={14} /> Email Address</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder-earth-300 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-earth-700 mb-1.5">
            Special Requests <span className="text-earth-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={form.requests}
            onChange={(e) => set("requests", e.target.value)}
            rows={3}
            placeholder="Dietary requirements, late arrival, accessibility needs..."
            className="w-full px-3 py-2.5 rounded-lg border border-earth-200 bg-white text-earth-800 text-sm placeholder-earth-300 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
        </div>
      </div>

      {/* Price summary */}
      <div className="bg-earth-50 rounded-xl p-5 border border-earth-200 space-y-2">
        <p className="font-semibold text-earth-800 text-sm">Price Summary</p>
        <div className="flex justify-between text-sm text-earth-500">
          <span>{selectedRoom.name}</span>
          <span>
            {currency === "UGX"
              ? `UGX ${selectedRoom.priceUGX.toLocaleString()}`
              : `$${selectedRoom.priceUSD}`}
            /night
          </span>
        </div>
        {nights > 0 && (
          <div className="flex justify-between text-sm text-earth-500">
            <span>{nights} night{nights !== 1 ? "s" : ""}</span>
            <span>× {nights}</span>
          </div>
        )}
        <div className="border-t border-earth-200 pt-2 flex justify-between font-bold text-earth-800">
          <span>Total</span>
          <span>
            {currency === "UGX"
              ? `UGX ${totalUGX.toLocaleString()}`
              : `USD ${totalUSD}`}
            {nights === 0 && <span className="text-xs font-normal text-earth-400 ml-1">(1 night min)</span>}
          </span>
        </div>
        <p className="text-xs text-earth-400">Breakfast included · Secure payment via Flutterwave</p>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-cream font-bold rounded-xl text-base transition-colors shadow-sm"
      >
        Pay & Confirm Booking
      </button>

      <p className="text-center text-xs text-earth-400">
        Payments are processed securely by Flutterwave. MTN Mobile Money, Airtel
        Money, Visa &amp; Mastercard accepted. Funds go directly to Brownstone
        Country Home.
      </p>
    </form>
  );
}
