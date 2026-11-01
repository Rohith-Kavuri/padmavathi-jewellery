import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Link2, Share2, Check } from "lucide-react";
import JewelGlyph from "./JewelGlyph";
import { fmtINR, priceFor, fmtWeight } from "../utils/format";
import { getGem, categoryLabel } from "../data/products";
import { useLang } from "../i18n/LanguageContext";
import { whatsappWith, whatsappShare } from "../data/site";
import WhatsAppIcon from "./WhatsAppIcon";
import { photo, sized } from "../data/media";

// "Share this piece": the piece's own page (/p/<slug>/). WhatsApp shows that
// page's photo and name in the chat; opening it lands on this Quick view.
const pieceUrl = (product) => `${window.location.origin}/p/${product.slug}/`;
const canNativeShare = () => typeof navigator !== "undefined" && typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches;

function ShareRow({ product }) {
  const { t, tx } = useLang();
  const [copied, setCopied] = useState(false);
  const url = pieceUrl(product);
  const message = t("share.message", { name: tx(product.name) });
  const native = canNativeShare();

  useEffect(() => setCopied(false), [product.id]);

  async function more() {
    if (native) {
      try {
        await navigator.share({ title: tx(product.name), text: message, url });
      } catch {}
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const box = document.createElement("textarea");
      box.value = url;
      document.body.appendChild(box);
      box.select();
      try { document.execCommand("copy"); } catch {}
      box.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="flex items-center gap-2 mt-5 pt-4" style={{ borderTop: "1px solid var(--line)" }}>
      <a
        href={whatsappShare(`${message}\n${url}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="vj-focus flex-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors border border-[#1f8f4e] text-[#17703c] hover:bg-[#1f8f4e] hover:text-white"
      >
        <WhatsAppIcon size={17} /> {t("share.button")}
      </a>
      <button
        type="button"
        onClick={more}
        aria-label={native ? t("share.more") : t("share.copy")}
        title={native ? t("share.more") : t("share.copy")}
        className="vj-focus relative w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center transition-colors"
        style={{ border: "1px solid rgba(142,29,51,0.35)", color: copied ? "#17703c" : "var(--plum-900)" }}
      >
        {copied ? <Check size={18} /> : native ? <Share2 size={17} /> : <Link2 size={18} />}
        <span
          role="status"
          className="absolute bottom-full mb-2 right-0 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold pointer-events-none transition-opacity"
          style={{ background: "var(--plum-900)", color: "var(--gold-100)", opacity: copied ? 1 : 0 }}
        >
          {copied ? t("share.copied") : ""}
        </span>
      </button>
    </div>
  );
}

export default function QuickViewModal({ product, purity, setPurity, onClose, onAddToCart, onViewImage }) {
  const { t, tx } = useLang();
  const [mediaIndex, setMediaIndex] = useState(0);
  // photos already shown once stay loaded; the rest load as they come up
  const [seen, setSeen] = useState(() => new Set([0]));
  const swipe = useRef(null);

  // back to the first photo whenever a different product is opened
  useEffect(() => {
    setMediaIndex(0);
    setSeen(new Set([0]));
  }, [product?.id]);

  if (!product) return null;
  const gem = getGem(product.category);
  // the piece's photos (admin page: "Photo" plus "More photos")
  const photos = product.photos || [];
  const count = photos.length;

  function goTo(i) {
    if (count < 2) return;
    const next = ((i % count) + count) % count;
    setMediaIndex(next);
    setSeen((s) => (s.has(next) ? s : new Set(s).add(next)));
  }

  // swipe left/right on phones to change photo (a tap still opens the zoom)
  const onTouchStart = (e) => {
    const p = e.touches[0];
    swipe.current = { x: p.clientX, y: p.clientY, moved: false };
  };
  const onTouchEnd = (e) => {
    const s = swipe.current;
    if (!s) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(p.clientY - s.y)) {
      s.moved = true;
      goTo(mediaIndex + (dx < 0 ? 1 : -1));
    }
  };
  const swiped = () => {
    const moved = swipe.current?.moved;
    swipe.current = null;
    return moved;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(31,24,37,0.55)" }}
      onClick={onClose}
    >
      <div
        className="vj-modal-enter w-full max-w-lg md:max-w-4xl md:flex rounded-2xl overflow-hidden overflow-y-auto"
        style={{ background: "var(--cream)", maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* the piece's photos as a slideshow (arrows, dots, swipe on phones).
            Square so product photos show in full: full width on phones,
            left half of the window from tablet size up. Tap a photo to zoom. */}
        <div
          className="relative w-full md:w-1/2 flex-shrink-0 aspect-square overflow-hidden"
          style={{ background: "#000" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {count ? (
            photos.map((src, i) => (
              <div
                key={src + i}
                className="absolute inset-0 vj-slide"
                style={{ opacity: i === mediaIndex ? 1 : 0, pointerEvents: i === mediaIndex ? "auto" : "none" }}
                aria-hidden={i !== mediaIndex}
              >
                {(seen.has(i) || i === (mediaIndex + 1) % count) && (
                  <button
                    type="button"
                    tabIndex={i === mediaIndex ? 0 : -1}
                    className="vj-focus group absolute inset-0 w-full h-full cursor-zoom-in"
                    aria-label={t("lightbox.view", { name: product.name })}
                    onClick={(e) => {
                      if (swiped()) return;
                      onViewImage?.({
                        src: sized(src, 1200),
                        alt: tx(product.name),
                        rect: e.currentTarget.querySelector("img").getBoundingClientRect(),
                        title: tx(product.name),
                        subtitle: [t(`metal.${product.metal}`), product.weight != null && fmtWeight(product.weight, t("unit.g")), product.showPrice ? fmtINR(priceFor(product, purity)) : t("price.onRequest")].filter(Boolean).join(" · "),
                      });
                    }}
                  >
                    <img
                      {...photo(src, [600, 900, 1200], "(min-width: 768px) 448px, 100vw")}
                      alt={count > 1 ? `${tx(product.name)} (${i + 1}/${count})` : tx(product.name)}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${gem[500]}, ${gem[700]})` }}>
              <div style={{ color: gem.tint, width: 110, height: 110 }}>
                <JewelGlyph category={product.category} className="w-full h-full" />
              </div>
            </div>
          )}

          {count > 0 && (
            <span
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold pointer-events-none"
              style={{ background: "rgba(36,5,13,0.65)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.6)" }}
            >
              <ZoomIn size={13} /> {t("lightbox.tapToZoom")}
            </span>
          )}

          {count > 1 && (
            <>
              <span
                className="vj-mono absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] pointer-events-none"
                style={{ background: "rgba(36,5,13,0.65)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.45)" }}
              >
                {mediaIndex + 1} / {count}
              </span>
              <button
                onClick={() => goTo(mediaIndex - 1)}
                className="vj-focus absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(36,5,13,0.55)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.5)" }}
                aria-label={t("aria.prevImage")}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => goTo(mediaIndex + 1)}
                className="vj-focus absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(36,5,13,0.55)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.5)" }}
                aria-label={t("aria.nextImage")}
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => goTo(i)}
                    aria-label={t("aria.showPhoto", { n: i + 1 })}
                    aria-current={i === mediaIndex}
                    className="transition-all"
                    style={{
                      width: i === mediaIndex ? 18 : 7,
                      height: 7,
                      borderRadius: 999,
                      background: i === mediaIndex ? "var(--gold-300)" : "rgba(255,255,255,0.55)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="vj-display text-2xl" style={{ color: "var(--plum-900)" }}>
                {tx(product.name)}
              </h3>
              <div className="vj-mono text-xs mt-1" style={{ color: gem[700] }}>
                {[tx(categoryLabel(product.category)), t(`metal.${product.metal}`), product.weight != null && fmtWeight(product.weight, t("unit.g"))].filter(Boolean).join(" · ")}
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

          <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
            {product.showPrice ? (
              <div className="vj-display text-2xl font-semibold" style={{ color: "var(--plum-900)" }}>
                {fmtINR(priceFor(product, purity))}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <div className="vj-display italic text-xl" style={{ color: "var(--plum-900)" }}>
                  {t("price.onRequest")}
                </div>
                {whatsappWith("x") && (
                  <a
                    href={whatsappWith(t("price.askMessage", { name: tx(product.name) }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vj-focus inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 self-start"
                    style={{ background: "#1f8f4e", color: "#fff" }}
                  >
                    <WhatsAppIcon size={14} /> {t("price.ask")}
                  </a>
                )}
              </div>
            )}
            <button
              onClick={() => onAddToCart(product, product.metal === "Gold" ? purity : 22)}
              className="vj-shimmer vj-focus px-6 py-2.5 rounded-full text-sm font-semibold"
              style={{ background: "linear-gradient(90deg, var(--ruby-500), var(--amethyst-500))", color: "white" }}
            >
              {t("quickview.add")}
            </button>
          </div>

          <ShareRow product={product} />
        </div>
      </div>
    </div>
  );
}
