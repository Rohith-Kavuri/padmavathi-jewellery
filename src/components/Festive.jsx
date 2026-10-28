import { useEffect, useState } from "react";
import festiveFile from "../content/festive.json";
import { WHATSAPP_URL } from "../data/site";
import { useLang } from "../i18n/LanguageContext";
import WhatsAppIcon from "./WhatsAppIcon";
import wordmarkGold from "../assets/padmavathi-wordmark-gold.webp";

// Festive mode (admin page: Homepage → Festive mode). When it's on — and
// until the "turn off after" date passes — the site gets:
//   • a marigold-and-mango-leaf thoranam hanging above the header
//   • a band of glowing diyas under the hero with the festive message
// Everything is drawn in code, so it stays sharp and light.

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const until = festiveFile.until ? String(festiveFile.until).slice(0, 10) : "";
export const FESTIVE = {
  on: festiveFile.enabled === true && (!until || todayISO() <= until),
  thoranam: festiveFile.show_thoranam !== false,
  diyas: festiveFile.show_diyas !== false,
  title: { en: festiveFile.title_en || "", te: festiveFile.title_te || festiveFile.title_en || "" },
  text: { en: festiveFile.text_en || "", te: festiveFile.text_te || festiveFile.text_en || "" },
  wishes: festiveFile.show_wishes_slide !== false,
  wishTitle: { en: festiveFile.wish_title_en || "Happy Diwali", te: festiveFile.wish_title_te || festiveFile.wish_title_en || "దీపావళి శుభాకాంక్షలు" },
  wishText: { en: festiveFile.wish_text_en || "", te: festiveFile.wish_text_te || festiveFile.wish_text_en || "" },
};

/* ---------------- thoranam ---------------- */

const UNIT = 112; // width of one swag + knot, in px

// Shared gradients for every marigold / leaf (one hidden SVG).
function ThoranamDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <radialGradient id="vjMgOrange" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="0.55" stopColor="#f28c0f" />
          <stop offset="1" stopColor="#b4500a" />
        </radialGradient>
        <radialGradient id="vjMgYellow" cx="38%" cy="34%" r="70%">
          <stop offset="0" stopColor="#fff3a0" />
          <stop offset="0.55" stopColor="#f5c518" />
          <stop offset="1" stopColor="#c98a06" />
        </radialGradient>
        <linearGradient id="vjLeaf" x1="0" x2="1">
          <stop offset="0" stopColor="#1f6b2a" />
          <stop offset="0.5" stopColor="#3c9a3c" />
          <stop offset="1" stopColor="#1a5a24" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// A marigold: a ball of ruffled petals.
function Marigold({ x, y, r, yellow }) {
  const petals = [];
  for (let i = 0; i < 10; i++) {
    const a = (i * 36 * Math.PI) / 180;
    petals.push(<circle key={i} cx={x + Math.cos(a) * r * 0.58} cy={y + Math.sin(a) * r * 0.58} r={r * 0.34} fill="rgba(255,255,255,0.17)" />);
  }
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={`url(#${yellow ? "vjMgYellow" : "vjMgOrange"})`} />
      {petals}
      <circle cx={x} cy={y} r={r * 0.24} fill="rgba(120,50,0,0.35)" />
    </g>
  );
}

function Leaf({ angle, len }) {
  return (
    <g transform={`rotate(${angle})`}>
      <path
        d={`M0 0 C9 ${len * 0.3} 8 ${len * 0.75} 0 ${len} C-8 ${len * 0.75} -9 ${len * 0.3} 0 0Z`}
        fill="url(#vjLeaf)"
        stroke="#164d1f"
        strokeWidth="0.8"
      />
      <path d={`M0 2 L0 ${len - 4}`} stroke="#9fd18a" strokeWidth="0.8" opacity="0.7" />
    </g>
  );
}

