import {
  Utensils,
  Wine,
  Wifi,
  Car,
  Sun,
  Dumbbell,
  Presentation,
  Baby,
  Flame,
  Trees,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

const amenities = [
  { icon: Utensils, label: "Restaurant", desc: "African & American cuisines, all day" },
  { icon: Wine, label: "Bar & Lounge", desc: "Shared bar and lounge area" },
  { icon: Wifi, label: "Free Wi-Fi", desc: "In all rooms and common areas" },
  { icon: Car, label: "Free Parking", desc: "Secure parking on compound" },
  { icon: Sun, label: "Solar Power", desc: "Off-grid solar energy system" },
  { icon: Dumbbell, label: "Fitness Centre", desc: "On-site gym for guests" },
  { icon: Presentation, label: "Conference Room", desc: "Meeting & event facilities" },
  { icon: Trees, label: "Gardens & Orchard", desc: "Sun terrace, BBQ & picnic area" },
  { icon: Flame, label: "Outdoor Fireplace", desc: "Perfect for cool evenings" },
  { icon: Baby, label: "Babysitting", desc: "Childcare available on request" },
  { icon: ShieldCheck, label: "24-hr Front Desk", desc: "Round-the-clock assistance" },
  { icon: CreditCard, label: "Card Payments", desc: "Visa, Mastercard, Amex, UnionPay" },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-20 bg-earth-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 text-xs font-semibold tracking-widest uppercase">
            Facilities
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-earth-800 mt-2 mb-4">
            Amenities
          </h2>
          <p className="text-earth-500 max-w-xl mx-auto text-base">
            Everything you need for a comfortable stay — from fine dining to
            conference facilities, all in a serene garden setting.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {amenities.map((a) => (
            <div
              key={a.label}
              className="bg-white rounded-xl p-5 flex flex-col gap-3 border border-earth-100 hover:border-brand-200 transition-colors"
            >
              <div className="p-2 rounded-lg bg-brand-50 w-fit">
                <a.icon size={20} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-earth-800 text-sm">{a.label}</p>
                <p className="text-earth-400 text-xs mt-0.5">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
