import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "James R.",
    date: "December 2024",
    rating: 5,
    text: "George and Anna and staff are customer focused. Very accommodating to westerners. The rooms are nice, the food is very good. A truly memorable stay in northern Uganda.",
    platform: "TripAdvisor",
  },
  {
    name: "Sarah M.",
    date: "October 2024",
    rating: 5,
    text: "Anna and her staff have carved a magical place out of rural Lira. You will be treated to a quiet restful setting with superb hospitality. Highly recommend!",
    platform: "TripAdvisor",
  },
  {
    name: "David K.",
    date: "August 2024",
    rating: 4,
    text: "We had hut 6 — a small thatched room with private loo and shower. It was very comfortable. George is very responsive on WhatsApp which makes everything smooth.",
    platform: "TripAdvisor",
  },
];

const scores = [
  { label: "Cleanliness", value: 4.6 },
  { label: "Service", value: 4.7 },
  { label: "Sleep Quality", value: 4.7 },
  { label: "Value", value: 4.5 },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-earth-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-400 text-xs font-semibold tracking-widest uppercase">
            What Guests Say
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-cream mt-2 mb-4">
            Guest Reviews
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="text-earth-300 font-semibold">4.5 / 5</span>
            <span className="text-earth-400 text-sm">· 49 reviews on TripAdvisor</span>
          </div>

          {/* Score bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {scores.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-cream font-bold text-xl font-serif">{s.value}</p>
                <p className="text-earth-400 text-xs mt-0.5">{s.label}</p>
                <div className="mt-1.5 h-1 bg-earth-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${(s.value / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-earth-800 rounded-2xl p-6 border border-earth-700/50 flex flex-col"
            >
              <Quote size={24} className="text-brand-500 mb-4 opacity-60" />
              <p className="text-earth-200 text-sm leading-relaxed flex-1 mb-5">
                {r.text}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cream font-semibold text-sm">{r.name}</p>
                  <p className="text-earth-400 text-xs">{r.date}</p>
                </div>
                <div className="flex">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.tripadvisor.com/Hotel_Review-g800443-d4715193-Reviews-Brownstone_Country_Home-Lira_Northern_Region.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm transition-colors"
          >
            Read all 49 reviews on TripAdvisor →
          </a>
        </div>
      </div>
    </section>
  );
}
