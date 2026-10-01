import { fmtINR } from "../utils/format";
import { RATE_ROWS, fmtRatesDate } from "../data/rates";
import { useLang } from "../i18n/LanguageContext";

// Today's rates as entered in the admin page (Homepage → Today's gold &
// metal rates). Rates left empty there are not shown.
export default function GoldRateSection() {
  const { lang, t } = useLang();
  const date = fmtRatesDate(lang);

  return (
    <section id="rates-section" className="px-4 md:px-6 py-12" style={{ background: "var(--plum-900)", scrollMarginTop: 110 }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="vj-mono text-xs tracking-widest mb-2" style={{ color: "var(--gold-300)" }}>
            {t("rates.eyebrow")}
          </div>
          <h2 className="vj-display text-3xl mb-3" style={{ color: "var(--gold-100)" }}>
            {t("rates.title")}
          </h2>
          <p className="text-sm max-w-sm" style={{ color: "rgba(255,251,242,0.75)" }}>
            {t("rates.body")}
          </p>
          {date && (
            <div
              className="vj-mono inline-block text-[11px] mt-4 rounded-full px-3 py-1"
              style={{ color: "var(--gold-300)", border: "1px solid rgba(227,170,44,0.45)" }}
            >
              {t("rates.updated", { date })}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {RATE_ROWS.map((r) => (
            <div
              key={r.key}
              className="rounded-2xl px-4 py-3.5 text-center"
              style={{
                background: "linear-gradient(160deg, rgba(142,29,51,0.55), rgba(36,5,13,0.55))",
                border: "1px solid rgba(227,170,44,0.35)",
                borderTop: `3px solid ${r.accent}`,
              }}
            >
              <div className="text-xs" style={{ color: "rgba(255,251,242,0.7)" }}>
                {t(r.key)}
              </div>
              <div className="vj-mono text-xl mt-1" style={{ color: r.accent }}>
                {fmtINR(r.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
