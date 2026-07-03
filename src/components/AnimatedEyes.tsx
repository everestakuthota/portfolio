"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

// Paths from brand logo (art/brandlogo.svg), viewBox trimmed to content.
const R_OUTLINE =
  "M629.64,585.1c-3.34-1.82,4.39-47.16,40.75-73.98c5.75-4.24,23.9-17.63,48.28-18.81c16.67-0.81,39.83,3.93,45.14,5.02 c2.75,0.56,6.43,1.37,12.54,2.51c9.33,1.74,18.67,3.47,28.84,4.39c6.35,0.57,17.66,1.53,31.98,0c11.25-1.2,19.25-3.4,31.98-6.9 c17.11-4.7,18.81-6.5,30.09-9.4c5.52-1.42,20.74-5.01,40.13-5.02c13.89-0.01,33.98-0.01,55.17,10.03 c9.3,4.41,9.05,6.12,29.57,17.21c13,7.03,19.51,10.54,26.23,12.88c23.09,8.03,43.89,4.99,43.89,5.64c0,0.56-15.43-0.46-35.11,4.39 c-6.01,1.48-10.59,3.06-12.54,3.76c-15.7,5.63-26.25,13.1-28.21,14.42c-14.86,10.01-97.67,45.3-198.75,43.26 c-47.64-0.96-92.71-1.87-118.5-16.93c-3.72-2.17-19.49-11.91-37.58-9.73c-12.09,1.45-21.67,7.38-21.67,7.38 C633.27,580.55,630.86,585.76,629.64,585.1z";
const L_OUTLINE =
  "M565.77,587.33c3.34-1.82-4.39-47.16-40.75-73.98c-5.75-4.24-23.9-17.63-48.28-18.81c-16.67-0.81-39.83,3.93-45.14,5.02 c-2.75,0.56-6.43,1.37-12.54,2.51c-9.33,1.74-18.67,3.47-28.84,4.39c-6.35,0.57-17.66,1.53-31.98,0c-11.25-1.2-19.25-3.4-31.98-6.9 c-17.11-4.7-18.81-6.5-30.09-9.4c-5.52-1.42-20.74-5.01-40.13-5.02c-13.89-0.01-33.98-0.01-55.17,10.03 c-9.3,4.41-9.05,6.12-29.57,17.21c-13,7.03-19.51,10.54-26.23,12.88c-23.09,8.03-43.89,4.99-43.89,5.64 c0,0.56,15.43-0.46,35.11,4.39c6.01,1.48,10.59,3.06,12.54,3.76c15.7,5.63,26.25,13.1,28.21,14.42 c14.86,10.01,97.67,45.3,198.75,43.26c47.64-0.96,92.71-1.87,118.5-16.93c3.72-2.17,19.49-11.91,37.58-9.73 c12.09,1.45,21.67,7.38,21.67,7.38C562.15,582.79,564.56,587.99,565.77,587.33z";
const R_SCLERA =
  "M749.92,507.99c-7.65,8.1-4.85,23.25-1.25,42.63c0.58,2.62,1.49,6.34,2.85,10.76 c1.64,5.32,2.49,8.04,4.05,10.56c3.38,5.49,8.51,8.03,11.29,9.4c16.5,8.17,50.39,7.17,58.31,6.9c37.67-1.31,45.88-4.24,52.67-10.03 c5.74-4.9,10.53-11.91,11.91-13.99c6.84-10.33,9.54-20.01,11.09-25.4c1.81-6.31,2.44-11.23,2.92-14.78 c1.99-14.72,2.99-22.08,0.41-25.44c-7.44-9.73-35.75,13.46-77.12,15.67C784.83,516.52,762.05,495.16,749.92,507.99z";
const L_SCLERA =
  "M445.49,510.23c7.65,8.1,4.85,23.25,1.25,42.63c-0.58,2.62-1.49,6.34-2.85,10.76 c-1.64,5.32-2.49,8.04-4.05,10.56c-3.38,5.49-8.51,8.03-11.29,9.4c-16.5,8.17-50.39,7.17-58.31,6.9 c-37.67-1.31-45.88-4.24-52.67-10.03c-5.74-4.9-10.53-11.91-11.91-13.99c-6.84-10.33-9.54-20.01-11.09-25.4 c-1.81-6.31-2.44-11.23-2.92-14.78c-1.99-14.72-2.99-22.08-0.41-25.44c7.44-9.73,35.75,13.46,77.12,15.67 C410.59,518.75,433.37,497.39,445.49,510.23z";
