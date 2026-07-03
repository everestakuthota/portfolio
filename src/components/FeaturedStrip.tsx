"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Artwork } from "@/lib/artwork";

export default function FeaturedStrip({ pieces }: { pieces: Artwork[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl italic text-white">
          <Link
            href="/prints"
            className="transition-opacity hover:opacity-70"
          >
            Available prints
          </Link>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {pieces.map((piece, i) => (
            <motion.div
              key={piece.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href="/prints" className="group block">
                <div
                  className="relative overflow-hidden rounded-lg bg-black/20"
                  style={{ aspectRatio: `${piece.width} / ${piece.height}` }}
                >
                  <Image
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-sm text-white/90">{piece.title}</p>
                <p className="text-xs text-white/60">{piece.medium}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
