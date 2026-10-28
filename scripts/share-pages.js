// "Share this piece" pages.
//
// WhatsApp (and Facebook, Instagram, Telegram …) build a link's preview card
// from the page's <meta> tags, without running the site's JavaScript. So for
// every product the build writes a copy of the homepage at /p/<slug>/ whose
// tags carry that piece's own name and photo. Opening the link loads the
// normal site, which then opens the piece in Quick view (see App.jsx).
//
// Runs after `vite build` (see vite.config.js); nothing to do by hand. New or
// edited products in the admin page get their page on the next deploy.
import fs from "node:fs";
import path from "node:path";
import { productSlugs } from "../src/data/slug.js";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// "haram" / "HARAM" → "Haram"; names typed with their own capitals are kept
const tidy = (s) => {
  const v = String(s || "").trim();
  return v === v.toLowerCase() || v === v.toUpperCase() ? v.toLowerCase().replace(/(^|[\s-])([a-z])/g, (m, a, b) => a + b.toUpperCase()) : v;
};

const setTag = (html, re, value) => {
  if (!re.test(html)) throw new Error(`share pages: tag not found in index.html: ${re}`);
  return html.replace(re, (_, a, b) => a + esc(value) + b);
};
const meta = (html, attr, key, value) => setTag(html, new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`), value);

export function writeSharePages({ outDir, siteUrl, root = process.cwd() }) {
  const home = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
  const read = (f) => JSON.parse(fs.readFileSync(path.join(root, "src/content", f), "utf8"));
  const products = read("products.json").products || [];
  const categories = read("categories.json").categories || [];
  const slugs = productSlugs(products);
  const sized = JSON.parse(fs.readFileSync(path.join(root, "src/data/sized.json"), "utf8"));
  const publicDir = path.join(root, "public");

  // The preview picture: the square copy made by scripts/shrink-photos.py;
  // for a photo without one, the original if it's light enough for WhatsApp
  // (it skips heavy pictures), otherwise the shop's own preview picture.
  const pictureFor = (src) => {
    const e = src && sized[src];
    if (e && e.share) return { url: `${siteUrl}/images/sized/${e.name}-share.jpg`, w: 800, h: 800 };
    const file = src && path.join(publicDir, src);
    if (file && /\.(jpe?g|png)$/i.test(src) && fs.existsSync(file) && fs.statSync(file).size <= 450 * 1024)
      return { url: siteUrl + encodeURI(src) };
    return { url: `${siteUrl}/og-image.jpg`, w: 1200, h: 630 };
  };

  products.forEach((p, i) => {
    const slug = slugs[i].slug;
    const url = `${siteUrl}/p/${slug}/`;
    const name = tidy(p.name_en) || "Jewellery";
    const category = tidy(categories.find((c) => c.key === p.category)?.label_en || p.category || "Jewellery");
    const title = `${name} · Padmavathi Jewellers, Giddalur`;
    const text =
      (p.desc_en && p.desc_en.trim()) ||
      `${category} from Padmavathi Jewellers, Main Road, Giddalur. Tap to see this piece and chat with us on WhatsApp.`;
    const pic = pictureFor(p.image);
    const image = pic.url;

    let html = home;
    html = setTag(html, /(<title>)[^<]*(<\/title>)/, title);
    html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
    html = meta(html, "name", "description", text);
    html = meta(html, "property", "og:title", title);
    html = meta(html, "property", "og:description", text);
    html = meta(html, "property", "og:url", url);
    html = meta(html, "property", "og:image", image);
    html = meta(html, "property", "og:image:secure_url", image);
    if (pic.w) {
      html = meta(html, "property", "og:image:width", String(pic.w));
      html = meta(html, "property", "og:image:height", String(pic.h));
    } else {
      // size unknown: leave it to WhatsApp to read from the picture
      html = html.replace(/\s*<meta property="og:image:(width|height)"[^>]*>/g, "");
      html = html.replace(/(<meta property="og:image:type" content=")[^"]*(")/, (_, a, b) => a + (/\.png$/i.test(p.image) ? "image/png" : "image/jpeg") + b);
    }
    html = meta(html, "property", "og:image:alt", `${name} — Padmavathi Jewellers`);
    html = meta(html, "name", "twitter:title", title);
    html = meta(html, "name", "twitter:description", text);
    html = meta(html, "name", "twitter:image", image);

    const dir = path.join(outDir, "p", slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  });
  return products.length;
}
