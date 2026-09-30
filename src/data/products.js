// Text fields that customers see are bilingual: { en: "...", te: "..." }.
// Components read them through tx() from useLang(). Keys used for logic
// (category keys, metal keys, city names) stay in English.

export const CATEGORIES = [
  { key: "Necklace", label: { en: "Necklaces", te: "నెక్లెస్‌లు" } },
  { key: "Earrings", label: { en: "Earrings", te: "చెవిపోగులు" } },
  { key: "Bangles", label: { en: "Bangles", te: "గాజులు" } },
  { key: "Bracelets", label: { en: "Bracelets", te: "బ్రేస్‌లెట్లు" } },
  { key: "Rings", label: { en: "Rings", te: "ఉంగరాలు" } },
  { key: "Mangalsutra", label: { en: "Mangalsutra", te: "మంగళసూత్రం" } },
  { key: "Bridal Set", label: { en: "Bridal Sets", te: "పెళ్లి సెట్లు" } },
  { key: "Chains", label: { en: "Chains", te: "గొలుసులు" } },
  { key: "Pendant", label: { en: "Pendants", te: "లాకెట్లు" } },
];

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
export const PRODUCTS = [
  {
    id: 1, category: "Necklace", metal: "Gold", base22: 312000, weight: 38.2, tag: "Bestseller",
    name: { en: "Devika Antique Necklace", te: "దేవిక యాంటిక్ నెక్లెస్" },
    desc: { en: "Temple motifs cast in 22K gold, finished entirely by hand.", te: "22K బంగారంలో పోతపోసిన దేవాలయ నమూనాలు, పూర్తిగా చేతితో తీర్చిదిద్దినవి." },
  },
  {
    id: 2, category: "Chains", metal: "Gold", base22: 156000, weight: 21.4, tag: null,
    name: { en: "Lakshmi Kasu Mala", te: "లక్ష్మీ కాసుల మాల" },
    desc: { en: "Coin-link chain echoing the Lakshmi mala of old Thanjavur.", te: "పాత తంజావూరు లక్ష్మీ మాలను గుర్తుచేసే కాసుల గొలుసు." },
  },
  {
    id: 3, category: "Earrings", metal: "Gold", base22: 18650, weight: 3.1, tag: "New",
    name: { en: "Padma Drop Earrings", te: "పద్మ డ్రాప్ చెవిపోగులు" },
    desc: { en: "Lotus-petal drops with a soft antique matte finish.", te: "మృదువైన యాంటిక్ మ్యాట్ మెరుగుతో తామర రేకుల లోలాకులు." },
  },
  {
    id: 4, category: "Earrings", metal: "Gold", base22: 27400, weight: 5.8, tag: null,
    name: { en: "Nritya Jhumka", te: "నృత్య జుంకాలు" },
    desc: { en: "Dancer's bells in miniature — they sway when you do.", te: "నర్తకి గజ్జెలకు చిన్న రూపం — మీరు కదిలితే అవీ ఊగుతాయి." },
  },
  {
    id: 5, category: "Earrings", metal: "Diamond", base22: 76800, weight: null, tag: null,
    name: { en: "Aaharya Diamond Studs", te: "ఆహార్య వజ్రాల కమ్మలు" },
    desc: { en: "Round brilliant studs set in a four-claw gallery.", te: "నాలుగు గోళ్ల అమరికలో పొదిగిన రౌండ్ బ్రిలియంట్ వజ్రపు కమ్మలు." },
  },
  {
    id: 6, category: "Bangles", metal: "Gold", base22: 138900, weight: 17.6, tag: null,
    name: { en: "Vaibhav Kada", te: "వైభవ్ కడియం" },
    desc: { en: "A single broad kada with a hand-engraved border.", te: "చేతితో చెక్కిన అంచుతో ఒకే వెడల్పాటి కడియం." },
  },
  {
    id: 7, category: "Bangles", metal: "Gold", base22: 184500, weight: 24.0, tag: "Bestseller",
    name: { en: "Ratna Ruby Bangles", te: "రత్న కెంపుల గాజులు" },
    desc: { en: "Pair of bangles set with cabochon rubies, edge to edge.", te: "అంచు నుంచి అంచు వరకు కాబోషాన్ కెంపులు పొదిగిన జత గాజులు." },
  },
  {
    id: 8, category: "Bangles", metal: "Silver", base22: 8200, weight: 42.0, tag: null,
    name: { en: "Rajwada Silver Kada", te: "రాజ్‌వాడా వెండి కడియం" },
    desc: { en: "Oxidised silver kada with a rope-twist rim.", te: "తాడు మెలికల అంచుతో ఆక్సిడైజ్డ్ వెండి కడియం." },
  },
  {
    id: 9, category: "Bracelets", metal: "Diamond", base22: 215000, weight: null, tag: null,
    name: { en: "Ziya Diamond Tennis Bracelet", te: "జియా వజ్రాల టెన్నిస్ బ్రేస్‌లెట్" },
    desc: { en: "A continuous line of diamonds, claw-set in white gold.", te: "తెల్ల బంగారంలో గోళ్ల అమరికతో పొదిగిన నిరంతర వజ్రాల వరుస." },
  },
  {
    id: 10, category: "Bracelets", metal: "Gold", base22: 22300, weight: 9.4, tag: null,
    name: { en: "Suhana Pearl Bracelet", te: "సుహానా ముత్యాల బ్రేస్‌లెట్" },
    desc: { en: "Freshwater pearls strung between gold rondelles.", te: "బంగారు రాండెల్స్ మధ్య గుచ్చిన మంచినీటి ముత్యాలు." },
  },
  {
    id: 11, category: "Rings", metal: "Diamond", base22: 92500, weight: null, tag: "New",
    name: { en: "Ira Solitaire Ring", te: "ఇరా సాలిటైర్ ఉంగరం" },
    desc: { en: "A single round brilliant, raised on a tapered band.", te: "సన్నబడే బ్యాండ్‌పై ఎత్తుగా అమర్చిన ఒకే రౌండ్ బ్రిలియంట్ వజ్రం." },
  },
  {
    id: 12, category: "Rings", metal: "Platinum", base22: 58200, weight: 6.2, tag: null,
    name: { en: "Tarka Platinum Band", te: "తర్క ప్లాటినం బ్యాండ్" },
    desc: { en: "A plain band, brushed by hand for a quiet shine.", te: "సున్నితమైన మెరుపు కోసం చేతితో బ్రష్ చేసిన సాదా బ్యాండ్." },
  },
  {
    id: 13, category: "Rings", metal: "Gold", base22: 54300, weight: 4.9, tag: null,
    name: { en: "Vrinda Rose Gold Ring", te: "బృంద రోజ్ గోల్డ్ ఉంగరం" },
    desc: { en: "Rose gold with a low-set cluster of small diamonds.", te: "చిన్న వజ్రాల గుత్తిని తక్కువ ఎత్తులో పొదిగిన రోజ్ గోల్డ్ ఉంగరం." },
  },
  {
    id: 14, category: "Mangalsutra", metal: "Gold", base22: 64200, weight: 8.1, tag: "Bestseller",
    name: { en: "Mangal Vow Mangalsutra", te: "మంగళ ప్రమాణ మంగళసూత్రం" },
    desc: { en: "Black-bead chain with twin gold vati pendants.", te: "జంట బంగారు తాళిబొట్లతో నల్లపూసల గొలుసు." },
  },
  {
    id: 15, category: "Bridal Set", metal: "Diamond", base22: 412000, weight: null, tag: "Bestseller",
    name: { en: "Anokhi Polki Bridal Set", te: "అనోఖీ పోల్కీ పెళ్లి సెట్" },
    desc: { en: "Uncut polki necklace, earrings and maang tikka, complete.", te: "కట్ చేయని పోల్కీ నెక్లెస్, చెవిపోగులు, పాపిడి బిళ్ల — పూర్తి సెట్." },
  },
  {
    id: 16, category: "Bridal Set", metal: "Gold", base22: 298000, weight: 44.7, tag: null,
    name: { en: "Meenakari Choker Set", te: "మీనాకారీ చోకర్ సెట్" },
    desc: { en: "Hand-enamelled choker with matching jhumkas in peacock blue.", te: "నెమలి నీలి రంగులో చేతి ఎనామెల్ చోకర్, దానికి సరిపోయే జుంకాలతో." },
  },
  {
    id: 17, category: "Pendant", metal: "Gold", base22: 41200, weight: 6.0, tag: null,
    name: { en: "Kanaka Gold Coin Pendant", te: "కనక బంగారు నాణెం లాకెట్" },
    desc: { en: "A coin pendant struck with a Lakshmi motif, on a fine chain.", te: "సన్నని గొలుసుపై లక్ష్మీ రూపం ముద్రించిన నాణెం లాకెట్." },
  },
  {
    id: 18, category: "Pendant", metal: "Platinum", base22: 47600, weight: 3.4, tag: "New",
    name: { en: "Celestia Platinum Pendant", te: "సెలెస్టియా ప్లాటినం లాకెట్" },
    desc: { en: "A teardrop pendant in platinum, set with a single diamond.", te: "ఒకే వజ్రం పొదిగిన ప్లాటినం కన్నీటిబొట్టు ఆకారపు లాకెట్." },
  },
  {
    id: 19, category: "Chains", metal: "Gold", base22: 198400, weight: 26.3, tag: null,
    name: { en: "Antara Temple Chain", te: "అంతర టెంపుల్ గొలుసు" },
    desc: { en: "Long temple chain with repeating gopuram-style links.", te: "గోపుర ఆకృతి లింకులు వరుసగా ఉండే పొడవైన టెంపుల్ గొలుసు." },
  },
  {
    id: 20, category: "Necklace", metal: "Diamond", base22: 526000, weight: null, tag: "New",
    name: { en: "Saudamini Diamond Necklace", te: "సౌదామిని వజ్రాల నెక్లెస్" },
    desc: { en: "Graduated diamond florets along a fitted white-gold collar.", te: "తెల్ల బంగారు కాలర్ వెంబడి క్రమంగా పెరిగే వజ్రపు పూల అమరిక." },
  },
];

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
