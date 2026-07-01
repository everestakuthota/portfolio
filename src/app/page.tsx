import Hero from "@/components/Hero";
import FeaturedStrip from "@/components/FeaturedStrip";
import { artworks, featured } from "@/lib/artwork";

export default function Home() {
  const pieces = [artworks[0], artworks[1], featured[0], artworks[3]];

  return (
    <>
      <Hero />
      <FeaturedStrip pieces={pieces} />
    </>
  );
}
