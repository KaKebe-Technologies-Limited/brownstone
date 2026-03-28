import { MapPin, Clock, Car, Phone } from "lucide-react";

const directions = [
  {
    icon: Car,
    label: "From Lira Town",
    desc: "5 km · ~10 minutes drive along the Lira–Aduku/Apac road. Turn off 3 km past the Aduku Road junction.",
  },
  {
    icon: Car,
    label: "From Kampala",
    desc: "Approx. 4–5 hours north via Karuma. Brownstone is an ideal first or last night stop on the way to/from Kidepo or Murchison Falls.",
  },
  {
    icon: Car,
    label: "From Entebbe Airport",
    desc: "Approx. 153 miles (246 km). Allow 5–6 hours. 4WD recommended for the final approach road.",
  },
];

const nearby = [
  "Murchison Falls National Park",
  "Kidepo Valley National Park",
  "Sipi Falls",
  "Lira Town Centre (5 km)",
];

export default function Location() {
  return (
    <section id="location" className="py-20 bg-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 text-xs font-semibold tracking-widest uppercase">
            Find Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-earth-800 mt-2 mb-4">
            Location & Getting Here
          </h2>
          <p className="text-earth-500 max-w-xl mx-auto">
            Plot 730, Block 7, Erute County, Lira Municipal Council · P.O. Box 323, Lira
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden border border-earth-200 shadow-sm aspect-video lg:aspect-auto lg:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4!2d32.853622!3d2.216834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTMnMDAuNiJOIDMywrA1MScxMy4wIkU!5e0!3m2!1sen!2sug!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Brownstone Country Home location map"
            />
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Check-in/out */}
            <div className="flex items-start gap-4 p-5 bg-earth-50 rounded-xl border border-earth-100">
              <Clock size={20} className="text-brand-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-earth-800 mb-1">Check-in & Check-out</p>
                <p className="text-earth-500 text-sm">Check-in from <strong>2:00 PM</strong></p>
                <p className="text-earth-500 text-sm">Check-out by <strong>10:00 AM</strong></p>
                <p className="text-earth-400 text-xs mt-1">Please notify the property of your arrival time in advance.</p>
              </div>
            </div>

            {/* Directions */}
            <div className="space-y-4">
              {directions.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-brand-50 shrink-0">
                    <d.icon size={16} className="text-brand-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-earth-800 text-sm">{d.label}</p>
                    <p className="text-earth-500 text-sm mt-0.5">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address & contact */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-brand-50 shrink-0">
                <MapPin size={16} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-earth-800 text-sm">Address</p>
                <p className="text-earth-500 text-sm mt-0.5">
                  Plot 730, Block 7, Erute County<br />
                  Lira Municipal Council, Uganda<br />
                  P.O. Box 323, Lira
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-brand-50 shrink-0">
                <Phone size={16} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-earth-800 text-sm">Contact</p>
                <a
                  href="https://wa.me/256772480055"
                  className="text-brand-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +256 772 480 055 (WhatsApp)
                </a>
                <br />
                <a
                  href="mailto:brownstoneanai@gmail.com"
                  className="text-brand-600 hover:underline text-sm"
                >
                  brownstoneanai@gmail.com
                </a>
              </div>
            </div>

            {/* Nearby */}
            <div>
              <p className="font-semibold text-earth-800 text-sm mb-2">Nearby Attractions</p>
              <div className="flex flex-wrap gap-2">
                {nearby.map((n) => (
                  <span
                    key={n}
                    className="text-xs bg-forest-50 text-forest-700 border border-forest-200 px-2.5 py-1 rounded-full"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
