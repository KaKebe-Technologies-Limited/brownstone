import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import RoomsSection from "@/components/RoomsSection";
import Amenities from "@/components/Amenities";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import BookingCTA from "@/components/BookingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <RoomsSection />
      <Amenities />
      <Reviews />
      <Location />
      <BookingCTA />
    </>
  );
}
