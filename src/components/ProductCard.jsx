import { Heart } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR } from "../utils/format";
import { getGem } from "../data/products";

export default function ProductCard({ product, isWishlisted, onToggleWishlist, onQuickView }) {
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
          {product.tag}
        </span>
      )}
      <button onClick={() => onToggleWishlist(product.id)} className="absolute top-3 right-3 vj-focus" aria-label="Save to wishlist">
        <Heart
          size={16}
          fill={isWishlisted ? "var(--ruby-500)" : "none"}
          style={{ color: isWishlisted ? "var(--ruby-500)" : "var(--ink-soft)" }}
        />
      </button>
      <div className="vj-icon-wrap my-3" style={{ color: gem[500] }}>
        <JewelGlyph category={product.category} />
      </div>
      <div className="text-sm" style={{ color: "var(--ink)" }}>
        {product.name}
      </div>
      <div className="vj-mono text-[10px] mt-1" style={{ color: "var(--ink-soft)" }}>
        {product.metal} · {product.weight}
      </div>
      <div className="vj-display text-lg font-semibold mt-2" style={{ color: "var(--ink)" }}>
        {fmtINR(product.base22)}
      </div>
      <button
        onClick={() => onQuickView(product)}
        className="vj-focus mt-3 text-xs px-4 py-1.5 rounded-full border"
        style={{ borderColor: gem[500], color: gem[700] }}
      >
        Quick view
      </button>
    </div>
  );
}
