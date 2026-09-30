export function fmtINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function priceFor(product, purity) {
  if (product.metal === "Gold" && purity) {
    return Math.round(product.base22 * (purity / 22));
  }
  return product.base22;
}

// weight is stored in grams (number) or null for pieces not priced by weight
export function fmtWeight(grams, unit = "g") {
  return grams == null ? "—" : `${grams.toFixed(1)}${unit}`;
}
