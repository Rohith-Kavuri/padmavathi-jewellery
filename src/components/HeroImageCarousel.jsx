import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImg from "../assets/padmavathi-logo.png";

// Four hero panels. The first is the brand's actual logo (uploaded asset);
// the remaining three are hand-built gradient + glow illustrations, one per
// gemstone in the brand's color system. Real jewelry photography isn't used
// for those three (copyright/hotlinking risk in a codebase meant to be
// published) — but the logo itself is the brand's own asset, so it's used directly.

const SLIDES = [
  { id: "logo", type: "image", caption: "Padmavathi Jewellery" },
  { id: "emerald", caption: "Emerald Necklace · Deep and Cool" },
  { id: "sapphire", caption: "Sapphire Drops · Cut for Candlelight" },
  { id: "amethyst", caption: "Amethyst Bangles · Everyday Heirlooms" },
];

function SlideArt({ variant }) {
  switch (variant) {
    case "emerald":
      return (
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="bg-emerald" cx="50%" cy="40%" r="75%">
              <stop offset="0%" stopColor="#0B6E3F" />
              <stop offset="100%" stopColor="#1F1825" />
            </radialGradient>
            <radialGradient id="glow-emerald" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5FF0A8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#5FF0A8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gem-emerald" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9CF5C8" />
              <stop offset="55%" stopColor="#16C172" />
              <stop offset="100%" stopColor="#0B6E3F" />
            </linearGradient>
            <linearGradient id="gold-emerald" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A8790C" />
              <stop offset="50%" stopColor="#FFC93C" />
              <stop offset="100%" stopColor="#A8790C" />
            </linearGradient>
            <filter id="blur-emerald"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>
          <rect width="400" height="400" fill="url(#bg-emerald)" />
          <circle cx="200" cy="240" r="110" fill="url(#glow-emerald)" filter="url(#blur-emerald)" />
          <path d="M60 90c5 78 60 130 140 130s135-52 140-130" fill="none" stroke="url(#gold-emerald)" strokeWidth="5" />
          <path d="M85 96c4 68 52 112 115 112s111-44 115-112" fill="none" stroke="url(#gold-emerald)" strokeWidth="2" opacity="0.55" />
          <rect x="172" y="222" width="56" height="56" rx="6" fill="url(#gem-emerald)" transform="rotate(45 200 250)" />
          <rect x="172" y="222" width="56" height="56" rx="6" fill="none" stroke="url(#gold-emerald)" strokeWidth="4" transform="rotate(45 200 250)" />
          <circle cx="130" cy="160" r="7" fill="url(#gold-emerald)" />
          <circle cx="270" cy="160" r="7" fill="url(#gold-emerald)" />
          <circle cx="100" cy="120" r="5" fill="url(#gold-emerald)" />
          <circle cx="300" cy="120" r="5" fill="url(#gold-emerald)" />
          <g opacity="0.85">
            <circle cx="68" cy="190" r="2.2" fill="#DFFCE9" />
            <circle cx="334" cy="200" r="2" fill="#DFFCE9" />
            <circle cx="120" cy="320" r="1.8" fill="#DFFCE9" />
          </g>
        </svg>
      );
    case "sapphire":
      return (
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="bg-sapphire" cx="50%" cy="38%" r="75%">
              <stop offset="0%" stopColor="#1A3F8C" />
              <stop offset="100%" stopColor="#1F1825" />
            </radialGradient>
            <radialGradient id="glow-sapphire" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7FB4FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7FB4FF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gem-sapphire" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AFD2FF" />
              <stop offset="55%" stopColor="#2E7BE0" />
              <stop offset="100%" stopColor="#1A3F8C" />
            </linearGradient>
            <linearGradient id="gold-sapphire" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF1C9" />
              <stop offset="100%" stopColor="#C8941A" />
            </linearGradient>
            <filter id="blur-sapphire"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>
          <rect width="400" height="400" fill="url(#bg-sapphire)" />
          <circle cx="200" cy="210" r="120" fill="url(#glow-sapphire)" filter="url(#blur-sapphire)" />
          <g>
            <circle cx="140" cy="130" r="6" fill="url(#gold-sapphire)" />
            <path d="M140 136c0 22-18 28-18 50a18 18 0 0 0 36 0c0-22-18-28-18-50" fill="url(#gem-sapphire)" />
            <path d="M140 136c0 22-18 28-18 50a18 18 0 0 0 36 0c0-22-18-28-18-50" fill="none" stroke="url(#gold-sapphire)" strokeWidth="2" opacity="0.6" />
          </g>
          <g>
            <circle cx="260" cy="118" r="6" fill="url(#gold-sapphire)" />
            <path d="M260 124c0 22-18 28-18 50a18 18 0 0 0 36 0c0-22-18-28-18-50" fill="url(#gem-sapphire)" />
            <path d="M260 124c0 22-18 28-18 50a18 18 0 0 0 36 0c0-22-18-28-18-50" fill="none" stroke="url(#gold-sapphire)" strokeWidth="2" opacity="0.6" />
          </g>
          <g stroke="#E1ECFF" strokeWidth="1.8" opacity="0.9">
            <path d="M90 220l14 14M104 220l-14 14" />
            <path d="M310 250l12 12M322 250l-12 12" />
            <path d="M150 300l10 10M160 300l-10 10" />
          </g>
        </svg>
      );
    case "amethyst":
    default:
      return (
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="bg-amethyst" cx="50%" cy="45%" r="75%">
              <stop offset="0%" stopColor="#5E2C8C" />
              <stop offset="100%" stopColor="#1F1825" />
            </radialGradient>
            <radialGradient id="glow-amethyst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D8B3FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#D8B3FF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gold-amethyst" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A8790C" />
              <stop offset="50%" stopColor="#FFC93C" />
              <stop offset="100%" stopColor="#A8790C" />
            </linearGradient>
            <filter id="blur-amethyst"><feGaussianBlur stdDeviation="14" /></filter>
          </defs>
          <rect width="400" height="400" fill="url(#bg-amethyst)" />
          <circle cx="210" cy="210" r="120" fill="url(#glow-amethyst)" filter="url(#blur-amethyst)" />
          <circle cx="160" cy="225" r="82" fill="none" stroke="url(#gold-amethyst)" strokeWidth="10" />
          <circle cx="205" cy="195" r="82" fill="none" stroke="url(#gold-amethyst)" strokeWidth="10" opacity="0.9" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const cx = 205 + 82 * Math.cos(rad);
            const cy = 195 + 82 * Math.sin(rad);
            return <circle key={deg} cx={cx} cy={cy} r="6" fill="#9C5BE0" stroke="#FFF1C9" strokeWidth="1" />;
          })}
          <g opacity="0.85">
            <circle cx="320" cy="120" r="2.2" fill="#F3EAFE" />
            <circle cx="90" cy="140" r="2" fill="#F3EAFE" />
            <circle cx="300" cy="320" r="1.8" fill="#F3EAFE" />
          </g>
        </svg>
      );
  }
}

