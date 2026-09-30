import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImg from "../assets/padmavathi-logo-transparent.webp";
import necklaceImg from "../assets/hero-temple-necklace-hd.webp";
import templeJewelleryImg from "../assets/hero-temple-jewellery.webp";
import designerNecklacesImg from "../assets/hero-designer-necklaces.webp";
import { useLang } from "../i18n/LanguageContext";

// Four hero panels.
//  1. "brand"  — the first thing visitors see: the logo (black background
//     removed) on one half and a temple-gold necklace on the other, on the
//     brand's maroon velvet. The necklace image is cropped from the brand's
//     own collections poster, upscaled 4x with Real-ESRGAN for sharpness.
//  2–3.       — collection banners (Temple Jewellery, Designer Necklaces).
//               They are portrait images with their own headline text, so
//               they are shown whole ("contain") on a blurred copy of
//               themselves. To add a slide: import the image and add one
//               { type: "image", fit: "contain" } entry to SLIDES.
// Captions/alt text are translation keys (see src/i18n/strings.js).

const SLIDES = [
  { id: "brand", type: "brand", caption: null },
  // these banners carry their own headings, so no floating caption
  { id: "temple-jewellery", type: "image", src: templeJewelleryImg, bg: "#2C0610", fit: "contain", caption: null, alt: "hero.alt.templeJewellery" },
  { id: "designer-necklaces", type: "image", src: designerNecklacesImg, bg: "#2C0610", fit: "contain", caption: null, alt: "hero.alt.designerNecklaces" },
];

function BrandSlide({ t }) {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 28% 45%, #8E1D33 0%, #5C0F20 45%, #2C0610 100%)" }}
    >
      {/* thin gold frame, echoing the poster's border */}
      <div
        className="absolute inset-3 md:inset-5 pointer-events-none"
        style={{ border: "1px solid rgba(242,183,5,0.35)", borderRadius: 6 }}
      />
      {/* Two equal halves, each centred on both axes. Sizes are derived from
          the slide height (--hero-h, set on the carousel) rather than from
          percentages, so nothing can outgrow the frame on short or wide
          screens; min(100%, …) keeps them inside their half on phones. */}
      <div className="relative h-full max-w-6xl mx-auto grid grid-cols-2 gap-4 md:gap-12 px-10 md:px-20">
        {/* left half — logo */}
        <div className="flex flex-col items-center justify-center text-center min-w-0">
          <img
            src={logoImg}
            alt={t("hero.alt.logo")}
            className="block h-auto"
            style={{
              width: "min(100%, calc(var(--hero-h) * 0.58))",
              filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.35))",
            }}
          />
          <div
            className="vj-display leading-snug"
            style={{
              color: "var(--gold-100)",
              fontSize: "clamp(0.8rem, min(calc(var(--hero-h) * 0.045), 3.6vw), 1.75rem)",
              marginTop: "calc(var(--hero-h) * 0.03)",
            }}
          >
            {t("hero.tagline")}
          </div>
        </div>

        {/* right half — jewellery */}
        <div className="flex flex-col items-center justify-center min-w-0">
          <div
            className="vj-archlg overflow-hidden"
            style={{
              width: "min(100%, calc(var(--hero-h) * 0.66 * 0.913))",
              aspectRatio: "1008 / 1104",
              border: "2px solid rgba(255,201,60,0.75)",
              boxShadow: "0 0 0 6px rgba(255,201,60,0.12), 0 30px 60px -20px rgba(0,0,0,0.65)",
            }}
          >
            <img src={necklaceImg} alt={t("hero.alt.necklace")} className="block w-full h-full" style={{ objectFit: "cover" }} />
          </div>
          <div
            className="vj-mono tracking-widest text-center"
            style={{ color: "var(--gold-300)", fontSize: "clamp(9px, min(calc(var(--hero-h) * 0.022), 2.4vw), 13px)", marginTop: "calc(var(--hero-h) * 0.03)" }}
          >
            {t("hero.necklaceCaption")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroImageCarousel({ fullBleed = false, children }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  function goTo(i) {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }

  const containerClass = fullBleed
    ? "relative overflow-hidden w-full"
    : "vj-float-panel vj-archlg relative overflow-hidden";

  const containerStyle = fullBleed
    ? { "--hero-h": "clamp(400px, min(70vh, 125vw), 660px)", height: "var(--hero-h)" }
    : { "--hero-h": "380px", height: 380, border: "1px solid var(--line)", boxShadow: "0 30px 60px -25px rgba(43,34,48,0.45)" };

  return (
    <div className={containerClass} style={containerStyle} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 vj-slide"
          style={{ opacity: i === index ? 1 : 0, background: s.type === "image" ? s.bg : undefined }}
          aria-hidden={i !== index}
        >
          {s.type === "brand" ? (
            <BrandSlide t={t} />
          ) : s.type === "image" ? (
            <>
              {/* blurred copy fills the side bands so a "contain" image never sits on flat bars */}
              {s.fit === "contain" && (
                <img
                  src={s.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: "cover", filter: "blur(28px) brightness(0.45) saturate(1.2)", transform: "scale(1.15)" }}
                />
              )}
              <img
                src={s.src}
                alt={t(s.alt || s.caption)}
                className="relative w-full h-full"
                style={{ objectFit: s.fit || "cover", objectPosition: "center", filter: s.fit === "contain" ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" : undefined }}
              />
            </>
          ) : null}
        </div>
      ))}

      {/* dark overlay + hero copy — only when there's text content, and only on the first slide */}
      {fullBleed && children && (
        <div
          className="absolute inset-0 vj-hero-copy"
          style={{
            opacity: index === 0 ? 1 : 0,
            pointerEvents: index === 0 ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(100deg, rgba(31,24,37,0.7) 0%, rgba(31,24,37,0.4) 45%, rgba(31,24,37,0.1) 75%)" }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-4 md:px-6 max-w-6xl mx-auto w-full">{children}</div>
          </div>
        </div>
      )}

      {/* slide tag (the brand slide carries its own text) */}
      {SLIDES[index].caption && (
        <div
          className={fullBleed ? "absolute top-5 right-5 md:right-8 vj-mono text-[10px]" : "absolute bottom-4 left-5 right-16 vj-mono text-[10px]"}
          style={{ color: "var(--gold-100)", opacity: 0.9 }}
        >
          {t(SLIDES[index].caption)}
        </div>
      )}

      {/* manual controls */}
      <button
        onClick={() => goTo(index - 1)}
        className="vj-focus absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(31,24,37,0.45)", color: "var(--gold-100)" }}
        aria-label={t("aria.prevImage")}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        className="vj-focus absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(31,24,37,0.45)", color: "var(--gold-100)" }}
        aria-label={t("aria.nextImage")}
      >
        <ChevronRight size={16} />
      </button>

      {/* dots */}
      <div className="absolute bottom-5 right-5 md:right-8 flex gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={t("aria.goToSlide", { n: i + 1 })}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i === index ? "var(--gold-300)" : "rgba(255,241,201,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
