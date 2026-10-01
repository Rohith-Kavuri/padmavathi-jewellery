import JewelGlyph from "./JewelGlyph";
import { fmtINR, fmtWeight } from "../utils/format";
import { getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

export default function ProductCard({ product, onQuickView }) {
  const { t, tx } = useLang();
  const gem = getGem(product.category);

  return (
    <div
      className="group vj-card flex flex-col items-center text-center p-5 relative"
      style={{
        background: "var(--cream-card)",
        border: "1px solid var(--line)",
        borderTop: "3px solid var(--gold-500)",
        borderRadius: "4px 4px 14px 14px",
      }}
    >
      {product.tag && (
        <span
          className="absolute top-3 left-3 text-[10px] px-2 py-0.5 rounded-full font-medium"
          style={
            product.tag === "New"
              ? { background: "var(--gold-300)", color: "var(--plum-950)" }
              : { background: "var(--ruby-500)", color: "var(--cream)" }
          }
        >
          {t(`tag.${product.tag}`)}
        </span>
      )}
      {/* photo from the admin page if uploaded, otherwise the line icon */}
      <div
        className="w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center mt-5 mb-3"
        style={{ background: gem.tint }}
      >
        {product.image ? (
          <img src={product.image} alt={tx(product.name)} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="vj-icon-wrap" style={{ color: gem[500] }}>
            <JewelGlyph category={product.category} />
          </div>
        )}
      </div>
      <div className="text-sm" style={{ color: "var(--ink)" }}>
        {tx(product.name)}
      </div>
      <div className="vj-mono text-[10px] mt-1" style={{ color: "var(--ink-soft)" }}>
        {t(`metal.${product.metal}`)} · {fmtWeight(product.weight, t("unit.g"))}
      </div>
      <div className="vj-display text-lg font-semibold mt-2" style={{ color: "var(--ink)" }}>
        {fmtINR(product.base22)}
      </div>
      <button
        onClick={() => onQuickView(product)}
        className="vj-focus mt-3 text-xs px-4 py-1.5 rounded-full border"
        style={{ borderColor: gem[500], color: gem[700] }}
      >
        {t("card.quickView")}
      </button>
    </div>
  );
}
