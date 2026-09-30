import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR, priceFor, fmtWeight } from "../utils/format";
import { getGem, categoryLabel } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

// Sample video used for every product's Quick View (per request) until
// real per-product product videos are available.
const VIDEO_ID = "3-3hAZZwMss"; // https://youtu.be/3-3hAZZwMss
const MEDIA_SLIDES = ["image", "video"];

export default function QuickViewModal({ product, purity, setPurity, onClose, onAddToCart }) {
  const { t, tx } = useLang();
  const [mediaIndex, setMediaIndex] = useState(0);

  // reset to the image slide whenever a different product is opened
  useEffect(() => {
    setMediaIndex(0);
  }, [product?.id]);

  if (!product) return null;
  const gem = getGem(product.category);

  function goTo(i) {
    setMediaIndex(((i % MEDIA_SLIDES.length) + MEDIA_SLIDES.length) % MEDIA_SLIDES.length);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(31,24,37,0.55)" }}
      onClick={onClose}
    >
      <div className="vj-modal-enter w-full max-w-lg rounded-2xl overflow-hidden" style={{ background: "var(--cream)" }} onClick={(e) => e.stopPropagation()}>
        {/* sliding media view: product glyph <-> video */}
        <div className="relative" style={{ height: 220, background: "#000" }}>
          <div
            className="absolute inset-0 vj-slide"
            style={{ opacity: mediaIndex === 0 ? 1 : 0, pointerEvents: mediaIndex === 0 ? "auto" : "none" }}
          >
            {product.image ? (
              <img src={product.image} alt={tx(product.name)} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})` }}>
                <div style={{ color: gem.tint, width: 110, height: 110 }}>
                  <JewelGlyph category={product.category} className="w-full h-full" />
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute inset-0 vj-slide"
            style={{ opacity: mediaIndex === 1 ? 1 : 0, pointerEvents: mediaIndex === 1 ? "auto" : "none" }}
          >
            {mediaIndex === 1 && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                title={t("quickview.video", { name: product.name })}
                style={{ display: "block", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <button
            onClick={() => goTo(mediaIndex - 1)}
            className="vj-focus absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
            style={{ background: "rgba(31,24,37,0.5)", color: "white" }}
            aria-label={t("aria.prev")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => goTo(mediaIndex + 1)}
            className="vj-focus absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
            style={{ background: "rgba(31,24,37,0.5)", color: "white" }}
            aria-label={t("aria.next")}
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {MEDIA_SLIDES.map((s, i) => (
              <button
                key={s}
                onClick={() => goTo(i)}
                aria-label={t(s === "image" ? "aria.showImage" : "aria.showVideo")}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: i === mediaIndex ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
                {tx(product.name)}
              </h3>
              <div className="vj-mono text-xs mt-1" style={{ color: gem[700] }}>
                {tx(categoryLabel(product.category))} · {t(`metal.${product.metal}`)} · {fmtWeight(product.weight, t("unit.g"))}
              </div>
            </div>
            <button onClick={onClose} className="vj-focus" aria-label={t("aria.close")}>
              <X size={20} />
            </button>
          </div>
          <p className="text-sm mt-3" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {tx(product.desc)}
          </p>

          {product.metal === "Gold" && (
            <div className="mt-4">
              <div className="text-xs mb-2" style={{ color: "var(--ink)", opacity: 0.7 }}>
                {t("quickview.purity")}
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
              {t("quickview.add")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
