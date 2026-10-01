import { CATEGORIES, getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import JewelGlyph from "./JewelGlyph";

export default function CategoryShowcase({ onSelectCategory }) {
  const { t, tx } = useLang();

  return (
    <section className="px-4 md:px-6 pt-8 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
            {t("category.heading")}
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto vj-scrollx pb-2">
          {CATEGORIES.map((c) => {
            const gem = getGem(c.key);
            return (
              <button
                key={c.key}
                onClick={() => onSelectCategory(c.key)}
                className={`vj-focus vj-card relative overflow-hidden flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 vj-arch ${c.image ? "justify-end" : "justify-center"}`}
                style={{
                  background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})`,
                  border: "1px solid rgba(227,170,44,0.55)",
                  minWidth: 110,
                  height: 132,
                }}
              >
                {c.image ? (
                  <>
                    {/* photo from the admin page, darkened at the bottom so the label stays readable */}
                    <img src={c.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${gem[700]}E6)` }} />
                  </>
                ) : (
                  <div className="vj-icon-wrap" style={{ color: gem.tint }}>
                    <JewelGlyph category={c.key} />
                  </div>
                )}
                <span className="relative text-xs whitespace-nowrap" style={{ color: gem.tint }}>
                  {tx(c.label)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
