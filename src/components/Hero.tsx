import Link from "next/link";
import { Star, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/c7/89/19/brownstone-country-home.jpg')",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/50 to-earth-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16">
        {/* Award badge */}
        <div className="inline-flex items-center gap-2 bg-brand-600/90 text-cream text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Award size={13} />
          TripAdvisor Travelers&apos; Choice · #1 Guest House in Lira
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream leading-tight mb-6">
          A Quiet Oasis in
          <br />
          <span className="text-brand-300">Northern Uganda</span>
        </h1>

        <p className="text-earth-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Thatched cottages and modern rooms set among gardens and orchards,
          just 5&nbsp;km from Lira Town. Warm hospitality, great food, and
          genuine African tranquility.
        </p>

        {/* Star rating */}
        <div className="flex items-center justify-center gap-1 mb-10">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < 4 ? "text-gold fill-gold" : "text-gold fill-gold opacity-60"}
            />
          ))}
          <span className="text-earth-200 text-sm ml-2">4.5 · 49 reviews</span>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book"
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-cream font-semibold rounded-lg text-base transition-all hover:shadow-lg hover:shadow-brand-900/30"
          >
            Book Direct — Best Rate
          </Link>
          <a
            href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#003580] hover:bg-[#00266a] text-white font-semibold rounded-lg text-base transition-all"
          >
            Book on Booking.com
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 animate-bounce">
          <div className="w-0.5 h-10 bg-brand-400/60 mx-auto rounded-full" />
        </div>
      </div>
    </section>
  );
}
