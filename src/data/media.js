// Photos uploaded in the admin page are full-size phone or AI pictures, often
// 2–3 MB each. On the live site they are shrunk on the fly by Netlify's image
// service (Image CDN): every spot asks for a size close to what it really
// shows, in a modern format (WebP/AVIF), so a phone downloads a small
// fraction of the original. The originals in public/images/uploads are not
// changed. In local development (npm run dev) the original files are used,
// because the image service only runs on Netlify.
const ON = import.meta.env.PROD;
const QUALITY = 80;

const resizable = (src) => ON && typeof src === "string" && src.startsWith("/images/uploads/") && /\.(jpe?g|png|webp)$/i.test(src);

// One copy of `src`, `w` pixels wide.
export const sized = (src, w) => (resizable(src) ? `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&q=${QUALITY}` : src);

// The original file behind a resized address (or the address itself).
export function original(src) {
  if (typeof src !== "string" || !src.startsWith("/.netlify/images?")) return src;
  return new URLSearchParams(src.split("?")[1]).get("url") || src;
}

// If the image service ever can't deliver a copy, show the original instead.
function showOriginal(e) {
  const el = e.currentTarget;
  const o = original(el.getAttribute("src"));
  if (o === el.getAttribute("src")) return;
  el.removeAttribute("srcset");
  el.src = o;
}

// Props for an <img>: the browser picks the smallest of `widths` that is
// sharp for its screen. `sizes` says how wide the photo shows on the page.
//   <img {...photo(src, [360, 540, 720], "50vw")} alt="" />
export function photo(src, widths, sizes) {
  if (!resizable(src)) return { src };
  return {
    src: sized(src, widths[Math.min(1, widths.length - 1)]),
    srcSet: widths.map((w) => `${sized(src, w)} ${w}w`).join(", "),
    sizes,
    onError: showOriginal,
  };
}
