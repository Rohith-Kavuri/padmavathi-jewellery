import { ArrowRight } from "lucide-react";
import { FEATURED } from "../data/site";
import { useLang } from "../i18n/LanguageContext";

// Large two-part spotlight: collection photo in a gold arch on one side,
// its story and a button on the other. Edited in the admin page
// (Homepage → Featured collection).
export default function FeaturedSpotlight({ onExplore }) {
  const { tx } = useLang();
  if (!FEATURED.image) return null;

  return (
    <section className="px-4 md:px-6 py-12 md:py-16">
      <div
        className="vj-on-dark group max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-14 rounded-3xl p-6 md:p-12 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, #8E1D33 0%, #5C0F20 50%, #2C0610 100%)",
          border: "1px solid rgba(227,170,44,0.5)",
          boxShadow: "0 40px 80px -40px rgba(36,5,13,0.8)",
        }}
      >
        <div
          className="mx-auto w-full max-w-sm overflow-hidden"
          style={{
            aspectRatio: "0.82",
            borderRadius: "50% 50% 16px 16px / 34% 34% 16px 16px",
            border: "2px solid rgba(255,201,60,0.7)",
            boxShadow: "0 0 0 8px rgba(255,201,60,0.1), 0 30px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <img src={FEATURED.image} alt={tx(FEATURED.title)} loading="lazy" className="vj-kb-hover w-full h-full object-cover" />
        </div>

        <div className="text-center md:text-left">
          <div className="vj-mono text-[11px] tracking-widest mb-3" style={{ color: "var(--gold-300)" }}>
            {tx(FEATURED.eyebrow)}
          </div>
          <h2 className="vj-display text-4xl md:text-5xl leading-tight mb-4">{tx(FEATURED.title)}</h2>
          <div className="h-px w-16 mb-5 mx-auto md:mx-0" style={{ background: "var(--gold-500)" }} />
          <p className="text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-8" style={{ color: "rgba(251,236,200,0.85)" }}>
            {tx(FEATURED.text)}
          </p>
          <button
            onClick={() => onExplore(FEATURED.category)}
            className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
            style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)" }}
          >
            {tx(FEATURED.button)} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
