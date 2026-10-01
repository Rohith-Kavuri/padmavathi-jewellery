import { useEffect, useMemo, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImg from "../assets/padmavathi-logo-transparent.webp";
import necklaceImg from "../assets/hero-temple-necklace-hd.webp";
import { useLang } from "../i18n/LanguageContext";
import heroFile from "../content/hero.json";

// Four hero panels.
//  1. "brand"  — the first thing visitors see: the logo (black background
//     removed) on one half and a temple-gold necklace on the other, on the
//     brand's maroon velvet. The necklace image is cropped from the brand's
//     own collections poster, upscaled 4x with Real-ESRGAN for sharpness.
//  2+.        — banner images managed from the admin page (Homepage →
//               Hero slides), saved in src/content/hero.json. Each can have
//               a separate phone image, and is shown either whole ("contain",
//               on a blurred copy of itself) or filling the slide ("cover").

const imageSlides = (heroFile.slides || [])
  .filter((s) => s && s.image)
  .map((s, i) => ({
    id: `slide-${i}`,
    type: "image",
    src: s.image,
    srcMobile: s.image_mobile || null,
    fit: s.fit === "cover" ? "cover" : "contain",
    bg: "#2C0610",
    caption: null,
    alt: { en: s.alt_en || "", te: s.alt_te || s.alt_en || "" },
  }));

// The logo slide can be switched off in the admin page; it's always kept if
// there are no banner images, so the hero is never empty.
//
// On laptops (1024px+) the "show whole image" banners are portrait, so a
// single one leaves wide empty sides. There, they're grouped into one
// "gallery" slide that shows them side by side like a shop window. Phones
// keep one banner per slide.
const SLIDES = [
  ...(heroFile.show_brand_slide !== false || imageSlides.length === 0 ? [{ id: "brand", type: "brand", caption: null }] : []),
  ...imageSlides,
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
            <img src={necklaceImg} alt={t("hero.alt.necklace")} className="vj-kb block w-full h-full" style={{ objectFit: "cover" }} />
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

function useIsWide(query = "(min-width: 1024px)") {
  const get = () => typeof window !== "undefined" && window.matchMedia(query).matches;
  const [wide, setWide] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return wide;
}

function GallerySlide({ images, tx }) {
  const n = images.length;
  return (
    <>
      <img
        src={images[0].src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", filter: "blur(30px) brightness(0.4) saturate(1.2)", transform: "scale(1.15)" }}
      />
      <div className="vj-kb absolute inset-0 flex items-center justify-center gap-8 px-16">
        {images.map((im) => (
          <img
            key={im.id}
            src={im.src}
            alt={tx(im.alt)}
            className="block w-auto h-auto rounded-xl"
            style={{
              maxHeight: "calc(var(--hero-h) - 80px)",
              maxWidth: `calc((100vw - 8rem - ${(n - 1) * 2}rem) / ${n})`,
              border: "2px solid rgba(255,201,60,0.6)",
              boxShadow: "0 30px 60px -20px rgba(0,0,0,0.75)",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function HeroImageCarousel({ fullBleed = false, children }) {
  const { t, tx } = useLang();
  const isWide = useIsWide();
  const slides = useMemo(() => {
    const contain = SLIDES.filter((s) => s.type === "image" && s.fit === "contain");
    if (!isWide || contain.length < 2) return SLIDES;
    const gallery = { id: "gallery", type: "gallery", images: contain.slice(0, 3), caption: null };
    const out = [];
    SLIDES.forEach((s) => {
      if (s === contain[0]) out.push(gallery);
      else if (!contain.slice(0, 3).includes(s)) out.push(s);
    });
    return out;
  }, [isWide]);
  const [index, setIndex] = useState(0);
  useEffect(() => setIndex((i) => (i < slides.length ? i : 0)), [slides.length]);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  function goTo(i) {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }

  const containerClass = fullBleed
    ? "relative overflow-hidden w-full"
    : "vj-float-panel vj-archlg relative overflow-hidden";

  const containerStyle = fullBleed
    ? { "--hero-h": "clamp(400px, min(70vh, 125vw), 660px)", height: "var(--hero-h)" }
    : { "--hero-h": "380px", height: 380, border: "1px solid var(--line)", boxShadow: "0 30px 60px -25px rgba(43,34,48,0.45)" };

  return (
    <div className={containerClass} style={containerStyle} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 vj-slide"
          style={{ opacity: i === index ? 1 : 0, background: s.type === "image" || s.type === "gallery" ? "#2C0610" : undefined }}
          aria-hidden={i !== index}
        >
          {s.type === "brand" ? (
            <BrandSlide t={t} />
          ) : s.type === "gallery" ? (
            <GallerySlide images={s.images} tx={tx} />
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
              {/* phones get the optional phone image, everything else the main one */}
              <picture>
                {s.srcMobile && <source media="(max-width: 639px)" srcSet={s.srcMobile} />}
                <img
                  src={s.src}
                  alt={tx(s.alt)}
                  className="vj-kb relative w-full h-full"
                  style={{ objectFit: s.fit || "cover", objectPosition: "center", filter: s.fit === "contain" ? "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" : undefined }}
                />
              </picture>
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
      {slides[index]?.caption && (
        <div
          className={fullBleed ? "absolute top-5 right-5 md:right-8 vj-mono text-[10px]" : "absolute bottom-4 left-5 right-16 vj-mono text-[10px]"}
          style={{ color: "var(--gold-100)", opacity: 0.9 }}
        >
          {t(slides[index].caption)}
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
        {slides.map((s, i) => (
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
