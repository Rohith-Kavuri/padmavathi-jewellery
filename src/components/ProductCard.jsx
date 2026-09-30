import JewelGlyph from "./JewelGlyph";
import { fmtINR, fmtWeight } from "../utils/format";
import { getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

export default function ProductCard({ product, onQuickView }) {
  const { t, tx } = useLang();
  const gem = getGem(product.category);

  return (
    <div
      className="vj-card flex flex-col items-center text-center p-5 relative"
      style={{
        background: "var(--cream-card)",
        border: "1px solid var(--line)",
        borderTop: `4px solid ${gem[500]}`,
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
      <div className="vj-icon-wrap my-3" style={{ color: gem[500] }}>
        <JewelGlyph category={product.category} />
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
