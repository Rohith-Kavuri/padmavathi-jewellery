import { Phone } from "lucide-react";
import { CITIES, ANNOUNCEMENTS } from "../data/products";
import { fmtINR } from "../utils/format";
import { useLang } from "../i18n/LanguageContext";

// Top bar: a slow scrolling ticker with today's metal rates and the shop
// announcements, plus (from tablet size up) a city picker and phone number.
// Replaces the old rotating announcement bar.
export default function TopUtilityBar({ city, setCity, displayRate22, displayRate24, rates }) {
  const { t, tx } = useLang();
  const cityLabel = tx(CITIES.find((c) => c.name === city)?.label ?? city);

  const items = [
    `${t("rates.k22")} ${fmtINR(displayRate22)}`,
    `${t("rates.k24")} ${fmtINR(displayRate24)}`,
    `${t("rates.platinum")} ${fmtINR(rates.platinum)}`,
    `${t("rates.silver")} ${fmtINR(rates.silver)}`,
    ...ANNOUNCEMENTS.map(tx),
  ];

  // rendered twice so the -50% scroll loops seamlessly
  const run = (copy) => (
    <span className="inline-flex items-center" aria-hidden={copy === 1}>
      {items.map((txt, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="px-5">{txt}</span>
          <span style={{ color: "var(--gold-500)" }}>✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="flex items-center text-xs"
      style={{
        background: "linear-gradient(90deg, var(--plum-950), var(--ruby-500) 50%, var(--plum-950))",
        color: "var(--gold-100)",
        borderBottom: "1px solid rgba(227,170,44,0.45)",
      }}
    >
      <div
        className="vj-mono flex-shrink-0 px-3 md:px-5 py-2 tracking-widest"
        style={{ background: "var(--plum-950)", color: "var(--gold-300)", fontSize: 10 }}
      >
        {t("topbar.goldRate")} · {cityLabel}
      </div>

      <div className="vj-ticker relative flex-1 overflow-hidden whitespace-nowrap py-2">
        <div className="vj-marquee-track vj-marquee-slow inline-flex whitespace-nowrap">
          {run(0)}
          {run(1)}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-shrink-0 px-5" style={{ color: "var(--gold-300)" }}>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label={t("rates.cityAria")}
          className="vj-focus bg-transparent border-none text-xs cursor-pointer"
          style={{ color: "var(--gold-300)" }}
        >
          {CITIES.map((c) => (
            <option key={c.name} value={c.name} style={{ color: "var(--ink)" }}>
              {tx(c.label)}
            </option>
          ))}
        </select>
        <span className="flex items-center gap-1 whitespace-nowrap">
          <Phone size={12} /> 1800 425 7333
        </span>
      </div>
    </div>
  );
}
