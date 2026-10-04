import { ArrowRight, Feather, IndianRupee, Sparkles, Sun } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useLang } from "../i18n/LanguageContext";

// "Weighs less. Shines more." — what makes the shop different: lightweight
// jewellery with the full traditional look, at prices for every budget.
// (Replaces the old "Since 1971 / showrooms / guilds" placeholder block.)

const POINTS = [
  { key: "light", Icon: Feather },
  { key: "price", Icon: IndianRupee },
  { key: "daily", Icon: Sun },
  { key: "detail", Icon: Sparkles },
];

// Gold line-art feather that drifts gently beside the heading.
function FeatherArt({ className = "", style }) {
  return (
    <svg viewBox="0 0 64 150" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className={className} style={style} aria-hidden="true">
      {/* shaft */}
      <path d="M30 146 C31 110 33 60 38 6" strokeWidth="1.6" />
      {/* vane outline, with the little notches real feathers have */}
      <path d="M31 118 C18 108 9 92 10 74 C11 58 16 46 22 36 L19 33 C24 22 31 12 38 6" fill="currentColor" fillOpacity="0.07" />
      <path d="M38 6 C47 16 54 30 54 46 L51 48 C54 60 54 74 50 88 C46 102 39 112 32 120" fill="currentColor" fillOpacity="0.07" />
      {/* barbs */}
      <path d="M31 104 L15 88 M31 92 L13 74 M32 80 L14 60 M33 68 L19 48 M34 56 L22 38 M35 44 L26 28 M36 32 L30 18" strokeWidth="0.8" opacity="0.75" />
      <path d="M31 106 L46 94 M32 94 L50 80 M33 82 L52 66 M33 70 L52 54 M34 58 L50 42 M35 46 L48 30 M36 34 L44 20" strokeWidth="0.8" opacity="0.75" />
    </svg>
  );
}

export default function WhyUs({ onExplore }) {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section id="heritage-section" ref={ref} className="px-4 md:px-6 py-16 md:py-20" style={{ scrollMarginTop: 80 }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* words */}
        <div className="text-center lg:text-left">
          <div className="vj-mono text-xs tracking-widest mb-3" style={{ color: "var(--gold-700)" }}>
            ✦ {t("why.eyebrow")} ✦
          </div>

          <div className="relative inline-block">
            <h2 className="vj-display text-5xl md:text-7xl leading-[1.02] mb-6 font-semibold">
              <span className="block" style={{ WebkitTextFillColor: "var(--plum-900)" }}>
                {t("why.title1")}
              </span>
              <span className="block italic">{t("why.title2")}</span>
            </h2>
            <FeatherArt
              className="vj-feather absolute w-10 md:w-14 -right-10 md:-right-20 -top-4 md:-top-6"
              style={{ color: "var(--gold-700)" }}
            />
          </div>

          <p className="text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {t("why.body")}
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
            <span className="hidden md:block h-px w-12 flex-shrink-0" style={{ background: "var(--gold-500)" }} />
            <span className="vj-display italic text-xl md:text-2xl" style={{ color: "var(--plum-900)" }}>
              “{t("why.quote")}”
            </span>
            <span className="hidden md:block lg:hidden h-px w-12 flex-shrink-0" style={{ background: "var(--gold-500)" }} />
          </div>

          <button
            onClick={onExplore}
            className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
            style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
          >
            {t("why.cta")} <ArrowRight size={16} />
          </button>
        </div>

        {/* four promise arches, the right-hand column sits a little lower */}
        <div className="grid grid-cols-2 gap-3 md:gap-5 items-start">
          {POINTS.map(({ key, Icon }, i) => (
            <div
              key={key}
              className={`vj-why-card text-center px-3 pt-8 pb-6 md:px-6 md:pt-11 md:pb-8 ${i % 2 ? "mt-8 md:mt-12" : ""}`}
              style={{
                borderRadius: "50% 50% 16px 16px / 30% 30% 16px 16px",
                background: "linear-gradient(180deg, #FDF6E8 0%, #F4E2C2 100%)",
                border: "1px solid rgba(168,118,28,0.35)",
                boxShadow: "0 22px 40px -28px rgba(74,11,24,0.6)",
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(18px)",
                transition: `opacity .7s ease ${i * 120}ms, transform .7s cubic-bezier(.22,.61,.36,1) ${i * 120}ms`,
              }}
            >
              <div
                className="mx-auto mb-3 md:mb-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 32% 28%, #FFF6DC 0%, #F2C45A 62%, #C8922A 100%)",
                  color: "var(--plum-900)",
                  boxShadow: "0 0 0 5px rgba(242,196,90,0.18), 0 8px 16px -8px rgba(122,79,14,0.7)",
                }}
              >
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <div className="vj-display text-lg md:text-2xl font-semibold leading-tight" style={{ color: "var(--plum-900)" }}>
                {t(`why.${key}.title`)}
              </div>
              <div className="text-xs md:text-sm mt-1.5 leading-snug" style={{ color: "var(--ink-soft)" }}>
                {t(`why.${key}.text`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