const R_RING =
  "M776.83,509.23c-1.02,0.66-1.6,1.54-1.9,2.17c-4.78,9.85-4.21,20.1-4.21,20.1c0.29,5.14,0.87,13.67,6.43,22.89 c1.22,2.03,6.76,10.84,18.03,16.78c11.04,5.82,21.26,5.55,26.97,5.33c4.64-0.18,20.34-1.01,34.96-12.23c0,0,24.1-18.5,22.26-58.17 c-0.03-0.56-0.09-2.05-1.1-2.82c-1.4-1.08-3.78-0.15-4.66,0.19c-5.29,2.04-10.86,3.28-16.14,5.34c-4.48,1.75-7.88,2.38-14.69,3.64 c-3.71,0.69-10.74,1.99-18.69,1.94c-12.96-0.08-34.05-3.79-40.9-5.58C782.16,508.54,779.16,507.71,776.83,509.23z";
const L_RING =
  "M418.59,511.47c1.02,0.66,1.6,1.54,1.9,2.17c4.78,9.85,4.21,20.1,4.21,20.1c-0.29,5.14-0.87,13.67-6.43,22.89 c-1.22,2.03-6.76,10.84-18.03,16.78c-11.04,5.82-21.26,5.55-26.97,5.33c-4.64-0.18-20.34-1.01-34.96-12.23 c0,0-24.1-18.5-22.26-58.17c0.03-0.56,0.09-2.05,1.1-2.82c1.4-1.08,3.78-0.15,4.66,0.19c5.29,2.04,10.86,3.28,16.14,5.34 c4.48,1.75,7.88,2.38,14.69,3.64c3.71,0.69,10.74,1.99,18.69,1.94c12.96-0.08,34.05-3.79,40.9-5.58 C413.26,510.77,416.26,509.95,418.59,511.47z";
const R_IRIS =
  "M800.13,513.59c-1.6,1.15-2.02,3.04-2.8,6.76c-0.45,2.13-0.97,4.61-0.79,7.88c0.11,2.03,0.68,8.22,4.59,13.49 c6.78,9.13,18.97,9.29,21.64,9.32c1.67,0.02,13.44-0.01,22.14-8.82c3.33-3.37,4.86-6.67,6.54-10.28c0,0,3.98-8.57,2.78-18.54 c-0.05-0.46-0.2-1.07-0.66-1.52c-0.75-0.73-1.91-0.67-2.45-0.63c-4.08,0.31-17.28,2.79-24.85,3.04c-2.96,0.1-5.76-0.11-8.33-0.31 c-2.22-0.17-6.18-0.54-11-0.87C802.24,512.79,801.2,512.82,800.13,513.59z";
const L_IRIS =
  "M395.29,515.83c1.6,1.15,2.02,3.04,2.8,6.76c0.45,2.13,0.97,4.61,0.79,7.88c-0.11,2.03-0.68,8.22-4.59,13.49 c-6.78,9.13-18.97,9.29-21.64,9.32c-1.67,0.02-13.44-0.01-22.14-8.82c-3.33-3.37-4.86-6.67-6.54-10.28c0,0-3.98-8.57-2.78-18.54 c0.05-0.46,0.2-1.07,0.66-1.52c0.75-0.73,1.91-0.67,2.45-0.63c4.08,0.31,17.28,2.79,24.85,3.04c2.96,0.1,5.76-0.11,8.33-0.31 c2.22-0.17,6.18-0.54,11-0.87C393.18,515.03,394.22,515.06,395.29,515.83z";
const R_CORNER_OUT =
  "M983.1,494.28c-0.26,0.38,0.19,1.37,1.08,3.34c0.61,1.35,1.25,2.46,1.77,3.28c0,0,2.81,4.63,3.83,12.87 c0.88,7.12-1.28,12.87-3.7,19.29c-1.15,3.06-4.41,11.05-11.27,19.63c-2.18,2.73-5.73,7.11-11.47,11.48 c-7.63,5.8-13.91,7.62-13.7,8.18c0.18,0.49,8.27-2.14,24.43-7.44c12.13-3.97,18.46-6.13,24.11-12.22c0.57-0.61,2.53-2.77,4.49-6.03 c4.41-7.35,5.09-14.12,5.75-20.66c0.78-7.7-0.06-11.98-0.63-14.22c-0.47-1.86-0.86-3.32-1.85-5.08c-0.55-0.97-2.57-4.31-10.9-8.61 C991.31,496.17,984.04,492.88,983.1,494.28z";
