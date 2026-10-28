import { forwardRef, useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { CATEGORIES, METALS, SORTS, categoryLabel } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

const Catalog = forwardRef(function Catalog(
  { activeCategory, setActiveCategory, activeMetal, setActiveMetal, sortBy, setSortBy, filteredProducts, onQuickView, onAddToCart, onViewImage, onBackToCategories },
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

  // chips: maroon velvet with a gold edge when chosen, cream with a gold
  // hairline otherwise
  const chipStyle = (active) =>
    active
      ? {
          background: "linear-gradient(135deg, var(--plum-950), var(--ruby-500))",
          color: "var(--gold-100)",
          borderColor: "var(--gold-500)",
          boxShadow: "0 8px 16px -10px rgba(74,11,24,0.8)",
        }
      : { background: "var(--cream-card)", borderColor: "rgba(184,134,43,0.45)", color: "var(--plum-900)" };

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
        <SectionTitle
          eyebrow={t("catalog.eyebrow")}
          title={activeCategory === "All" ? t("catalog.title") : `*${tx(categoryLabel(activeCategory))}*`}
        />
        <div className="vj-mono text-[11px] tracking-wider text-center mt-2 mb-7" style={{ color: "var(--gold-700)" }}>
          {t(count === 1 ? "catalog.count.one" : "catalog.count.other", { count })}
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-3 mb-3">
          <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-2">
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label={t("catalog.sortAria")}
            className="vj-focus self-center md:self-auto border rounded-full px-4 py-1.5 text-xs"
            style={{ borderColor: "rgba(184,134,43,0.45)", background: "var(--cream-card)", color: "var(--plum-900)" }}
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {t(`sort.${s}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
          {METALS.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMetal(m)}
              className="vj-chip vj-focus text-[11px] px-3 py-1 rounded-full border"
              style={
                activeMetal === m
                  ? { background: "var(--gold-300)", color: "var(--plum-950)", borderColor: "var(--gold-500)" }
                  : { background: "transparent", color: "var(--plum-900)", borderColor: "rgba(184,134,43,0.35)" }
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={onQuickView} onAddToCart={onAddToCart} onViewImage={onViewImage} />
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
