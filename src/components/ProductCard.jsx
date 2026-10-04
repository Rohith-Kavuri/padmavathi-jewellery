import { ShoppingBag, ZoomIn } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR, fmtWeight } from "../utils/format";
import { getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

export default function ProductCard({ product, onQuickView, onAddToCart, onViewImage }) {
  const { t, tx } = useLang();
  const gem = getGem(product.category);

  return (
    <div
      className="group vj-card vj-product flex flex-col items-center text-center p-4 md:p-5 relative"
      style={{
        background: "var(--cream-card)",
        border: "1px solid rgba(227,170,44,0.28)",
        borderRadius: 16,
        boxShadow: "0 14px 34px -24px rgba(74,11,24,0.55)",
      }}
    >
      {/* gold ribbon badge */}
      {product.tag && (
        <span
          className="vj-ribbon absolute top-4 left-0 z-10 text-[10px] font-semibold pl-3 pr-4 py-1"
          style={
            product.tag === "New"
              ? { background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)" }
              : { background: "linear-gradient(90deg, var(--plum-900), var(--ruby-500))", color: "var(--gold-100)" }
          }
        >
          {t(`tag.${product.tag}`)}
        </span>
      )}

      {/* photo from the admin page if uploaded, otherwise the line icon */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center mb-3"
        style={{ background: gem.tint }}
      >
        {product.image ? (
          <button
            type="button"
            className="vj-focus block w-full h-full cursor-zoom-in"
            aria-label={t("lightbox.view", { name: product.name })}
            onClick={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (onViewImage) {
                onViewImage({
                  src: product.image,
                  alt: tx(product.name),
                  rect: img.getBoundingClientRect(),
                  title: tx(product.name),
                  subtitle: `${t(`metal.${product.metal}`)} · ${fmtWeight(product.weight, t("unit.g"))} · ${fmtINR(product.base22)}`,
                });
              } else onQuickView(product);
            }}
          >
            <img
              src={product.image}
              alt={tx(product.name)}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* zoom hint on hover */}
            <span
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(36,5,13,0.6)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.6)" }}
              aria-hidden="true"
            >
              <ZoomIn size={15} />
            </span>
          </button>
        ) : (
          <div className="vj-icon-wrap" style={{ color: gem[500] }}>
            <JewelGlyph category={product.category} />
          </div>
        )}

        {/* "Add to bag" slides up on hover (laptops) */}
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(product)}
            className="vj-focus vj-shimmer hidden md:flex absolute inset-x-3 bottom-3 items-center justify-center gap-2 rounded-full py-2 text-xs font-semibold translate-y-[140%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 transition-all duration-300"
            style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
          >
            <ShoppingBag size={14} /> {t("quickview.add")}
          </button>
        )}
      </div>

      <div className="text-sm leading-snug" style={{ color: "var(--ink)" }}>
        {tx(product.name)}
      </div>
      <div className="vj-mono text-[10px] mt-1" style={{ color: "var(--ink-soft)" }}>
        {t(`metal.${product.metal}`)} · {fmtWeight(product.weight, t("unit.g"))}
      </div>
      <div className="vj-display text-xl font-semibold mt-1.5" style={{ color: "#8a5a0e" }}>
        {fmtINR(product.base22)}
      </div>
      <button
        onClick={() => onQuickView(product)}
        className="vj-focus mt-3 text-xs px-5 py-1.5 rounded-full border border-[rgba(142,29,51,0.5)] text-[#4a0b18] transition-colors hover:bg-[#4a0b18] hover:text-[#fbecc8]"
      >
        {t("card.quickView")}
      </button>
    </div>
  );
}
