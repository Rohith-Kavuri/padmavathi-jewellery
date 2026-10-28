// A short, stable web address for each product, used by "Share this piece"
// (padmavathijewellers…/p/kundan-mango-mala-4k2x9q/).
//
// It is the product's name plus a short code made from its photo, so it stays
// the same when products are reordered or numbered differently in the admin
// page. If a piece is renamed, the old link still opens it (the code at the
// end is enough). Plain JavaScript with no imports: the site and the build
// step (vite.config.js) both use it, so their links always match.

// FNV-1a: a tiny, fast text → number hash; shown in base 36 (0-9, a-z).
function code(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36).padStart(6, "0").slice(-6);
}

const words = (text) =>
  String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "") || "piece";

// products: the list from src/content/products.json, in admin order.
// Returns [{ slug, code }] in the same order. Two entries with the same photo
// get different codes (the second one is coded with "#2", and so on).
export function productSlugs(products) {
  const used = {};
  return products.map((p) => {
    const base = String(p.image || p.name_en || "");
    used[base] = (used[base] || 0) + 1;
    const c = code(used[base] > 1 ? `${base}#${used[base]}` : base);
    return { slug: `${words(p.name_en)}-${c}`, code: c };
  });
}

// The code at the end of a slug ("kundan-mango-mala-4k2x9q" → "4k2x9q").
export const slugCode = (slug) => String(slug || "").split("-").pop();
