import { ArrowRight } from "lucide-react";
import { OCCASIONS } from "../data/site";
import { useLang } from "../i18n/LanguageContext";

// Four photo cards — Bridal, Festive, Daily Wear, Gifting. Each opens a
// category in the collection. Edited in the admin page (Homepage → Shop by
// occasion).
export default function OccasionShowcase({ onSelect }) {
  const { t, tx } = useLang();
  if (!OCCASIONS.length) return null;

  return (
    <section className="px-4 md:px-6 pt-10 pb-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="vj-display text-2xl md:text-3xl mb-6" style={{ color: "var(--plum-900)" }}>
          {t("occasion.heading")}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {OCCASIONS.map((o, i) => (
            <button
              key={i}
              onClick={() => onSelect(o.category)}
              className="vj-focus group relative overflow-hidden text-left rounded-2xl"
              style={{
                aspectRatio: "3 / 4",
                background: "linear-gradient(160deg, #8E1D33, #4A0B18)",
                border: "1px solid rgba(227,170,44,0.55)",
                boxShadow: "0 18px 36px -22px rgba(36,5,13,0.7)",
              }}
            >
              {o.image && (
                <img
                  src={o.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <span
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(36,5,13,0) 35%, rgba(36,5,13,0.88) 100%)" }}
              />
              {/* thin inner gold frame */}
              <span className="absolute inset-2 rounded-xl pointer-events-none" style={{ border: "1px solid rgba(242,196,90,0.35)" }} />
              <span className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <span className="block vj-display text-xl md:text-2xl" style={{ color: "var(--gold-100)" }}>
                  {tx(o.title)}
                </span>
                <span className="block text-[11px] md:text-xs mt-0.5" style={{ color: "rgba(251,236,200,0.8)" }}>
                  {tx(o.text)}
                </span>
                <span className="inline-flex items-center gap-1 mt-2 text-[11px] md:text-xs font-semibold" style={{ color: "var(--gold-300)" }}>
                  {t("occasion.explore")} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
