import { CITIES } from "../data/products";
import { fmtINR } from "../utils/format";

export default function GoldRateSection({ city, setCity, displayRate22, displayRate24, rates, rateDrift, lastUpdated }) {
  const rows = [
    { label: "22K Gold / g", value: displayRate22, drift: rateDrift.k22, accent: "var(--gold-300)" },
    { label: "24K Gold / g", value: displayRate24, drift: rateDrift.k24, accent: "var(--gold-300)" },
    { label: "Platinum / g", value: rates.platinum, drift: 0, accent: "var(--sapphire-500)" },
    { label: "Silver / g", value: rates.silver, drift: 0, accent: "#C9C2D6" },
  ];

  return (
    <section id="rates-section" className="px-4 md:px-6 py-12" style={{ background: "var(--plum-900)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="vj-mono text-xs tracking-widest mb-2" style={{ color: "var(--gold-300)" }}>
            TODAY'S RATE
          </div>
          <h2 className="vj-display text-3xl mb-3" style={{ color: "var(--gold-100)" }}>
            Gold &amp; metal rates
          </h2>
          <p className="text-sm max-w-sm" style={{ color: "rgba(255,251,242,0.75)" }}>
            Indicative rates for {city}, updated through the day. Showroom prices include making charges and GST, shown
            separately at billing.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="vj-focus text-sm rounded-full px-3 py-1.5"
              style={{ background: "var(--plum-800)", color: "var(--gold-100)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {CITIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <span className="vj-mono text-[10px]" style={{ color: "var(--gold-300)" }}>
              Updated {lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
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
