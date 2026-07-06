import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { artworks } from "@/lib/artwork";

export const metadata: Metadata = {
  title: "Gallery — Everest",
};

export default function GalleryPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold">
          Gallery
        </h1>
        <p className="mt-3 max-w-lg text-neutral-400">
          A selection of recent work. Click a piece for details.
        </p>

        <GalleryGrid artworks={artworks} />
      </div>
    </section>
  );
}
