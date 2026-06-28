export function fmtINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function priceFor(product, purity) {
  if (product.metal === "Gold" && purity) {
    return Math.round(product.base22 * (purity / 22));
  }
  return product.base22;
}
