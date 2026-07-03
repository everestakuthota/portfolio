"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import AnimatedEyes from "@/components/AnimatedEyes";

export default function HomeHero() {
  const reduceMotion = useReducedMotion();
  const hintRef = useRef<HTMLParagraphElement>(null);

  // Manual scroll tracking (instead of framer's useScroll): the hero sits at
  // the top of the page and spans 200vh with a 100vh sticky viewport, so
  // progress is simply scrollY / viewport height. A plain listener keeps
  // working across client-side navigations, and the hint opacity is written
  // directly so it never waits on an animation frame.
  const progress = useMotionValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    const onScroll = () => {
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / vh));
      progress.set(p);
      if (hintRef.current) {
        // Hint disappears as soon as the user scrolls off the starting view.
        hintRef.current.style.opacity = String(
          Math.max(0, 1 - p / 0.08)
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progress, reduceMotion]);

  // Lid closure: fully shut just before the sticky viewport releases. The
  // lid edge morphs from the eye's top curve to its bottom curve.
  const lidT = useTransform(progress, [0, 0.9], [0, 1]);

  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);

  return (
    <section className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <AnimatedEyes
          lidT={reduceMotion ? null : lidT}
          className="w-[78vw] max-w-[720px]"
        />

        <p
          ref={hintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-neutral-900/50"
        >
          Scroll
        </p>
      </div>
    </section>
  );
}
