"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, User, Mail, Phone, Users, Loader2 } from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    try {
      const res = await fetch("/api/pesapal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generateRef(),
          currency,
          amount: displayAmount,
          description: `${form.room} · ${Math.max(nights, 1)} night${nights !== 1 ? "s" : ""} · ${form.name}`,
          billing: {
            email: form.email || undefined,
            phone: form.phone,
            firstName,
            lastName,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to initiate payment");
      }

      const { redirect_url } = await res.json();
      window.location.href = redirect_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
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
            <span className="flex items-center gap-1.5">
              <Mail size={14} /> Email Address{" "}
              <span className="text-earth-400 font-normal">(optional)</span>
            </span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="your@email.com"
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
        <p className="text-xs text-earth-400">Breakfast included · Secure payment via Pesapal</p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:bg-earth-300 text-cream font-bold rounded-xl text-base transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Connecting to Pesapal...
          </>
        ) : (
          "Pay & Confirm Booking"
        )}
      </button>

      <p className="text-center text-xs text-earth-400">
        Payments are processed securely by Pesapal. MTN Mobile Money, Airtel
        Money, Visa &amp; Mastercard accepted. Funds go directly to Brownstone
        Country Home.
      </p>
    </form>
  );
}
