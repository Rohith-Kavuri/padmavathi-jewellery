import { BookOpen } from "lucide-react";
import { CATALOGUES } from "../data/site";
import { useLang } from "../i18n/LanguageContext";

// "Take the collection home": every catalogue PDF added in the admin page
// (Homepage → Catalogues) shown as a book. Tapping a book or its button opens
// the PDF to view (no download button). With none added it says "coming soon".

// #toolbar=0 hides the download/print bar in Chrome and Edge's PDF viewer.
const viewUrl = (pdf) => `${pdf}#toolbar=0&navpanes=0`;

function Book({ cat, lang, t, tx }) {
  const date = cat.updated
    ? cat.updated.toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";
  const meta = [cat.pages ? t("catalogue.pages", { count: cat.pages }) : "", date ? t("catalogue.updated", { date }) : ""]
    .filter(Boolean)
    .join(" · ");
  const name = tx(cat.title);

  return (
    <div className="flex flex-col items-center text-center w-full max-w-[9rem] mx-auto odd:last:col-span-2 md:w-52 md:max-w-none md:mx-0">
      <a href={viewUrl(cat.pdf)} target="_blank" rel="noopener" aria-label={`${t("catalogue.view")}: ${name}`} className="vj-book vj-focus block w-full">
        <div className="vj-book-inner relative w-full">
          {cat.cover ? (
            <img src={cat.cover} alt={t("catalogue.coverAlt", { name })} loading="lazy" className="block w-full rounded-r-md rounded-l-sm" />
          ) : (
            <div
              className="w-full aspect-[7/10] rounded-r-md rounded-l-sm flex items-center justify-center vj-display text-xl text-center px-4"
              style={{ background: "radial-gradient(ellipse at 50% 35%, #8E1D33, #2C0610)", color: "var(--gold-300)" }}
            >
              {name}
            </div>
          )}
          {/* spine shading */}
          <span
            className="absolute inset-y-0 left-0 w-3 md:w-4 rounded-l-sm pointer-events-none"
            style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.12) 60%, rgba(0,0,0,0))" }}
          />
        </div>
      </a>
      <div className="vj-display text-lg md:text-2xl font-semibold leading-tight mt-5 md:mt-6" style={{ color: "var(--plum-900)" }}>
        {name}
      </div>
      {meta && (
        <div className="vj-mono text-[10px] md:text-[11px] tracking-wider mt-1" style={{ color: "var(--ink-soft)" }}>
          {meta}
        </div>
      )}
      <a
        href={viewUrl(cat.pdf)}
        target="_blank"
        rel="noopener"
        className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 mt-3 text-xs md:text-sm whitespace-nowrap font-semibold"
        style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
      >
        <BookOpen size={15} /> {t("catalogue.view")}
      </a>
    </div>
  );
}

export default function CatalogueSection({ onBookVisit }) {
  const { lang, t, tx } = useLang();
  const has = CATALOGUES.length > 0;

  return (
    <section id="catalogue-section" className="px-4 md:px-6 py-14 md:py-20" style={{ scrollMarginTop: 80 }}>
      <div
        className="max-w-6xl mx-auto rounded-3xl px-5 py-10 md:px-14 md:py-14"
        style={{
          background: "linear-gradient(135deg, #FDF6E8 0%, #F6E6C6 100%)",
          border: "1px solid rgba(168,118,28,0.4)",
          boxShadow: "0 30px 60px -40px rgba(74,11,24,0.55)",
        }}
      >
        <div className="text-center max-w-2xl mx-auto">
          <div className="vj-mono text-xs tracking-widest mb-3" style={{ color: "var(--gold-700)" }}>
            ✦ {t("catalogue.eyebrow")} ✦
          </div>
          <h2 className="vj-display text-4xl md:text-5xl leading-tight mb-4 font-semibold">{t("catalogue.title")}</h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {has ? t("catalogue.body") : t("catalogue.soon")}
          </p>
        </div>

        {has ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:flex md:flex-wrap md:justify-center md:gap-x-16 mt-10 md:mt-12">
            {CATALOGUES.map((cat) => (
              <Book key={cat.pdf} cat={cat} lang={lang} t={t} tx={tx} />
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <button
              onClick={onBookVisit}
              className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
            >
              {t("nav.book")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
