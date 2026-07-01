"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/artwork";

export default function GalleryGrid({ artworks }: { artworks: Artwork[] }) {
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((piece, i) => (
        <motion.figure
          key={piece.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900">
            <Image
              src={piece.image}
              alt={piece.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between text-sm">
            <span className="font-medium text-neutral-200">{piece.title}</span>
            <span className="text-neutral-500">{piece.year}</span>
          </figcaption>
          <p className="text-xs text-neutral-500">{piece.medium}</p>
        </motion.figure>
      ))}
    </div>
  );
}
