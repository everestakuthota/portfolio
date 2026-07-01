"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-65px)] items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/artwork/blonded-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-25 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30" />
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <Image
            src="/brand/everest-eyes.png"
            alt=""
            width={900}
            height={106}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[family-name:var(--font-fraunces)] text-6xl italic leading-tight sm:text-8xl"
        >
          Everest
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-4 text-sm uppercase tracking-[0.3em] text-neutral-400"
        >
          Linocut prints · Cover art · Posters
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-6 max-w-lg text-neutral-400"
        >
          Original artwork by Everest Akuthota. New work added regularly —
          prints and originals available soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
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
