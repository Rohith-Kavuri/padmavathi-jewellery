import { forwardRef, useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { CATEGORIES, METALS, SORTS, categoryLabel } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import ProductCard from "./ProductCard";

const Catalog = forwardRef(function Catalog(
  { activeCategory, setActiveCategory, activeMetal, setActiveMetal, sortBy, setSortBy, filteredProducts, onQuickView, onAddToCart, onBackToCategories },
  ref
) {
  const { t, tx } = useLang();
  const count = filteredProducts.length;

  // "All" shows the first few pieces with a Show more button; a single
  // category (opened from its card) always shows everything in it.
  const PREVIEW_COUNT = 8;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => setExpanded(false), [activeCategory, activeMetal]);
  const limited = activeCategory === "All" && !expanded && count > PREVIEW_COUNT;
  const visible = limited ? filteredProducts.slice(0, PREVIEW_COUNT) : filteredProducts;

  const chipStyle = (active) =>
    active
      ? { background: "var(--plum-900)", color: "var(--gold-100)", borderColor: "var(--plum-900)" }
      : { borderColor: "var(--line)", color: "var(--ink)" };

  return (
    <section ref={ref} className="px-4 md:px-6 py-10" style={{ scrollMarginTop: 80 }}>
      <div className="max-w-6xl mx-auto">
        {activeCategory !== "All" && (
          <button
            onClick={onBackToCategories}
            className="vj-focus inline-flex items-center gap-1.5 text-sm mb-3"
            style={{ color: "var(--ruby-500)" }}
          >
            <ArrowLeft size={15} /> {t("catalog.backToCategories")}
          </button>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
            {activeCategory === "All" ? t("catalog.title") : tx(categoryLabel(activeCategory))}
            <span className="text-sm vj-mono ml-3" style={{ color: "var(--gold-700)" }}>
              {t(count === 1 ? "catalog.count.one" : "catalog.count.other", { count })}
            </span>
          </h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label={t("catalog.sortAria")}
            className="vj-focus border rounded-full px-4 py-2 text-sm"
            style={{ borderColor: "var(--line)", background: "transparent" }}
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {t(`sort.${s}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setActiveCategory("All")}
            className="vj-chip vj-focus text-xs px-4 py-1.5 rounded-full border"
            style={chipStyle(activeCategory === "All")}
          >
            {t("catalog.all")}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveCategory(c.key)}
              className="vj-chip vj-focus text-xs px-4 py-1.5 rounded-full border"
              style={chipStyle(activeCategory === c.key)}
            >
              {tx(c.label)}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
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
              {t(`metal.${m}`)}
            </button>
          ))}
        </div>

        {count === 0 ? (
          <div className="text-center py-16" style={{ color: "var(--ink)", opacity: 0.7 }}>
            <p className="vj-display text-xl mb-2">{t("catalog.empty.title")}</p>
            <p className="text-sm">{t("catalog.empty.body")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} />
              ))}
            </div>
            {limited && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setExpanded(true)}
                  className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
                  style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
                >
                  {t("catalog.showMore", { count: count - PREVIEW_COUNT })}
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
});

export default Catalog;
