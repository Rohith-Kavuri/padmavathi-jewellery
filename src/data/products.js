export const CATEGORIES = [
  { key: "Necklace", label: "Necklaces" },
  { key: "Earrings", label: "Earrings" },
  { key: "Bangles", label: "Bangles" },
  { key: "Bracelets", label: "Bracelets" },
  { key: "Rings", label: "Rings" },
  { key: "Mangalsutra", label: "Mangalsutra" },
  { key: "Bridal Set", label: "Bridal Sets" },
  { key: "Chains", label: "Chains" },
  { key: "Pendant", label: "Pendants" },
];

export const METALS = ["All", "Gold", "Diamond", "Platinum", "Silver"];

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

export const PRODUCTS = [
  { id: 1, name: "Devika Antique Necklace", category: "Necklace", metal: "Gold", base22: 312000, weight: "38.2g", tag: "Bestseller", desc: "Temple motifs cast in 22K gold, finished entirely by hand." },
  { id: 2, name: "Lakshmi Kasu Mala", category: "Chains", metal: "Gold", base22: 156000, weight: "21.4g", tag: null, desc: "Coin-link chain echoing the Lakshmi mala of old Thanjavur." },
  { id: 3, name: "Padma Drop Earrings", category: "Earrings", metal: "Gold", base22: 18650, weight: "3.1g", tag: "New", desc: "Lotus-petal drops with a soft antique matte finish." },
  { id: 4, name: "Nritya Jhumka", category: "Earrings", metal: "Gold", base22: 27400, weight: "5.8g", tag: null, desc: "Dancer's bells in miniature — they sway when you do." },
  { id: 5, name: "Aaharya Diamond Studs", category: "Earrings", metal: "Diamond", base22: 76800, weight: "—", tag: null, desc: "Round brilliant studs set in a four-claw gallery." },
  { id: 6, name: "Vaibhav Kada", category: "Bangles", metal: "Gold", base22: 138900, weight: "17.6g", tag: null, desc: "A single broad kada with a hand-engraved border." },
  { id: 7, name: "Ratna Ruby Bangles", category: "Bangles", metal: "Gold", base22: 184500, weight: "24.0g", tag: "Bestseller", desc: "Pair of bangles set with cabochon rubies, edge to edge." },
  { id: 8, name: "Rajwada Silver Kada", category: "Bangles", metal: "Silver", base22: 8200, weight: "42.0g", tag: null, desc: "Oxidised silver kada with a rope-twist rim." },
  { id: 9, name: "Ziya Diamond Tennis Bracelet", category: "Bracelets", metal: "Diamond", base22: 215000, weight: "—", tag: null, desc: "A continuous line of diamonds, claw-set in white gold." },
  { id: 10, name: "Suhana Pearl Bracelet", category: "Bracelets", metal: "Gold", base22: 22300, weight: "9.4g", tag: null, desc: "Freshwater pearls strung between gold rondelles." },
  { id: 11, name: "Ira Solitaire Ring", category: "Rings", metal: "Diamond", base22: 92500, weight: "—", tag: "New", desc: "A single round brilliant, raised on a tapered band." },
  { id: 12, name: "Tarka Platinum Band", category: "Rings", metal: "Platinum", base22: 58200, weight: "6.2g", tag: null, desc: "A plain band, brushed by hand for a quiet shine." },
  { id: 13, name: "Vrinda Rose Gold Ring", category: "Rings", metal: "Gold", base22: 54300, weight: "4.9g", tag: null, desc: "Rose gold with a low-set cluster of small diamonds." },
  { id: 14, name: "Mangal Vow Mangalsutra", category: "Mangalsutra", metal: "Gold", base22: 64200, weight: "8.1g", tag: "Bestseller", desc: "Black-bead chain with twin gold vati pendants." },
  { id: 15, name: "Anokhi Polki Bridal Set", category: "Bridal Set", metal: "Diamond", base22: 412000, weight: "—", tag: "Bestseller", desc: "Uncut polki necklace, earrings and maang tikka, complete." },
  { id: 16, name: "Meenakari Choker Set", category: "Bridal Set", metal: "Gold", base22: 298000, weight: "44.7g", tag: null, desc: "Hand-enamelled choker with matching jhumkas in peacock blue." },
  { id: 17, name: "Kanaka Gold Coin Pendant", category: "Pendant", metal: "Gold", base22: 41200, weight: "6.0g", tag: null, desc: "A coin pendant struck with a Lakshmi motif, on a fine chain." },
  { id: 18, name: "Celestia Platinum Pendant", category: "Pendant", metal: "Platinum", base22: 47600, weight: "3.4g", tag: "New", desc: "A teardrop pendant in platinum, set with a single diamond." },
  { id: 19, name: "Antara Temple Chain", category: "Chains", metal: "Gold", base22: 198400, weight: "26.3g", tag: null, desc: "Long temple chain with repeating gopuram-style links." },
  { id: 20, name: "Saudamini Diamond Necklace", category: "Necklace", metal: "Diamond", base22: 526000, weight: "—", tag: "New", desc: "Graduated diamond florets along a fitted white-gold collar." },
];

export const TESTIMONIALS = [
  { name: "Revathi Suresh", city: "Coimbatore", quote: "We brought my grandmother's design photo and they remade it almost exactly, down to the clasp." },
  { name: "Arjun Mehta", city: "Pune", quote: "Booked an appointment for our engagement rings on a Tuesday and walked out with both, resized, by Thursday." },
  { name: "Fathima Rasheed", city: "Kochi", quote: "The mangalsutra weighs less than I expected but doesn't look it at all. Exactly what I asked for." },
  { name: "Karthik Iyer", city: "Bengaluru", quote: "They explained the making charges and hallmarking before I even asked. First jeweller that's happened with." },
];

export const CITIES = [
  { name: "Chennai", offset: 0 },
  { name: "Hyderabad", offset: 18 },
  { name: "Kochi", offset: -12 },
  { name: "Mumbai", offset: 35 },
  { name: "Delhi", offset: 22 },
  { name: "Bengaluru", offset: 8 },
];

export const ANNOUNCEMENTS = [
  "Free insured delivery on orders above ₹50,000",
  "Book a private bridal trial — by appointment, any showroom",
  "Today's making charges: 8% flat across the Heritage collection",
];

export const STATS = [
  { value: 54, suffix: "+", label: "Years in trade" },
  { value: 120, suffix: "+", label: "Showrooms" },
  { value: 9, suffix: "", label: "Artisan guilds" },
  { value: 3, suffix: "", label: "Countries" },
];
