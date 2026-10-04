import { useEffect, useMemo, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { CATALOGUES } from "../data/site";
import { CATEGORIES } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

// "Take the collection home": a fanned stack of catalogue covers and a
// "Browse catalogues" button. The button opens a popup where visitors pick a
// category tab and tap a catalogue to view its PDF (no download button).
// Catalogues and their categories are added in the admin page
// (Homepage → Catalogues (PDF)). With none added it says "coming soon".

// #toolbar=0 hides the download/print bar in Chrome and Edge's PDF viewer.
const viewUrl = (pdf) => `${pdf}#toolbar=0&navpanes=0`;

function fmtDate(d, lang) {
  return d ? d.toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";
}

function Cover({ cat, tx }) {
  return cat.cover ? (
    <img src={cat.cover} alt="" loading="lazy" className="block w-full rounded-r-md rounded-l-sm" />
  ) : (
    <div
      className="w-full aspect-[7/10] rounded-r-md rounded-l-sm flex items-center justify-center vj-display text-lg text-center px-3"
      style={{ background: "radial-gradient(ellipse at 50% 35%, #8E1D33, #2C0610)", color: "var(--gold-300)" }}
    >
      {tx(cat.title)}
    </div>
  );
}

function CatalogueModal({ onClose }) {
  const { lang, t, tx } = useLang();
  const [tab, setTab] = useState("All");

  // category tabs: "All" + every category that has at least one catalogue
  const tabs = useMemo(() => {
    const used = new Set(CATALOGUES.map((c) => c.category).filter(Boolean));
    return [{ key: "All", label: null }, ...CATEGORIES.filter((c) => used.has(c.key))];
  }, []);
  const shown = tab === "All" ? CATALOGUES : CATALOGUES.filter((c) => c.category === tab);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t("catalogue.modalTitle")}
    >
      <div className="absolute inset-0" style={{ background: "rgba(36,5,13,0.72)", backdropFilter: "blur(3px)" }} onClick={onClose} />

      <div
        className="vj-modal-enter relative w-full sm:max-w-4xl max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{ background: "var(--cream)", border: "1px solid rgba(227,170,44,0.55)", boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)" }}
      >
        {/* header */}
        <div
          className="flex items-center justify-between gap-4 px-5 md:px-8 pt-5 pb-4 flex-shrink-0"
          style={{ background: "linear-gradient(90deg, var(--plum-950), var(--ruby-500) 50%, var(--plum-950))", color: "var(--gold-100)" }}
        >
          <div>
            <div className="vj-mono text-[10px] tracking-widest" style={{ color: "var(--gold-300)" }}>
              ✦ {t("catalogue.eyebrow")} ✦
            </div>
            <div className="vj-display text-2xl md:text-3xl font-semibold leading-tight">{t("catalogue.modalTitle")}</div>
          </div>
          <button
            onClick={onClose}
            aria-label={t("aria.close")}
            className="vj-focus w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center"
            style={{ background: "rgba(36,5,13,0.5)", border: "1px solid rgba(227,170,44,0.6)", color: "var(--gold-100)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* category tabs */}
        <div className="flex gap-2 overflow-x-auto px-5 md:px-8 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(168,118,28,0.25)" }}>
          {tabs.map((c) => {
            const active = tab === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setTab(c.key)}
                aria-pressed={active}
                className="vj-focus whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors"
                style={
                  active
                    ? { background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }
                    : { background: "transparent", color: "var(--plum-900)", border: "1px solid rgba(142,29,51,0.35)" }
                }
              >
                {c.label ? tx(c.label) : t("catalogue.all")}
              </button>
            );
          })}
        </div>

        {/* catalogues */}
        <div className="overflow-y-auto px-5 md:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-8">
            {shown.map((cat) => {
              const meta = [cat.pages ? t("catalogue.pages", { count: cat.pages }) : "", fmtDate(cat.updated, lang)]
                .filter(Boolean)
                .join(" · ");
              return (
                <a
                  key={cat.pdf}
                  href={viewUrl(cat.pdf)}
                  target="_blank"
                  rel="noopener"
                  className="vj-focus group flex flex-col items-center text-center rounded-xl"
                >
                  <div
                    className="relative w-full max-w-[9.5rem] transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ boxShadow: "4px 0 0 #fffaf1, 7px 1px 0 #e6d4b2, 14px 18px 26px -14px rgba(44,6,16,0.55)", borderRadius: "2px 6px 6px 2px" }}
                  >
                    <Cover cat={cat} tx={tx} />
                    <span className="absolute inset-y-0 left-0 w-3 rounded-l-sm" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0))" }} />
                  </div>
                  <div className="vj-display text-lg font-semibold leading-tight mt-4" style={{ color: "var(--plum-900)" }}>
                    {tx(cat.title)}
                  </div>
                  {meta && (
                    <div className="vj-mono text-[10px] tracking-wider mt-1" style={{ color: "var(--ink-soft)" }}>
                      {meta}
                    </div>
                  )}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mt-2.5 text-xs font-semibold border border-[#4a0b18] text-[#4a0b18] transition-colors group-hover:bg-[#4a0b18] group-hover:text-[#fbecc8]"
                  >
                    <BookOpen size={13} /> {t("catalogue.open")}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogueSection({ onBookVisit }) {
  const { t, tx } = useLang();
  const [open, setOpen] = useState(false);
  const has = CATALOGUES.length > 0;
  const fan = CATALOGUES.slice(0, 3);

  return (
    <section id="catalogue-section" className="px-4 md:px-6 py-14 md:py-20" style={{ scrollMarginTop: 80 }}>
      <div
        className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] items-center gap-12 md:gap-20 rounded-3xl px-6 py-12 md:px-16 md:py-14 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FDF6E8 0%, #F6E6C6 100%)",
          border: "1px solid rgba(168,118,28,0.4)",
          boxShadow: "0 30px 60px -40px rgba(74,11,24,0.55)",
        }}
      >
        {/* fanned stack of covers — opens the popup */}
        <button
          type="button"
          onClick={() => has && setOpen(true)}
          aria-label={t("catalogue.browse")}
          className={`vj-fan vj-focus relative mx-auto w-40 md:w-48 md:ml-14 my-4 ${has ? "" : "pointer-events-none"}`}
          tabIndex={has ? 0 : -1}
        >
          {fan.length ? (
            fan.map((cat, pos) => (
              <div
                key={cat.pdf}
                className={`vj-fan-card ${pos === 0 ? "relative" : "absolute inset-0"}`}
                data-pos={pos}
                style={{ zIndex: 3 - pos }}
              >
                <Cover cat={cat} tx={tx} />
                <span
                  className="absolute inset-y-0 left-0 w-4 rounded-l-sm"
                  style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.1) 60%, rgba(0,0,0,0))" }}
                />
              </div>
            ))
          ) : (
            <div className="vj-fan-card relative" data-pos={0}>
              <Cover cat={{ title: { en: t("meta.title"), te: t("meta.title") } }} tx={tx} />
            </div>
          )}
        </button>

        {/* words + button */}
        <div className="text-center md:text-left">
          <div className="vj-mono text-xs tracking-widest mb-3" style={{ color: "var(--gold-700)" }}>
            ✦ {t("catalogue.eyebrow")} ✦
          </div>
          <h2 className="vj-display text-4xl md:text-5xl leading-tight mb-4 font-semibold">{t("catalogue.title")}</h2>
          <p className="text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-7" style={{ color: "var(--ink)", opacity: 0.85 }}>
            {has ? t("catalogue.body") : t("catalogue.soon")}
          </p>
          {has ? (
            <>
              <button
                onClick={() => setOpen(true)}
                className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
                style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
              >
                <BookOpen size={17} /> {t("catalogue.browse")}
              </button>
              <div className="vj-mono text-[11px] tracking-wider mt-4" style={{ color: "var(--ink-soft)" }}>
                {t("catalogue.count", { count: CATALOGUES.length })}
              </div>
            </>
          ) : (
            <button
              onClick={onBookVisit}
              className="vj-shimmer vj-focus inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}
            >
              {t("nav.book")}
            </button>
          )}
        </div>
      </div>

      {open && <CatalogueModal onClose={() => setOpen(false)} />}
    </section>
  );
}