// One swag of small marigolds, then a knot with mango leaves and a hanging strand.
function Unit({ index }) {
  const swag = [];
  for (let t = 0.1; t < 0.93; t += 0.088) {
    swag.push(<Marigold key={t} x={t * UNIT} y={6 + Math.sin(t * Math.PI) * 15} r={5.2} yellow={Math.round(t * 12) % 2 === 1} />);
  }
  return (
    <svg width={UNIT} height="64" viewBox={`0 0 ${UNIT} 64`} style={{ overflow: "visible", flex: "0 0 auto" }} aria-hidden="true">
      {swag}
      <g className="vj-strand" style={{ animationDelay: `${-(index % 5) * 0.7}s` }}>
        <Leaf angle={-26} len={30} />
        <Leaf angle={26} len={30} />
        <Leaf angle={0} len={36} />
        <Marigold x={0} y={14} r={6.6} />
        <Marigold x={0} y={27} r={6.4} yellow />
        <Marigold x={0} y={40} r={6.2} />
        <path d="M-2.6 48 L0 57 L2.6 48Z" fill="#c9962c" />
      </g>
    </svg>
  );
}

export function FestiveThoranam() {
  const [count, setCount] = useState(() => (typeof window === "undefined" ? 12 : Math.ceil(window.innerWidth / UNIT) + 1));
  useEffect(() => {
    const on = () => setCount(Math.ceil(window.innerWidth / UNIT) + 1);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  if (!FESTIVE.on || !FESTIVE.thoranam) return null;
  return (
    <div
      className="vj-thoranam relative overflow-hidden pointer-events-none"
      style={{ height: 60, background: "var(--cream)", borderBottom: "0" }}
      aria-hidden="true"
    >
      <ThoranamDefs />
      {/* the rope */}
      <div className="absolute inset-x-0 top-[5px] h-[2px]" style={{ background: "#b8862b" }} />
      <div className="flex" style={{ marginLeft: -UNIT / 2 }}>
        {Array.from({ length: count }, (_, i) => (
          <Unit key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- diya band ---------------- */

export function Diya({ delay = 0, size = 46 }) {
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 60 57" className="flex-shrink-0" aria-hidden="true" style={{ overflow: "visible" }}>
      <ellipse className="vj-diya-glow" cx="30" cy="30" rx="34" ry="26" fill="url(#vjDiyaGlow)" style={{ animationDelay: `${delay}s` }} />
      <path d="M4 38 Q30 62 56 38 Q60 34 54 34 L6 34 Q0 34 4 38Z" fill="url(#vjClay)" stroke="#f2c45a" strokeWidth="1" />
      <path d="M8 37 Q30 43 52 37" stroke="#f2c45a" strokeWidth="1.2" fill="none" />
      <g className="vj-flame" style={{ animationDelay: `${delay}s` }}>
        <path d="M30 6 C39 18 36 30 30 34 C24 30 21 18 30 6Z" fill="url(#vjFlame)" />
        <path d="M30 18 C33 24 32 30 30 32 C28 30 27 24 30 18Z" fill="#fffbe6" opacity="0.85" />
      </g>
    </svg>
  );
}

// Diya colours, defined once in an always-visible SVG (a gradient inside a
// hidden element can't be used by the others).
export function DiyaDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <radialGradient id="vjFlame" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#fff8d0" />
          <stop offset="0.45" stopColor="#ffc23a" />
          <stop offset="1" stopColor="#ff7a00" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vjClay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8a13c" />
          <stop offset="1" stopColor="#8a3f10" />
        </linearGradient>
        <radialGradient id="vjDiyaGlow">
          <stop offset="0" stopColor="rgba(255,190,80,0.55)" />
          <stop offset="1" stopColor="rgba(255,190,80,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function FestiveBand() {
  const { t, tx } = useLang();
  if (!FESTIVE.on) return null;
  const row = (side) => (
    <div className={`hidden sm:flex items-end gap-3 md:gap-5 ${side === "r" ? "flex-row-reverse" : ""}`}>
      {[0, 0.4, 0.8].map((d, i) => (
        <Diya key={i} delay={d + (side === "r" ? 0.2 : 0)} size={i === 0 ? 50 : 42 - i * 4} />
      ))}
    </div>
  );
  return (
    <section
      id="festive-band"
      className="relative overflow-hidden px-4 md:px-8 py-5 md:py-6"
      style={{
        background: "linear-gradient(90deg, #2c0610 0%, #6a1428 22%, #b4410c 50%, #6a1428 78%, #2c0610 100%)",
        borderTop: "1px solid rgba(242,196,90,0.6)",
        borderBottom: "1px solid rgba(242,196,90,0.6)",
      }}
    >
      <DiyaDefs />
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {FESTIVE.diyas && row("l")}
        <div className="flex-1 text-center min-w-0">
          {FESTIVE.diyas && (
            <div className="flex sm:hidden justify-center gap-4 mb-2">
              <Diya size={34} />
              <Diya size={34} delay={0.3} />
              <Diya size={34} delay={0.6} />
            </div>
          )}
          <div className="vj-gold-text text-base md:text-2xl font-bold" style={{ letterSpacing: "0.08em" }}>
            {tx(FESTIVE.title)}
          </div>
          {tx(FESTIVE.text) && (
            <div className="vj-display italic text-sm md:text-lg mt-1" style={{ color: "#fff1d6" }}>
              {tx(FESTIVE.text)}
            </div>
          )}
          {WHATSAPP_URL && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vj-focus vj-shimmer inline-flex items-center gap-2 mt-3 rounded-full px-5 py-2 text-xs md:text-sm font-semibold"
              style={{ background: "linear-gradient(90deg, #f2c45a, #fff3c4 45%, #e3aa2c 60%, #f2c45a)", color: "#24050d" }}
            >
              <WhatsAppIcon size={16} /> {t("festive.cta")}
            </a>
          )}
        </div>
        {FESTIVE.diyas && row("r")}
      </div>
    </section>
  );
}

/* ---------------- festive wishes hero slide ---------------- */

// A rangoli mandala: marigold and lotus-pink petals, green leaves and gold
// dots, appearing ring by ring and turning slowly.
function Rangoli({ className = "", style }) {
  const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn(i, (i * 360) / n));
  const drop = (r0, r1, w) => `M0 ${-r0} C${w} ${-r0 - (r1 - r0) * 0.35} ${w * 0.7} ${-r1 + 6} 0 ${-r1} C${-w * 0.7} ${-r1 + 6} ${-w} ${-r0 - (r1 - r0) * 0.35} 0 ${-r0}Z`;
  return (
    <svg viewBox="-200 -200 400 400" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="vjRgPink" cx="50%" cy="80%" r="80%">
          <stop offset="0" stopColor="#ffd3e2" />
          <stop offset="0.5" stopColor="#f0508a" />
          <stop offset="1" stopColor="#b0154f" />
        </radialGradient>
        <radialGradient id="vjRgOrange" cx="50%" cy="80%" r="80%">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.55" stopColor="#f28c0f" />
          <stop offset="1" stopColor="#b4500a" />
        </radialGradient>
        <radialGradient id="vjRgCentre">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset="0.6" stopColor="#f5c518" />
          <stop offset="1" stopColor="#c98a06" />
        </radialGradient>
      </defs>
      <g className="vj-rg vj-rg-4">
        {ring(16, (i, a) => (
          <path key={i} d={drop(150, 192, 15)} transform={`rotate(${a})`} fill={i % 2 ? "url(#vjRgPink)" : "url(#vjRgOrange)"} stroke="#fff3c4" strokeOpacity="0.5" strokeWidth="1" />
        ))}
      </g>
      <g className="vj-rg vj-rg-3">
        <circle r="140" fill="none" stroke="#f2c45a" strokeWidth="2" />
        {ring(32, (i, a) => (
          <circle key={i} cx="0" cy="-130" r={i % 2 ? 3 : 4.5} transform={`rotate(${a})`} fill={i % 2 ? "#fff3c4" : "#f2c45a"} />
        ))}
        {ring(8, (i, a) => (
          <path key={i} d={drop(72, 122, 12)} transform={`rotate(${a + 22.5})`} fill="#2e7d32" stroke="#a5d6a7" strokeOpacity="0.5" strokeWidth="1" />
        ))}
      </g>
      <g className="vj-rg vj-rg-2">
        {ring(8, (i, a) => (
          <path key={i} d={drop(50, 118, 30)} transform={`rotate(${a})`} fill="url(#vjRgPink)" stroke="#fff3c4" strokeOpacity="0.55" strokeWidth="1.2" />
        ))}
        <circle r="58" fill="#4a0b18" stroke="#f2c45a" strokeWidth="2.5" />
      </g>
      <g className="vj-rg vj-rg-1">
        {ring(12, (i, a) => (
          <path key={i} d={drop(16, 54, 9)} transform={`rotate(${a})`} fill="url(#vjRgOrange)" />
        ))}
        <circle r="17" fill="url(#vjRgCentre)" stroke="#fff3c4" strokeWidth="1.5" />
        <circle r="6" fill="#d81b60" />
      </g>
    </svg>
  );
}

// A burst of gold sparks (fireworks), repeating.
function Burst({ style, delay = 0, hue = "#ffd98a", className = "" }) {
  return (
    <svg viewBox="-60 -60 120 120" className={`vj-burst absolute pointer-events-none ${className}`} style={{ ...style, "--bd": `${delay}s` }} aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i * 20 * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={Math.cos(a) * 14} y1={Math.sin(a) * 14} x2={Math.cos(a) * 48} y2={Math.sin(a) * 48} stroke={hue} strokeWidth="2" strokeLinecap="round" />
            <circle cx={Math.cos(a) * 54} cy={Math.sin(a) * 54} r="2.2" fill="#fff3c4" />
          </g>
        );
      })}
    </svg>
  );
}

