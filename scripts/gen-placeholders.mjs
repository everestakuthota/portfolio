import { writeFileSync } from "node:fs";

const palettes = [
  ["#ff6b6b", "#c9184a", "#590d22"],
  ["#ffb703", "#fb8500", "#6a040f"],
  ["#4cc9f0", "#4361ee", "#3a0ca3"],
  ["#80ed99", "#38a3a5", "#22577a"],
  ["#f72585", "#7209b7", "#3a0ca3"],
  ["#ffd60a", "#ff9f1c", "#2ec4b6"],
];

function blob(seed, w, h) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const cx = w / 2 + (rand() - 0.5) * w * 0.3;
  const cy = h / 2 + (rand() - 0.5) * h * 0.3;
  const r = Math.min(w, h) * (0.25 + rand() * 0.2);
  return { cx, cy, r };
}

palettes.forEach((colors, i) => {
  const w = 900;
  const h = 1100;
  const id = `g${i}`;
  const shapes = colors
    .map((c, j) => {
      const { cx, cy, r } = blob(i * 10 + j, w, h);
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r.toFixed(0)}" fill="${c}" opacity="0.55" />`;
    })
    .join("\n    ");

  const svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors[0]}" />
      <stop offset="100%" stop-color="${colors[2]}" />
    </linearGradient>
    <filter id="blur${i}"><feGaussianBlur stdDeviation="60" /></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#0a0a0a" />
  <rect width="${w}" height="${h}" fill="url(#${id})" opacity="0.25" />
  <g filter="url(#blur${i})">
    ${shapes}
  </g>
</svg>`;

  writeFileSync(new URL(`../public/artwork/piece-${i + 1}.svg`, import.meta.url), svg);
});

console.log("Generated", palettes.length, "placeholder artworks");
