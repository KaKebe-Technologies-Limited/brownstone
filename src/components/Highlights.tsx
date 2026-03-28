import { Leaf, Utensils, Wifi, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Leaf,
    title: "Gardens & Orchards",
    desc: "Organically nurtured grounds, outdoor fireplace, and sun terrace set among natural trees.",
  },
  {
    icon: Utensils,
    title: "Restaurant & Bar",
    desc: "African and American cuisines; brunch, lunch, and dinner. Halal, vegetarian & gluten-free menus available.",
  },
  {
    icon: Wifi,
    title: "Solar-Powered",
    desc: "Off-grid solar power system. Free Wi-Fi in all rooms. Mosquito nets, toiletries, and slippers provided.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "24-hour front desk, secured free parking, and babysitting services. Your comfort is our priority.",
  },
];

export default function Highlights() {
  return (
    <section className="bg-earth-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((h) => (
            <div key={h.title} className="flex flex-col items-start gap-3">
              <div className="p-2.5 rounded-lg bg-brand-700/40">
                <h.icon size={22} className="text-brand-300" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-cream">
                {h.title}
              </h3>
              <p className="text-earth-300 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
