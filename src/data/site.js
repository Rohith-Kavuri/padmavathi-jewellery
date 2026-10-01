// Shop details, featured collection and occasions — all edited from the
// admin page (Homepage section), saved in src/content/*.json.
import store from "../content/store.json";
import featured from "../content/featured.json";
import occasionsFile from "../content/occasions.json";

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
  mapQuery: store.map_query || store.address_en || "",
};

// WhatsApp needs the number with country code, digits only (e.g. 919876543210).
const wa = digits(store.whatsapp);
export const WHATSAPP_URL = wa ? `https://wa.me/${wa.length === 10 ? "91" + wa : wa}` : "";
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
