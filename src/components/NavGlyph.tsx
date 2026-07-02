"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
];

export default function NavGlyph() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [60, 360], [0, 1]);

  useMotionValueEvent(scrollY, "change", (v) => setActive(v > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const interactive = active || reduceMotion;

  return (
    <>
      <motion.button
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
        style={reduceMotion ? undefined : { opacity }}
        className={`fixed right-5 top-5 z-50 flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full border border-white/20 bg-neutral-950/70 shadow-lg backdrop-blur transition-transform hover:scale-105 ${
          interactive ? "" : "pointer-events-none"
        }`}
      >
        <span className="h-[2px] w-5 rounded-full bg-neutral-100" />
        <span className="h-[2px] w-5 rounded-full bg-neutral-100" />
        <span className="h-[2px] w-5 rounded-full bg-neutral-100" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-5 top-5 flex w-56 flex-col gap-1 rounded-2xl border border-neutral-800 bg-neutral-950/95 p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-2 flex items-center justify-between">
                <img
                  src="/brand/everest-eyes-bw.svg"
                  alt="Everest"
                  className="h-4 w-auto"
                />
                <button
                  aria-label="Close navigation"
                  onClick={() => setOpen(false)}
                  className="text-neutral-500 transition-colors hover:text-neutral-100"
                >
                  ✕
                </button>
              </div>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-neutral-100"
                >
                  {link.label}
                </Link>
              ))}
              <span className="mt-1 cursor-not-allowed rounded-lg border border-neutral-800 px-3 py-2 text-center text-xs text-neutral-500">
                Shop — coming soon
              </span>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