export default function HeroImageCarousel({ fullBleed = false, children }) {
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
    ? { height: "clamp(420px, 64vh, 620px)" }
    : { height: 380, border: "1px solid var(--line)", boxShadow: "0 30px 60px -25px rgba(43,34,48,0.45)" };

  return (
    <div className={containerClass} style={containerStyle} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 vj-slide"
          style={{ opacity: i === index ? 1 : 0, background: s.type === "image" ? "#070707" : undefined }}
          aria-hidden={i !== index}
        >
          {s.type === "image" ? (
            <img src={logoImg} alt="Padmavathi Jewellery" className="w-full h-full" style={{ objectFit: "contain", objectPosition: "center" }} />
          ) : (
            <SlideArt variant={s.id} />
          )}
        </div>
      ))}

      {/* dark overlay + hero copy — only on the logo slide, fades out on the others */}
      {fullBleed && (
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
          {children && (
            <div className="absolute inset-0 flex items-center">
              <div className="px-4 md:px-6 max-w-6xl mx-auto w-full">{children}</div>
            </div>
          )}
        </div>
      )}

      {/* slide tag */}
      <div
        className={fullBleed ? "absolute top-5 right-5 md:right-8 vj-mono text-[10px]" : "absolute bottom-4 left-5 right-16 vj-mono text-[10px]"}
        style={{ color: "var(--gold-100)", opacity: 0.9 }}
      >
        {SLIDES[index].caption}
      </div>

      {/* manual controls */}
      <button
        onClick={() => goTo(index - 1)}
        className="vj-focus absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(31,24,37,0.45)", color: "var(--gold-100)" }}
        aria-label="Previous image"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => goTo(index + 1)}
        className="vj-focus absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full"
        style={{ background: "rgba(31,24,37,0.45)", color: "var(--gold-100)" }}
        aria-label="Next image"
      >
        <ChevronRight size={16} />
      </button>

      {/* dots */}
      <div className="absolute bottom-5 right-5 md:right-8 flex gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
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
