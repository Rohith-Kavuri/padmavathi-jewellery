import { BookOpen, Download } from "lucide-react";
import { CATALOGUE } from "../data/site";
import { useLang } from "../i18n/LanguageContext";

// "Take the collection home": the catalogue PDF (uploaded in the admin page
// under Homepage → Catalogue) shown as a book, with View and Download buttons.
// With no PDF uploaded it says the catalogue is coming soon.
export default function CatalogueSection({ onBookVisit }) {
  const { lang, t } = useLang();
  const has = Boolean(CATALOGUE.pdf);
  const date = CATALOGUE.updated
    ? CATALOGUE.updated.toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const meta = [has && "PDF", CATALOGUE.pages ? t("catalogue.pages", { count: CATALOGUE.pages }) : "", date ? t("catalogue.updated", { date }) : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <section id="catalogue-section" className="px-4 md:px-6 py-14 md:py-20" style={{ scrollMarginTop: 80 }}>
      <div
        className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-16 rounded-3xl px-6 py-10 md:px-14 md:py-14 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FDF6E8 0%, #F6E6C6 100%)",
          border: "1px solid rgba(168,118,28,0.4)",
          boxShadow: "0 30px 60px -40px rgba(74,11,24,0.55)",
        }}
      >
        {/* the book */}
        <a
          href={has ? CATALOGUE.pdf : undefined}
          target="_blank"
          rel="noopener"
          aria-label={t("catalogue.view")}
          className={`vj-book group mx-auto block ${has ? "" : "pointer-events-none"}`}
          tabIndex={has ? 0 : -1}
        >
          <div className="vj-book-inner relative w-44 md:w-56">
            {CATALOGUE.cover ? (
              <img src={CATALOGUE.cover} alt={t("catalogue.coverAlt")} loading="lazy" className="block w-full rounded-r-md rounded-l-sm" />
            ) : (
              <div
                className="w-full aspect-[7/10] rounded-r-md rounded-l-sm flex items-center justify-center vj-display text-2xl text-center px-4"
                style={{ background: "radial-gradient(ellipse at 50% 35%, #8E1D33, #2C0610)", color: "var(--gold-300)" }}
              >
                {t("meta.title")}
              </div>
            )}
            {/* spine shading */}
            <span
              className="absolute inset-y-0 left-0 w-4 rounded-l-sm pointer-events-none"
              style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.12) 60%, rgba(0,0,0,0))" }}
            />
          </div>
        </a>

        {/* words + buttons */}
        <div className="text-center md:text-left">
          <div className="vj-mono text-xs tracking-widest mb-3" style={{ color: "var(--gold-700)" }}>
            ✦ {t("catalogue.eyebrow")} ✦
          </div>
          <h2 className="vj-display text-4xl md:text-5xl leading-tight mb-4 font-semibold">{t("catalogue.title")}</h2>
          <p className="text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-7" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {has ? t("catalogue.body") : t("catalogue.soon")}
          </p>

          {has ? (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href={CATALOGUE.pdf}
                target="_blank"
                rel="noopener"
                className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
                style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
              >
                <BookOpen size={17} /> {t("catalogue.view")}
              </a>
              <a
                href={CATALOGUE.pdf}
                download="Padmavathi-Jewellers-Catalogue.pdf"
                className="vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors hover:bg-[#4a0b18] hover:text-[#fbecc8]"
                style={{ border: "1px solid var(--plum-900)", color: "var(--plum-900)" }}
              >
                <Download size={17} /> {t("catalogue.download")}
              </a>
            </div>
          ) : (
            <button
              onClick={onBookVisit}
              className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
            >
              {t("nav.book")}
            </button>
          )}

          {meta && (
            <div className="vj-mono text-[11px] tracking-wider mt-5" style={{ color: "var(--ink-soft)" }}>
              {meta}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
