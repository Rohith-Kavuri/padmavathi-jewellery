import { CITIES } from "../data/products";
import { fmtINR } from "../utils/format";
import { useLang } from "../i18n/LanguageContext";

export default function GoldRateSection({ city, setCity, displayRate22, displayRate24, rates, rateDrift, lastUpdated }) {
  const { lang, t, tx } = useLang();
  const cityLabel = tx(CITIES.find((c) => c.name === city)?.label ?? city);

  const rows = [
    { label: t("rates.k22"), value: displayRate22, drift: rateDrift.k22, accent: "var(--gold-300)" },
    { label: t("rates.k24"), value: displayRate24, drift: rateDrift.k24, accent: "var(--gold-300)" },
    { label: t("rates.platinum"), value: rates.platinum, drift: 0, accent: "var(--sapphire-500)" },
    { label: t("rates.silver"), value: rates.silver, drift: 0, accent: "#C9C2D6" },
  ];

  const time = lastUpdated.toLocaleTimeString(lang === "te" ? "te-IN" : "en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <section id="rates-section" className="px-4 md:px-6 py-12" style={{ background: "var(--plum-900)", scrollMarginTop: 80 }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="vj-mono text-xs tracking-widest mb-2" style={{ color: "var(--gold-300)" }}>
            {t("rates.eyebrow")}
          </div>
          <h2 className="vj-display text-3xl mb-3" style={{ color: "var(--gold-100)" }}>
            {t("rates.title")}
          </h2>
          <p className="text-sm max-w-sm" style={{ color: "rgba(255,251,242,0.75)" }}>
            {t("rates.body", { city: cityLabel })}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label={t("rates.cityAria")}
              className="vj-focus text-sm rounded-full px-3 py-1.5"
              style={{ background: "var(--plum-800)", color: "var(--gold-100)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {tx(c.label)}
                </option>
              ))}
            </select>
            <span className="vj-mono text-[10px]" style={{ color: "var(--gold-300)" }}>
              {t("rates.updated", { time })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {rows.map((r) => (
            <div
              key={r.label}
              className="vj-arch p-4"
              style={{ background: "var(--plum-800)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: `3px solid ${r.accent}` }}
            >
              <div className="text-xs" style={{ color: "rgba(255,251,242,0.7)" }}>
                {r.label}
              </div>
              <div className="vj-mono text-xl mt-1 flex items-center gap-2" style={{ color: r.accent }}>
                {fmtINR(r.value)}
                {r.drift !== 0 && (
                  <span style={{ color: r.drift > 0 ? "#7FBF9B" : "#FF9D9D", fontSize: 11 }}>
                    {r.drift > 0 ? "▲" : "▼"} {Math.abs(r.drift)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
