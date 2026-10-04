// Shop details, featured collection and occasions — all edited from the
// admin page (Homepage section), saved in src/content/*.json.
import store from "../content/store.json";
import featured from "../content/featured.json";
import occasionsFile from "../content/occasions.json";
import catalogueFile from "../content/catalogue.json";

const bi = (en, te) => ({ en: en || "", te: te || en || "" });
const digits = (v) => String(v || "").replace(/[^\d]/g, "");

export const STORE = {
  name: store.name || "Padmavathi Jewellers",
  address: bi(store.address_en, store.address_te),
  hours: bi(store.hours_en, store.hours_te),
  phone: store.phone || "",
  email: store.email || "",
  instagram: store.instagram || "",
  facebook: store.facebook || "",
  youtube: store.youtube || "",
  mapQuery: store.map_query || store.address_en || "",
};

// WhatsApp needs the number with country code, digits only (e.g. 919876543210).
const wa = digits(store.whatsapp);
// The chat opens with a short greeting already typed in.
const WA_GREETING = "Hello Padmavathi Jewellers, I'd like to know more about your jewellery.";
export const WHATSAPP_URL = wa
  ? `https://wa.me/${wa.length === 10 ? "91" + wa : wa}?text=${encodeURIComponent(WA_GREETING)}`
  : "";

// Social links shown as icons (floating rail, footer, Visit Us, phone menu).
// Each one appears only when its link is filled in the admin page.
export const SOCIALS = [
  WHATSAPP_URL && { key: "whatsapp", href: WHATSAPP_URL },
  STORE.instagram && { key: "instagram", href: STORE.instagram },
  STORE.youtube && { key: "youtube", href: STORE.youtube },
  STORE.facebook && { key: "facebook", href: STORE.facebook },
].filter(Boolean);
export const PHONE_URL = STORE.phone ? `tel:${STORE.phone.replace(/[^\d+]/g, "")}` : "";
export const MAP_EMBED_URL = STORE.mapQuery
  ? `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapQuery)}&output=embed`
  : "";
export const DIRECTIONS_URL = STORE.mapQuery
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE.mapQuery)}`
  : "";

export const FEATURED = {
  image: featured.image || "",
  eyebrow: bi(featured.eyebrow_en, featured.eyebrow_te),
  title: bi(featured.title_en, featured.title_te),
  text: bi(featured.text_en, featured.text_te),
  button: bi(featured.button_en, featured.button_te),
  category: featured.category || "All",
};

export const OCCASIONS = (occasionsFile.occasions || [])
  .filter((o) => o && o.title_en)
  .map((o) => ({
    image: o.image || "",
    title: bi(o.title_en, o.title_te),
    text: bi(o.text_en, o.text_te),
    category: o.category || "All",
  }));

// Catalogue PDFs (Homepage → Catalogues (PDF) in the admin page).
export const CATALOGUES = (catalogueFile.catalogues || [])
  .filter((c) => c && c.pdf)
  .map((c) => ({
    title: bi(c.title_en, c.title_te),
    category: c.category || "",
    pdf: c.pdf,
    cover: c.cover || "",
    pages: Number(c.pages) || 0,
    updated: c.updated ? new Date(`${String(c.updated).slice(0, 10)}T00:00:00`) : null,
  }));
