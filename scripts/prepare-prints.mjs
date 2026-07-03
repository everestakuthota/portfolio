import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const ART = path.join(ROOT, "../../art");
const OUT = path.join(ROOT, "../public/artwork/prints");
mkdirSync(OUT, { recursive: true });

// contrast: linear multiplier pivoted at mid-gray (star's tan-on-tan block
// needs a stronger push than the others). box: manual override when
// auto-detection can't work (e.g. dark block on dark fabric).
// Output names are versioned so browsers/CDNs never serve stale renders.
const jobs = [
  { src: `${ART}/IMG_1750.jpg`, out: `${OUT}/star-v2.jpg`, contrast: 1.35, saturation: 1.18 },
  { src: `${ART}/IMG_1751.jpg`, out: `${OUT}/hand-v2.jpg`, contrast: 1.18, saturation: 1.05 },
  { src: `${ART}/IMG_1752.jpg`, out: `${OUT}/face-v2.jpg`, contrast: 1.18, saturation: 1.05 },
  {
    src: `${ART}/puppet.jpg`,
    out: `${OUT}/puppet-v2.jpg`,
    contrast: 1.18,
    saturation: 1.05,
    box: { x0: 0.02, x1: 0.975, y0: 0.004, y1: 0.995 },
  },
];

const ANALYSIS_W = 400;
const DIFF = 28; // luminance distance from fabric to count as "block"
const ROW_FRAC = 0.35; // fraction of row/col that must be block

async function detectBlock(src) {
  const img = sharp(src).greyscale().resize({ width: ANALYSIS_W });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;
  const at = (x, y) => data[y * W + x];

  // Fabric reference: median of a 12px border ring.
  const border = [];
  for (let x = 0; x < W; x++)
    for (const y of [...Array(12).keys(), ...Array.from({ length: 12 }, (_, i) => H - 1 - i)])
      border.push(at(x, y));
  for (let y = 0; y < H; y++)
    for (const x of [...Array(12).keys(), ...Array.from({ length: 12 }, (_, i) => W - 1 - i)])
      border.push(at(x, y));
  border.sort((a, b) => a - b);
  const bg = border[Math.floor(border.length / 2)];

  const isBlock = (x, y) => Math.abs(at(x, y) - bg) > DIFF;

  // Longest contiguous run of rows that are mostly block pixels.
  const rowOk = [];
  for (let y = 0; y < H; y++) {
    let c = 0;
    for (let x = 0; x < W; x++) if (isBlock(x, y)) c++;
    rowOk.push(c > W * ROW_FRAC);
  }
  const [y0, y1] = longestRun(rowOk);

  const colOk = [];
  for (let x = 0; x < W; x++) {
    let c = 0;
    for (let y = y0; y <= y1; y++) if (isBlock(x, y)) c++;
    colOk.push(c > (y1 - y0) * ROW_FRAC);
  }
  const [x0, x1] = longestRun(colOk);

  return { x0: x0 / W, x1: x1 / W, y0: y0 / H, y1: y1 / H, bg };
}

function longestRun(ok) {
  let best = [0, 0];
  let start = -1;
  for (let i = 0; i <= ok.length; i++) {
    if (i < ok.length && ok[i]) {
      if (start < 0) start = i;
    } else if (start >= 0) {
      if (i - 1 - start > best[1] - best[0]) best = [start, i - 1];
      start = -1;
    }
  }
  return best;
}

for (const job of jobs) {
  const meta = await sharp(job.src).metadata();
  const box = job.box ?? (await detectBlock(job.src));

  // Pad the detected box slightly OUTWARD so the entire block is always
  // visible; small fabric slivers at the edges are acceptable.
  const bw = (box.x1 - box.x0) * meta.width;
  const bh = (box.y1 - box.y0) * meta.height;
  const pad = 0.008;
  const left = Math.max(0, Math.round(box.x0 * meta.width - bw * pad));
  const top = Math.max(0, Math.round(box.y0 * meta.height - bh * pad));
  const width = Math.min(meta.width - left, Math.round(bw * (1 + 2 * pad)));
  const height = Math.min(meta.height - top, Math.round(bh * (1 + 2 * pad)));

  // Each step runs on its own buffer so the order is explicit and
  // guaranteed: crop -> mirror -> color -> resize.
  const cropped = await sharp(job.src)
    .extract({ left, top, width, height })
    .toBuffer();
  const mirrored = await sharp(cropped).flop().toBuffer();
  const adjusted = await sharp(mirrored)
    .linear(job.contrast, 128 * (1 - job.contrast))
    .modulate({ saturation: job.saturation })
    .toBuffer();
  const out = await sharp(adjusted)
    .resize({ width: 2400, height: 2400, fit: "inside" })
    .jpeg({ quality: 85 })
    .toFile(job.out);

  console.log(`${path.basename(job.out)}: ${out.width}x${out.height}`);
}
