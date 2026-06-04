"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const TEASER_COUNT = 9;

const images = Array.from({ length: 66 }, (_, i) =>
  `/images/photo-${String(i + 1).padStart(2, "0")}.jpeg`
);

export default function GalleryTeaser() {
  const lightboxRef = useRef<{ openAt: (index: number) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    import("glightbox").then((mod) => {
      lightboxRef.current = mod.default({
        elements: images.slice(0, TEASER_COUNT).map((src) => ({ href: src, type: "image" })),
      });
    });
    return () => lightboxRef.current?.destroy();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Gallery</h2>
        <p className="text-center text-gray-500 mb-12">A glimpse of life at the country home</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.slice(0, TEASER_COUNT).map((src, i) => (
            <button
              key={i}
              onClick={() => lightboxRef.current?.openAt(i)}
              className="relative block aspect-square overflow-hidden rounded-lg hover:opacity-90 transition focus:outline-none"
            >
              <Image src={src} alt={`Gallery photo ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
            </button>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg hover:bg-stone-700 transition"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