const R_CORNER_IN =
  "M703.32,500.3c0.73,1-2.85,4.1-6.68,9c-3.86,4.93-11.76,15.05-12.25,27c-0.48,11.75,6.47,20.9,9.53,24.94 c6.91,9.12,15.53,13.7,15.11,14.32c-0.32,0.47-4.71-3-12.6-6.22c-9.91-4.04-19.74-6.72-19.74-6.72c-1.78-0.49-4.38-1.16-6.88-3.32 c-2.76-2.39-3.9-5.29-4.49-6.86c-0.79-2.09-1.59-5.69-1.09-11.84c1.07-13.06,8.62-21.95,9.96-23.48 c4.07-4.67,8.01-6.99,14.59-10.87C693.25,503.63,702.26,498.85,703.32,500.3z";
const L_CORNER_OUT =
  "M212.31,496.51c0.26,0.38-0.19,1.37-1.08,3.34c-0.61,1.35-1.25,2.46-1.77,3.28c0,0-2.81,4.63-3.83,12.87 c-0.88,7.12,1.28,12.87,3.7,19.29c1.15,3.06,4.41,11.05,11.27,19.63c2.18,2.73,5.73,7.11,11.47,11.48 c7.63,5.8,13.91,7.62,13.7,8.18c-0.18,0.49-8.27-2.14-24.43-7.44c-12.13-3.97-18.46-6.13-24.11-12.22 c-0.57-0.61-2.53-2.77-4.49-6.03c-4.41-7.35-5.09-14.12-5.75-20.66c-0.78-7.7,0.06-11.98,0.63-14.22c0.47-1.86,0.86-3.32,1.85-5.08 c0.55-0.97,2.57-4.31,10.9-8.61C204.11,498.4,211.38,495.11,212.31,496.51z";
const L_CORNER_IN =
  "M492.1,502.54c-0.73,1,2.85,4.1,6.68,9c3.86,4.93,11.76,15.05,12.25,27c0.48,11.75-6.47,20.9-9.53,24.94 c-6.91,9.12-15.53,13.7-15.11,14.32c0.32,0.47,4.71-3,12.6-6.22c9.91-4.04,19.74-6.72,19.74-6.72c1.78-0.49,4.38-1.16,6.88-3.32 c2.76-2.39,3.9-5.29,4.49-6.86c0.79-2.09,1.59-5.69,1.09-11.84c-1.07-13.06-8.62-21.95-9.96-23.48 c-4.07-4.67-8.01-6.99-14.59-10.87C502.17,505.86,493.16,501.08,492.1,502.54z";

const GRAY = "#B4BDC8";
const BLUE = "#177FC1";
const ORANGE = "#D26127";

// Sampled top/bottom contours of an eye outline, binned by x.
type Contours = { xs: number[]; top: number[]; bot: number[] };

const BINS = 64;
const SAMPLES = 800;

function sampleContours(pathD: string): Contours {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.style.position = "absolute";
  svg.style.width = "0";
  svg.style.height = "0";
  const path = document.createElementNS(ns, "path");
  path.setAttribute("d", pathD);
  svg.appendChild(path);
  document.body.appendChild(svg);

  const len = path.getTotalLength();
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const p = path.getPointAtLength((len * i) / SAMPLES);
    pts.push({ x: p.x, y: p.y });
  }
  svg.remove();

  const minX = Math.min(...pts.map((p) => p.x));
  const maxX = Math.max(...pts.map((p) => p.x));
  const step = (maxX - minX) / BINS;

  const top: (number | null)[] = Array(BINS + 1).fill(null);
  const bot: (number | null)[] = Array(BINS + 1).fill(null);
  for (const p of pts) {
    const i = Math.min(BINS, Math.max(0, Math.round((p.x - minX) / step)));
    if (top[i] === null || p.y < top[i]!) top[i] = p.y;
    if (bot[i] === null || p.y > bot[i]!) bot[i] = p.y;
  }
  // Fill any empty bins from their nearest filled neighbors.
  for (const arr of [top, bot]) {
    for (let i = 0; i <= BINS; i++) {
      if (arr[i] === null) {
        let l = i - 1;
        while (l >= 0 && arr[l] === null) l--;
        let r = i + 1;
        while (r <= BINS && arr[r] === null) r++;
        const lv = l >= 0 ? arr[l]! : arr[r]!;
        const rv = r <= BINS ? arr[r]! : arr[l]!;
        arr[i] = (lv + rv) / 2;
      }
    }
  }
  // Light smoothing so the lid edge doesn't pick up sampling jaggies.
  const smooth = (arr: number[]) =>
    arr.map((v, i, a) =>
      i === 0 || i === a.length - 1 ? v : (a[i - 1] + v + a[i + 1]) / 3
    );

  return {
    xs: Array.from({ length: BINS + 1 }, (_, i) => minX + i * step),
    top: smooth(top as number[]),
    bot: smooth(bot as number[]),
  };
}

