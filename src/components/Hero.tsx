"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { artworks } from "@/lib/artwork";

export default function Hero() {
  const bg = artworks[0];

  return (
    <section className="relative flex min-h-[calc(100vh-65px)] items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={bg.image}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-30 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
      </div>

      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neutral-400"
        >
          Original artwork &amp; prints
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-fraunces)] text-5xl italic leading-tight sm:text-7xl"
        >
          I make things
          <br />
          worth looking at.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-lg text-neutral-400"
        >
          A collection of paintings, drawings, and digital pieces. New work
          added regularly — prints and originals available soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-950 transition-transform hover:scale-105"
          >
            View the gallery
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
