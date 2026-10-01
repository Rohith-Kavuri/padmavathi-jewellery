// Today's gold & metal rates (per gram), edited in the admin page
// (Homepage → Today's gold & metal rates), saved in src/content/rates.json.
import file from "../content/rates.json";

const num = (v) => (v === "" || v == null || Number.isNaN(Number(v)) ? 0 : Number(v));

export const RATES = {
  k24: num(file.gold_24k),
  k22: num(file.gold_22k),
  k18: num(file.gold_18k),
  silver: num(file.silver),
  platinum: num(file.platinum),
};

// "2026-10-01" → a local date (avoids the day shifting in other time zones)
function parseDay(v) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(v || ""));
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}
export const RATES_DATE = parseDay(file.updated);

export function fmtRatesDate(lang) {
  if (!RATES_DATE) return "";
  return RATES_DATE.toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// The rows shown on the site; a rate left empty (0) in the admin is hidden.
export const RATE_ROWS = [
  { key: "rates.k24", value: RATES.k24, accent: "var(--gold-300)" },
  { key: "rates.k22", value: RATES.k22, accent: "var(--gold-300)" },
  { key: "rates.k18", value: RATES.k18, accent: "var(--gold-300)" },
  { key: "rates.silver", value: RATES.silver, accent: "#d9d4e3" },
  { key: "rates.platinum", value: RATES.platinum, accent: "var(--sapphire-500)" },
].filter((r) => r.value > 0);