// Lid shape at progress t: its lower edge is the eye's top contour at t=0,
// morphing point-by-point into the bottom contour at t=1. The region above
// the edge is filled and clipped to the eye outline.
function lidPath(c: Contours, t: number): string {
  const pts = c.xs.map(
    (x, i) =>
      `${x.toFixed(1)},${(c.top[i] + (c.bot[i] - c.top[i]) * t).toFixed(1)}`
  );
  const first = c.xs[0].toFixed(1);
  const last = c.xs[c.xs.length - 1].toFixed(1);
  return `M${first},455 L${pts.join(" L")} L${last},455 Z`;
}

export default function AnimatedEyes({
  lidT,
  className,
}: {
  // Closure progress: 0 = eyes open, 1 = fully shut. Pass null to skip the
  // animation entirely (reduced motion).
  lidT: MotionValue<number> | null;
  className?: string;
}) {
  const fallback = useMotionValue(0);
  const t = lidT ?? fallback;
  const contours = useRef<{ r: Contours; l: Contours } | null>(null);
  const lidR = useRef<SVGPathElement>(null);
  const lidL = useRef<SVGPathElement>(null);

  const applyLids = (v: number) => {
    if (!contours.current) return;
    lidR.current?.setAttribute("d", lidPath(contours.current.r, v));
    lidL.current?.setAttribute("d", lidPath(contours.current.l, v));
  };

  useEffect(() => {
    if (!lidT) return;
    contours.current = {
      r: sampleContours(R_OUTLINE),
      l: sampleContours(L_OUTLINE),
    };
    applyLids(lidT.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lidT]);

  useMotionValueEvent(t, "change", applyLids);

  return (
    <svg
      viewBox="91 472 1014 134"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Everest"
    >
      <defs>
        <clipPath id="lid-clip-r">
          <path d={R_OUTLINE} />
        </clipPath>
        <clipPath id="lid-clip-l">
          <path d={L_OUTLINE} />
        </clipPath>
      </defs>

      {/* right eye */}
      <path d={R_OUTLINE} />
      <path d={R_SCLERA} fill={GRAY} stroke={GRAY} />
      <path d={R_RING} stroke="#000" />
      <path d={R_IRIS} fill={BLUE} stroke={BLUE} />
      <path d={R_CORNER_OUT} fill={ORANGE} stroke={ORANGE} />
      <path d={R_CORNER_IN} fill={ORANGE} stroke={ORANGE} />

      {/* left eye */}
      <path d={L_OUTLINE} />
      <path d={L_SCLERA} fill={GRAY} stroke={GRAY} />
      <path d={L_RING} stroke="#000" />
      <path d={L_IRIS} fill={BLUE} stroke={BLUE} />
      <path d={L_CORNER_OUT} fill={ORANGE} stroke={ORANGE} />
      <path d={L_CORNER_IN} fill={ORANGE} stroke={ORANGE} />

      {/* top lids: lower edge morphs from the outline's top contour to its
          bottom contour as t goes 0 -> 1, clipped to each eye outline */}
      {lidT && (
        <>
          <g clipPath="url(#lid-clip-r)">
            <path ref={lidR} fill="#000" />
          </g>
          <g clipPath="url(#lid-clip-l)">
            <path ref={lidL} fill="#000" />
          </g>
        </>
      )}
    </svg>
  );
}
