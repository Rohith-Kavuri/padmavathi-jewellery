import { X, Minus, Plus } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { PRODUCTS, getGem } from "../data/products";
import { fmtINR, priceFor } from "../utils/format";
import { useLang } from "../i18n/LanguageContext";

export default function CartDrawer({ open, onClose, cart, onUpdateQty, cartTotal, onCheckoutRequest }) {
  const { t, tx } = useLang();
  return (
    <div className="fixed inset-0 z-50" style={{ pointerEvents: open ? "auto" : "none" }}>
      <div
        className="absolute inset-0"
        style={{ background: "rgba(31,24,37,0.5)", opacity: open ? 1 : 0, transition: "opacity .3s ease" }}
        onClick={onClose}
      />
      <div
        className="vj-drawer absolute right-0 top-0 h-full w-full sm:w-96 p-6 flex flex-col"
        style={{ background: "var(--cream)", transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="vj-display text-xl" style={{ color: "var(--plum-900)" }}>
            {t("cart.title")}
          </h3>
          <button onClick={onClose} className="vj-focus" aria-label={t("cart.closeAria")}>
            <X size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--ink)", opacity: 0.7 }}>
            {t("cart.empty")}
          </p>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col gap-4">
            {cart.map((c) => {
              const p = PRODUCTS.find((pp) => pp.id === c.id);
              const gem = getGem(p.category);
              return (
                <div key={c.id + "-" + c.purity} className="flex gap-3 items-center pb-4" style={{ borderBottom: "1px solid var(--line)" }}>
                  <div
                    className="vj-arch overflow-hidden flex items-center justify-center"
                    style={{ width: 56, height: 56, background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})`, flexShrink: 0 }}
                  >
                    {p.image ? (
                      <img src={p.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div style={{ color: gem.tint, width: 32, height: 32 }}>
                        <JewelGlyph category={p.category} className="w-full h-full" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{tx(p.name)}</div>
                    <div className="vj-mono text-xs" style={{ color: "var(--gold-700)" }}>
                      {p.metal === "Gold" ? c.purity + "K · " : ""}
                      {fmtINR(priceFor(p, c.purity))}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => onUpdateQty(c.id, c.purity, -1)} className="vj-focus" aria-label={t("cart.decrease")}>
                        <Minus size={13} />
                      </button>
                      <span className="text-xs">{c.qty}</span>
                      <button onClick={() => onUpdateQty(c.id, c.purity, 1)} className="vj-focus" aria-label={t("cart.increase")}>
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-4" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="flex justify-between text-sm mb-3">
            <span>{t("cart.total")}</span>
            <span className="vj-mono">{fmtINR(cartTotal)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={onCheckoutRequest}
            className="vj-focus w-full py-3 rounded-full text-sm font-medium disabled:opacity-40"
            style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)", fontWeight: 600 }}
          >
            {t("cart.cta")}
          </button>
          <p className="text-xs text-center mt-2" style={{ color: "var(--ink)", opacity: 0.6 }}>
            {t("cart.note")}
          </p>
        </div>
      </div>
    </div>
  );
}
