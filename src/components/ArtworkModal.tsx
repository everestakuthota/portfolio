"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Artwork } from "@/lib/artwork";

export default function ArtworkModal({
  artwork,
  onClose,
}: {
  artwork: Artwork | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!artwork) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative grid max-h-full w-full max-w-3xl grid-cols-1 gap-6 overflow-y-auto rounded-lg bg-neutral-950 p-6 sm:grid-cols-[1.3fr_1fr] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 text-neutral-500 transition-colors hover:text-neutral-100"
            >
              ✕
            </button>

            <div
              className="relative w-full self-start overflow-hidden rounded-md bg-neutral-900"
              style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}
            >
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                sizes="(min-width: 640px) 60vw, 90vw"
                className="object-contain"
              />
            </div>

            <div className="flex flex-col pt-1">
              <h2 className="pr-6 text-2xl italic">
                {artwork.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                {artwork.year} — {artwork.medium}
              </p>

              <p className="mt-4 flex-1 text-sm text-neutral-400">
                {artwork.description || "More details coming soon."}
              </p>

              <span className="mt-6 inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-full border border-neutral-800 px-5 py-2.5 text-sm text-neutral-500">
                Buy print — coming soon
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
