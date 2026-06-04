"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PAGE_SIZE = 18;

const allImages = Array.from({ length: 66 }, (_, i) =>
  `/images/photo-${String(i + 1).padStart(2, "0")}.jpeg`
);

export default function GalleryPage() {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const lightboxRef = useRef<{ openAt: (index: number) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    import("glightbox").then((mod) => {
      lightboxRef.current?.destroy();
      lightboxRef.current = mod.default({
        elements: allImages.slice(0, visible).map((src) => ({ href: src, type: "image" })),
      });
    });
    return () => lightboxRef.current?.destroy();
  }, [visible]);

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Gallery</h1>
        <p className="text-center text-gray-500 mb-12">Life at the country home</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.slice(0, visible).map((src, i) => (
            <button
              key={i}
              onClick={() => lightboxRef.current?.openAt(i)}
              className="relative block aspect-square overflow-hidden rounded-lg hover:opacity-90 transition focus:outline-none"
            >
              <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            </button>
          ))}
        </div>
        {visible < allImages.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => Math.min(v + PAGE_SIZE, allImages.length))}
              className="bg-stone-800 text-white px-8 py-3 rounded-lg hover:bg-stone-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
