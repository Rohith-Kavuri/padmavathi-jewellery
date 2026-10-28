import { ShoppingBag, ArrowRight } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR, fmtWeight } from "../utils/format";
import { getGem } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import { photo } from "../data/media";

// A product in the collection grid: a tall photo edge to edge, the name and
// metal underneath. Tapping anywhere on the card opens Quick view (where the
// photo can be zoomed). On laptops, hovering shows "Quick view" and an
// "Add to bag" button over the photo.
export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const { t, tx } = useLang();
  const gem = getGem(product.category);
  const details = [t(`metal.${product.metal}`), product.weight != null && fmtWeight(product.weight, t("unit.g"))].filter(Boolean).join(" · ");

  return (
    <div
      className="group vj-card vj-product relative flex flex-col overflow-hidden text-center"
      style={{
        background: "var(--cream-card)",
        border: "1px solid rgba(227,170,44,0.32)",
        borderRadius: 16,
        boxShadow: "0 14px 34px -24px rgba(74,11,24,0.55)",
      }}
    >
      {/* photo from the admin page if uploaded, otherwise the line icon */}
      <div className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center" style={{ background: gem.tint }}>
        {product.image ? (
          <img
            {...photo(product.image, [360, 540, 720], "(min-width: 1024px) 270px, (min-width: 768px) 30vw, 46vw")}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="vj-icon-wrap" style={{ color: gem[500] }}>
            <JewelGlyph category={product.category} />
          </div>
        )}

        {/* thin gold line where the photo meets the card */}
        <span
          className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(227,170,44,0), rgba(227,170,44,0.75), rgba(227,170,44,0))" }}
        />

        {/* gold ribbon badge */}
        {product.tag && (
          <span
            className="vj-ribbon absolute top-3 left-0 z-[2] text-[10px] font-semibold pl-3 pr-4 py-1"
            style={
              product.tag === "New"
                ? { background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)" }
                : { background: "linear-gradient(90deg, var(--plum-900), var(--ruby-500))", color: "var(--gold-100)" }
            }
          >
            {t(`tag.${product.tag}`)}
          </span>
        )}

        {/* laptops: "Quick view" and "Add to bag" rise over the photo on hover */}
        <div
          className="hidden md:flex absolute z-[2] inset-x-0 bottom-0 items-center gap-2 p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300"
          style={{ background: "linear-gradient(to top, rgba(36,5,13,0.72), rgba(36,5,13,0))" }}
        >
          <span
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold"
            style={{ background: "rgba(251,236,200,0.95)", color: "var(--plum-900)" }}
            aria-hidden="true"
          >
            {t("card.quickView")} <ArrowRight size={13} />
          </span>
          {onAddToCart && (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              aria-label={`${t("quickview.add")}: ${tx(product.name)}`}
              title={t("quickview.add")}
              className="vj-focus relative z-[2] w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center"
              style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
            >
              <ShoppingBag size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="px-2.5 pt-2.5 pb-3 md:px-3 md:pt-3 md:pb-4">
        {/* the name is the card's button; its tap area covers the whole card */}
        <h3 className="vj-display text-[17px] md:text-lg leading-tight font-semibold capitalize line-clamp-2" style={{ color: "var(--plum-900)" }}>
          <button type="button" onClick={() => onQuickView(product)} className="vj-stretch" aria-label={`${t("card.quickView")}: ${tx(product.name)}`}>
            {tx(product.name)}
          </button>
        </h3>
        {details && (
          <div className="vj-mono text-[10px] tracking-wider mt-1" style={{ color: "var(--gold-700)" }}>
            {details}
          </div>
        )}
        {/* price only when it's switched on; otherwise nothing here
            ("Price on request" and the WhatsApp button are in Quick view) */}
        {product.showPrice && (
          <div className="vj-display text-lg font-semibold mt-1" style={{ color: "#8a5a0e" }}>
            {fmtINR(product.base22)}
          </div>
        )}
      </div>
    </div>
  );
}
