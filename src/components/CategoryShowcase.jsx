import { CATEGORIES, getGem } from "../data/products";
import JewelGlyph from "./JewelGlyph";

export default function CategoryShowcase({ onSelectCategory }) {
  return (
    <section className="px-4 md:px-6 pb-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
            Shop by gemstone and category
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto vj-scrollx pb-2">
          {CATEGORIES.map((c) => {
            const gem = getGem(c.key);
            return (
              <button
                key={c.key}
                onClick={() => onSelectCategory(c.key)}
                className="vj-focus vj-card flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 vj-arch"
                style={{
                  background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})`,
                  border: "1px solid var(--line)",
                  minWidth: 110,
                }}
              >
                <div className="vj-icon-wrap" style={{ color: gem.tint }}>
                  <JewelGlyph category={c.key} />
                </div>
                <span className="text-xs" style={{ color: gem.tint }}>
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
