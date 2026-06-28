import { X } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR, priceFor } from "../utils/format";
import { getGem } from "../data/products";

export default function QuickViewModal({ product, purity, setPurity, onClose, onAddToCart }) {
  if (!product) return null;
  const gem = getGem(product.category);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(31,24,37,0.55)" }}
      onClick={onClose}
    >
      <div className="vj-modal-enter w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: "var(--cream)" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center py-8" style={{ background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})` }}>
          <div style={{ color: gem.tint, width: 110, height: 110 }}>
            <JewelGlyph category={product.category} className="w-full h-full" />
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
                {product.name}
              </h3>
              <div className="vj-mono text-xs mt-1" style={{ color: gem[700] }}>
                {product.category} · {product.metal} · {product.weight}
              </div>
            </div>
            <button onClick={onClose} className="vj-focus" aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {product.desc}
          </p>

          {product.metal === "Gold" && (
            <div className="mt-4">
              <div className="text-xs mb-2" style={{ color: "var(--ink)", opacity: 0.7 }}>
                Purity
              </div>
              <div className="flex gap-2">
                {[18, 22, 24].map((k) => (
                  <button
                    key={k}
                    onClick={() => setPurity(k)}
                    className="vj-chip vj-focus text-xs px-4 py-1.5 rounded-full border"
                    style={
                      purity === k
                        ? { background: gem[500], color: "white", borderColor: gem[500] }
                        : { borderColor: "var(--line)", color: "var(--ink)" }
                    }
                  >
                    {k}K
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-5">
            <div className="vj-display text-2xl font-semibold" style={{ color: "var(--plum-900)" }}>
              {fmtINR(priceFor(product, purity))}
            </div>
            <button
              onClick={() => onAddToCart(product, product.metal === "Gold" ? purity : 22)}
              className="vj-focus px-6 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "linear-gradient(90deg, var(--ruby-500), var(--amethyst-500))", color: "white" }}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
