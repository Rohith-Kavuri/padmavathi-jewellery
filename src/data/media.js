// Photos uploaded in the admin page are full-size phone or AI pictures, often
// 2–3 MB each. scripts/shrink-photos.py makes light WebP copies of them in a
// few widths (public/images/sized/, listed in sized.json), and every spot on
// the site shows the copy that fits it, so a phone downloads a small fraction
// of the original. The originals are not changed.
//
// Photos uploaded after the script last ran have no copies yet: those show
// the original until it's run again.
import SIZED from "./sized.json";

const copy = (entry, w) => `/images/sized/${entry.name}-${w}.webp`;

// copy address → original, so a copy that fails to load can fall back
const ORIGINAL = {};
Object.entries(SIZED).forEach(([src, e]) => e.w.forEach((w) => (ORIGINAL[copy(e, w)] = src)));

// One copy of `src` at least `w` pixels wide (or the largest there is).
export function sized(src, w) {
  const e = SIZED[src];
  if (!e) return src;
  return copy(e, e.w.find((x) => x >= w) || e.w[e.w.length - 1]);
}

// The original file behind a copy (or the address itself).
export const original = (src) => ORIGINAL[src] || src;

// If a copy ever can't be loaded, show the original instead.
function showOriginal(e) {
  const el = e.currentTarget;
  const o = original(el.getAttribute("src"));
  if (o === el.getAttribute("src")) return;
  el.removeAttribute("srcset");
  el.src = o;
}

// Props for an <img>: the browser picks the smallest copy that is sharp for
// its screen. `sizes` says how wide the photo shows on the page; `widths[1]`
// is the fallback size for browsers that ignore srcset.
//   <img {...photo(src, [360, 540, 720], "50vw")} alt="" />
export function photo(src, widths, sizes) {
  const e = SIZED[src];
  if (!e) return { src };
  return {
    src: sized(src, widths[Math.min(1, widths.length - 1)]),
    srcSet: e.w.map((w) => `${copy(e, w)} ${w}w`).join(", "),
    sizes,
    onError: showOriginal,
  };
}
