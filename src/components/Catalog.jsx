import { forwardRef } from "react";
import { CATEGORIES, METALS } from "../data/products";
import ProductCard from "./ProductCard";

const Catalog = forwardRef(function Catalog(
  {
    activeCategory,
    setActiveCategory,
    activeMetal,
    setActiveMetal,
    sortBy,
    setSortBy,
    filteredProducts,
    wishlist,
    onToggleWishlist,
    onQuickView,
  },
  ref
) {
  return (
    <section ref={ref} className="px-4 md:px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
            {activeCategory === "All" ? "The collection" : activeCategory}
            <span className="text-sm vj-mono ml-3" style={{ color: "var(--gold-700)" }}>
              {filteredProducts.length} pieces
            </span>
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="vj-focus border rounded-full px-4 py-2 text-sm"
            style={{ borderColor: "var(--line)", background: "transparent" }}
          >
            {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory("All")}
            className="vj-chip vj-focus text-xs px-4 py-1.5 rounded-full border"
            style={
              activeCategory === "All"
                ? { background: "var(--plum-900)", color: "var(--gold-100)", borderColor: "var(--plum-900)" }
                : { borderColor: "var(--line)", color: "var(--ink)" }
            }
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className="vj-chip vj-focus text-xs px-4 py-1.5 rounded-full border"
              style={
                activeCategory === c.key
                  ? { background: "var(--plum-900)", color: "var(--gold-100)", borderColor: "var(--plum-900)" }
                  : { borderColor: "var(--line)", color: "var(--ink)" }
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-8">
          {METALS.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMetal(m)}
              className="vj-chip vj-focus text-xs px-3 py-1 rounded-full"
              style={
                activeMetal === m
                  ? { background: "var(--ruby-500)", color: "var(--cream)" }
                  : { background: "var(--cream-dim)", color: "var(--plum-900)" }
              }
            >
              {m}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--ink)", opacity: 0.7 }}>
            <p className="vj-display text-xl mb-2">Nothing matches yet</p>
            <p className="text-sm">Try a different category, metal, or clear the search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.has(p.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default Catalog;
