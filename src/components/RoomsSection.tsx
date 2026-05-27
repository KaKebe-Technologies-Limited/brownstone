import Link from "next/link";
import Image from "next/image";
import { Users, BedDouble, Maximize2 } from "lucide-react";

const rooms = [
  {
    name: "Bridal Cottage",
    type: "Thatched Suite",
    description:
      "Romantic thatched cottage set in the garden. Private bathroom, patio, and all the charm of authentic African architecture.",
    guests: 2,
    size: "27 m²",
    priceUSD: 99,
    priceUGX: "360,000",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/fe/03/e9/bridal-cottage.jpg",
    features: ["Private bathroom", "Garden patio", "Mosquito net", "Wi-Fi"],
  },
  {
    name: "Deluxe Double",
    type: "Deluxe Room",
    description:
      "Spacious deluxe room with garden views, work desk, wardrobe, and en-suite bathroom. Ideal for business travelers and couples.",
    guests: 2,
    size: "18 m²",
    priceUSD: 84,
    priceUGX: "305,000",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/4a/cf/f3/brownstone-country-home.jpg",
    features: ["En-suite bathroom", "Garden view", "Work desk", "Wi-Fi"],
  },
  {
    name: "Standard Double",
    type: "Standard Room",
    description:
      "Comfortable standard room with garden view and private or shared bathroom. Clean, cozy, and excellent value in northern Uganda.",
    guests: 2,
    size: "12 m²",
    priceUSD: 72,
    priceUGX: "262,000",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/5f/87/ba/brownstone-country-home.jpg",
    features: ["Garden view", "Mosquito net", "Toiletries", "Wi-Fi"],
  },
  {
    name: "Family Room",
    type: "Standard Family",
    description:
      "Spacious family room accommodating up to 4 guests. Perfect for families visiting northern Uganda or groups passing through Lira.",
    guests: 4,
    size: "22 m²",
    priceUSD: 90,
    priceUGX: "327,000",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/c7/89/19/brownstone-country-home.jpg",
    features: ["Multiple beds", "Private bathroom", "Garden view", "Wi-Fi"],
  },
];

export default function RoomsSection() {
  return (
    <section id="rooms" className="py-20 bg-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 text-xs font-semibold tracking-widest uppercase">
            Accommodation
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-earth-800 mt-2 mb-4">
            Rooms & Cottages
          </h2>
          <p className="text-earth-500 max-w-xl mx-auto text-base">
            16 rooms total — from cozy standard rooms to our iconic thatched
            bridal cottage. All rates include breakfast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-earth-100 hover:shadow-md transition-shadow group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-earth-100">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-earth-900/80 text-cream text-xs px-2.5 py-1 rounded-full">
                    {room.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-earth-800">
                    {room.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-brand-600 font-bold text-lg">
                      ${room.priceUSD}
                      <span className="text-sm font-normal text-earth-400">
                        /night
                      </span>
                    </p>
                    <p className="text-xs text-earth-400">
                      ≈ UGX {room.priceUGX}
                    </p>
                  </div>
                </div>

                <p className="text-earth-500 text-sm leading-relaxed mb-4">
                  {room.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-earth-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={13} /> {room.guests} guests
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 size={13} /> {room.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble size={13} /> {room.type}
                  </span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full border border-forest-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/book?room=${encodeURIComponent(room.name)}`}
                  className="block w-full text-center py-2.5 bg-brand-600 hover:bg-brand-500 text-cream text-sm font-semibold rounded-lg transition-colors"
                >
                  Book This Room
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-earth-400 text-sm mt-8">
          More room types available.{" "}
          <a
            href="mailto:brownstoneanai@gmail.com"
            className="text-brand-600 hover:underline"
          >
            Contact us
          </a>{" "}
          or{" "}
          <a
            href="https://www.booking.com/hotel/ug/brownstone-country-home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 hover:underline"
          >
            view all on Booking.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
