import { ArrowRight } from "lucide-react";
import { CATEGORIES, PRODUCTS, getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import JewelGlyph from "./JewelGlyph";

// One large photo card per category. "Show more" opens that category's
// items in the collection below. Photos come from the admin page
// (Catalogue → Categories → Photo); without one, the card shows the line
// icon on maroon velvet.
export default function CategoryShowcase({ onSelectCategory }) {
  const { t, tx } = useLang();

  return (
    <section id="categories-section" className="px-4 md:px-6 pt-10 pb-4" style={{ scrollMarginTop: 80 }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="vj-display text-2xl md:text-3xl mb-6" style={{ color: "var(--plum-900)" }}>
          {t("category.heading")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
          {CATEGORIES.map((c) => {
            const gem = getGem(c.key);
            const count = PRODUCTS.filter((p) => p.category === c.key).length;
            return (
              <button
                key={c.key}
                onClick={() => onSelectCategory(c.key)}
                className="vj-focus group relative overflow-hidden text-left aspect-[4/5] sm:aspect-square"
                style={{
                  borderRadius: "50% 50% 14px 14px / 30% 30% 14px 14px",
                  border: "1px solid rgba(227,170,44,0.6)",
                  background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})`,
                  boxShadow: "0 18px 36px -22px rgba(36,5,13,0.7)",
                }}
              >
                {c.image ? (
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center pb-16" style={{ color: gem.tint }}>
                    <div className="w-20 h-20 md:w-28 md:h-28 opacity-90">
                      <JewelGlyph category={c.key} className="w-full h-full" />
                    </div>
                  </div>
                )}

                {/* maroon fade at the bottom so the text always reads */}
                <span
                  className="absolute inset-x-0 bottom-0 h-2/3"
                  style={{ background: "linear-gradient(to bottom, rgba(36,5,13,0) 0%, rgba(36,5,13,0.55) 45%, rgba(36,5,13,0.92) 100%)" }}
                />

                <span className="absolute inset-x-0 bottom-0 p-3 md:p-5 flex flex-col items-start gap-1">
                  <span className="vj-display text-lg md:text-2xl leading-tight" style={{ color: "var(--gold-100)" }}>
                    {tx(c.label)}
                  </span>
                  <span className="vj-mono text-[10px] md:text-xs" style={{ color: "var(--gold-300)" }}>
                    {t(count === 1 ? "catalog.count.one" : "catalog.count.other", { count })}
                  </span>
                  <span
                    className="vj-shimmer mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] md:text-xs font-semibold transition-colors"
                    style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)" }}
                  >
                    {t("category.showMore")}
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
