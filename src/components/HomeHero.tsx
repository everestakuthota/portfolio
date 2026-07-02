"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import AnimatedEyes from "@/components/AnimatedEyes";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Top lid slides down as the hero scrolls out; fully closed just
  // before the sticky viewport releases. Transform-only.
  const lidY = useTransform(scrollYProgress, [0, 0.9], [0, 132]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Home page swaps the body background for the gradient's end color so
  // the footer and overscroll never show black.
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => document.body.classList.remove("home-bg");
  }, []);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <AnimatedEyes
          lidY={reduceMotion ? null : lidY}
          className="w-[78vw] max-w-[720px]"
        />

        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.35em] text-neutral-900/50"
          style={reduceMotion ? undefined : { opacity: hintOpacity }}
        >
          Scroll
        </motion.p>
      </div>
    </section>
  );
}
