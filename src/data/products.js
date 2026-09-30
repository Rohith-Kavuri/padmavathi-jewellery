// Text fields that customers see are bilingual: { en: "...", te: "..." }.
// Components read them through tx() from useLang(). Keys used for logic
// (category keys, metal keys, city names) stay in English.

// Categories and products are edited from the admin page (/admin, Decap CMS),
// which saves them to src/content/*.json. They are mapped here into the
// shape the rest of the site uses, so components don't need to know.
import categoriesFile from "../content/categories.json";
import productsFile from "../content/products.json";

// Uploaded images are stored as site paths like "/images/uploads/x.jpg";
// empty means "no photo yet" and components fall back to the line icon.
const img = (v) => (v && String(v).trim()) || null;

export const CATEGORIES = categoriesFile.categories.map((c) => ({
  key: c.key,
  label: { en: c.label_en, te: c.label_te || c.label_en },
  image: img(c.image),
}));

export function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

// Metal keys — labels come from strings.js ("metal.Gold" etc.)
export const METALS = ["All", "Gold", "Diamond", "Platinum", "Silver"];

// Sort keys — labels come from strings.js ("sort.featured" etc.)
export const SORTS = ["featured", "priceAsc", "priceDesc", "newest"];

// Five-color gemstone system — every category gets a gem identity so the
// catalogue reads as colorful and varied rather than one flat brand color.
export const GEMS = {
  ruby: { 500: "#E0335F", 700: "#9C1238", tint: "#FDEAF0" },
  emerald: { 500: "#16C172", 700: "#0B6E3F", tint: "#E8FBF0" },
  sapphire: { 500: "#2E7BE0", 700: "#1A3F8C", tint: "#EAF2FE" },
  amethyst: { 500: "#9C5BE0", 700: "#5E2C8C", tint: "#F3EAFE" },
  gold: { 500: "#F2B705", 700: "#C8941A", tint: "#FFF6DF" },
};

export const CATEGORY_GEM = {
  Necklace: "emerald",
  Earrings: "sapphire",
  Bangles: "amethyst",
  Bracelets: "ruby",
  Rings: "ruby",
  Mangalsutra: "emerald",
  "Bridal Set": "ruby",
  Chains: "gold",
  Pendant: "sapphire",
};

export function getGem(category) {
  return GEMS[CATEGORY_GEM[category]] || GEMS.gold;
}

// weight is in grams; null where weight isn't the pricing basis (diamond pieces)
const num = (v) => (v === "" || v == null || Number.isNaN(Number(v)) ? null : Number(v));

export const PRODUCTS = productsFile.products.map((p) => ({
  id: Number(p.id),
  category: p.category,
  metal: p.metal,
  base22: Number(p.price) || 0,
  weight: num(p.weight),
  tag: p.tag || null,
  name: { en: p.name_en, te: p.name_te || p.name_en },
  desc: { en: p.desc_en || "", te: p.desc_te || p.desc_en || "" },
  image: img(p.image),
}));

export const TESTIMONIALS = [
  {
    name: { en: "Revathi Suresh", te: "రేవతి సురేష్" },
    city: { en: "Coimbatore", te: "కోయంబత్తూరు" },
    quote: {
      en: "We brought my grandmother's design photo and they remade it almost exactly, down to the clasp.",
      te: "మా అమ్మమ్మ నగ డిజైన్ ఫోటో తీసుకెళ్లాం — కొక్కెం వరకు దాదాపు అచ్చం అలాగే మళ్ళీ తయారుచేశారు.",
    },
  },
  {
    name: { en: "Arjun Mehta", te: "అర్జున్ మెహతా" },
    city: { en: "Pune", te: "పుణె" },
    quote: {
      en: "Booked an appointment for our engagement rings on a Tuesday and walked out with both, resized, by Thursday.",
      te: "నిశ్చితార్థపు ఉంగరాల కోసం మంగళవారం అపాయింట్‌మెంట్ బుక్ చేశాం; గురువారానికల్లా సైజు సరిచేసిన రెండు ఉంగరాలతో బయటకు వచ్చాం.",
    },
  },
  {
    name: { en: "Fathima Rasheed", te: "ఫాతిమా రషీద్" },
    city: { en: "Kochi", te: "కొచ్చి" },
    quote: {
      en: "The mangalsutra weighs less than I expected but doesn't look it at all. Exactly what I asked for.",
      te: "మంగళసూత్రం నేను అనుకున్నదానికంటే తేలికగా ఉంది, కానీ చూడటానికి అస్సలు అలా అనిపించదు. నేను అడిగింది సరిగ్గా ఇదే.",
    },
  },
  {
    name: { en: "Karthik Iyer", te: "కార్తీక్ అయ్యర్" },
    city: { en: "Bengaluru", te: "బెంగళూరు" },
    quote: {
      en: "They explained the making charges and hallmarking before I even asked. First jeweller that's happened with.",
      te: "నేను అడగకముందే తయారీ ఛార్జీలు, హాల్‌మార్కింగ్ గురించి వివరించారు. ఇలా జరిగిన మొదటి నగల దుకాణం ఇదే.",
    },
  },
];

export const CITIES = [
  { name: "Chennai", label: { en: "Chennai", te: "చెన్నై" }, offset: 0 },
  { name: "Hyderabad", label: { en: "Hyderabad", te: "హైదరాబాద్" }, offset: 18 },
  { name: "Kochi", label: { en: "Kochi", te: "కొచ్చి" }, offset: -12 },
  { name: "Mumbai", label: { en: "Mumbai", te: "ముంబై" }, offset: 35 },
  { name: "Delhi", label: { en: "Delhi", te: "ఢిల్లీ" }, offset: 22 },
  { name: "Bengaluru", label: { en: "Bengaluru", te: "బెంగళూరు" }, offset: 8 },
];

export const ANNOUNCEMENTS = [
  { en: "Free insured delivery on orders above ₹50,000", te: "₹50,000 పైబడిన ఆర్డర్లకు ఉచిత బీమా డెలివరీ" },
  {
    en: "Book a private bridal trial — by appointment, any showroom",
    te: "పెళ్లి నగల ప్రైవేట్ ట్రయల్ బుక్ చేసుకోండి — అపాయింట్‌మెంట్‌తో, ఏ షోరూమ్‌లోనైనా",
  },
  {
    en: "Today's making charges: 8% flat across the Heritage collection",
    te: "నేటి తయారీ ఛార్జీలు: హెరిటేజ్ కలెక్షన్ మొత్తంపై స్థిరంగా 8%",
  },
];

export const STATS = [
  { value: 54, suffix: "+", label: { en: "Years in trade", te: "వ్యాపారంలో సంవత్సరాలు" } },
  { value: 120, suffix: "+", label: { en: "Showrooms", te: "షోరూమ్‌లు" } },
  { value: 9, suffix: "", label: { en: "Artisan guilds", te: "కళాకారుల సంఘాలు" } },
  { value: 3, suffix: "", label: { en: "Countries", te: "దేశాలు" } },
];
