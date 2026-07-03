import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { prints } from "@/lib/artwork";

export const metadata: Metadata = {
  title: "Available Prints — Everest",
};

export default function PrintsPage() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl italic">
          Available Prints
        </h1>
        <p className="mt-3 max-w-lg text-neutral-400">
          Hand-pulled linocut prints. Shown as printed — mirrored from the
          carved block. Click a piece for details.
        </p>

        <GalleryGrid artworks={prints} />
      </div>
    </section>
  );
}
