import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brownstone Country Home — Lira, Uganda",
  description:
    "A peaceful rural oasis 5 km from Lira Town. Award-winning guesthouse with thatched cottages, restaurant, garden & orchard. TripAdvisor Travelers' Choice #1 in Lira.",
  keywords: ["Lira", "Uganda", "guesthouse", "hotel", "Brownstone", "country home", "accommodation", "northern Uganda"],
  openGraph: {
    title: "Brownstone Country Home — Lira, Uganda",
    description: "Luxurious thatched cottages and modern rooms set among gardens and orchards in northern Uganda.",
    siteName: "Brownstone Country Home",
    locale: "en_UG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
