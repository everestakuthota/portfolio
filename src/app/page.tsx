import HomeHero from "@/components/HomeHero";
import FeaturedStrip from "@/components/FeaturedStrip";
import { prints } from "@/lib/artwork";

export default function Home() {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #87CEEB 0%, #B8D8E8 14%, #FDB99B 32%, #F6828C 46%, #6B4E9B 64%, #3b2b5e 84%, #241a3d 100%)",
      }}
    >
      <HomeHero />
      <FeaturedStrip pieces={prints} />
    </div>
  );
}