const WISH_BOKEH = [[18, 30, 0.12], [30, 70, 0.08], [70, 26, 0.1], [84, 68, 0.13], [50, 12, 0.07], [60, 84, 0.09]];

export function DiwaliSlide() {
  const { lang, tx } = useLang();
  const other = lang === "te" ? FESTIVE.wishTitle.en : FESTIVE.wishTitle.te;
  const diyas = 9;
  return (
    <div
      className="vj-diwali absolute inset-0 overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 42%, #6a1428 0%, #3a0812 52%, #16020a 100%)" }}
    >
      <DiyaDefs />
      {WISH_BOKEH.map(([x, y, s], i) => (
        <span
          key={i}
          className="vj-bokeh absolute rounded-full pointer-events-none"
          style={{
            left: `${x}%`, top: `${y}%`, width: `calc(var(--hero-h) * ${s})`, aspectRatio: "1",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,200,110,0.22) 0%, rgba(242,160,60,0.07) 55%, rgba(242,160,60,0) 72%)",
            "--d": `${10 + i * 1.5}s`, "--dx": `${i % 2 ? 16 : -12}px`, "--dy": `${i % 3 ? -18 : 14}px`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* rangoli mandalas peeking in from both sides */}
      <Rangoli
        className="vj-rangoli vj-rangoli-l absolute left-0 pointer-events-none"
        style={{ "--rx": "-50%" }}
      />
      <Rangoli
        className="vj-rangoli vj-rangoli-r absolute right-0 pointer-events-none"
        style={{ "--rx": "50%" }}
      />

      {/* fireworks */}
      {/* fireworks, kept in the open sky above and beside the greeting */}
      <Burst style={{ left: "24%", top: "2%", width: "calc(var(--hero-h) * 0.2)" }} delay={1.6} />
      <Burst style={{ left: "66%", top: "1%", width: "calc(var(--hero-h) * 0.24)" }} delay={2.6} hue="#ffb3c8" />
      <Burst className="hidden md:block" style={{ left: "77%", top: "52%", width: "calc(var(--hero-h) * 0.13)" }} delay={3.7} />
      <Burst className="hidden md:block" style={{ left: "16%", top: "56%", width: "calc(var(--hero-h) * 0.12)" }} delay={4.6} hue="#fff3c4" />

      {/* the wish */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8" style={{ paddingBottom: "calc(var(--hero-h) * 0.16)" }}>
        <div
          className="absolute left-1/2 top-[42%] rounded-full pointer-events-none"
          style={{ width: "calc(var(--hero-h) * 1.2)", aspectRatio: "1.8", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse, rgba(22,2,10,0.6) 0%, rgba(22,2,10,0) 65%)" }}
          aria-hidden="true"
        />
        {other && (
          <div
            className="vj-wish-eyebrow relative"
            style={{ fontSize: "clamp(12px, calc(var(--hero-h) * 0.04), 26px)", color: "var(--gold-300)", fontFamily: "'Noto Serif Telugu', Cinzel, serif", letterSpacing: lang === "te" ? "0.3em" : "0.04em" }}
          >
            ✦ {other} ✦
          </div>
        )}
        <h2
          className="vj-wish-title relative vj-gold-text"
          style={{ fontSize: "clamp(34px, min(calc(var(--hero-h) * 0.15), 14vw), 104px)", lineHeight: 1.15, fontWeight: 700, letterSpacing: "0.06em", marginTop: "calc(var(--hero-h) * 0.02)" }}
        >
          {tx(FESTIVE.wishTitle)}
        </h2>
        <span
          className="vj-wish-rule relative block"
          style={{ width: "min(70%, calc(var(--hero-h) * 0.6))", height: 1.5, margin: "calc(var(--hero-h) * 0.03) 0", background: "linear-gradient(90deg, rgba(242,196,90,0), #f2c45a 20%, #fff3c4 50%, #f2c45a 80%, rgba(242,196,90,0))" }}
          aria-hidden="true"
        />
        {tx(FESTIVE.wishText) && (
          <p
            className="vj-wish-text relative vj-display italic max-w-2xl"
            style={{ fontSize: "clamp(15px, calc(var(--hero-h) * 0.042), 28px)", color: "#fff1d6", lineHeight: 1.4 }}
          >
            {tx(FESTIVE.wishText)}
          </p>
        )}
        <div className="vj-wish-sign relative flex items-center gap-3" style={{ marginTop: "calc(var(--hero-h) * 0.035)" }}>
          <span className="h-px w-8" style={{ background: "var(--gold-500)" }} />
          <img src={wordmarkGold} alt="Padmavathi Jewellers" style={{ height: "clamp(26px, calc(var(--hero-h) * 0.075), 48px)", width: "auto" }} />
          <span className="h-px w-8" style={{ background: "var(--gold-500)" }} />
        </div>
      </div>

      {/* diyas lighting up one by one */}
      <div className="absolute inset-x-0 flex justify-center items-end" style={{ bottom: "calc(var(--hero-h) * 0.05)", gap: "calc(var(--hero-h) * 0.035)" }}>
        {Array.from({ length: diyas }, (_, i) => (
          <span
            key={i}
            className={`vj-ignite ${i === 0 || i === diyas - 1 ? "hidden md:inline-block" : i === 1 || i === diyas - 2 ? "hidden sm:inline-block" : "inline-block"}`}
            style={{ "--ig": `${0.5 + Math.abs(i - (diyas - 1) / 2) * 0.22}s` }}
          >
            <Diya size={Math.round(52 - Math.abs(i - (diyas - 1) / 2) * 3)} delay={i * 0.23} />
          </span>
        ))}
      </div>
    </div>
  );
}
