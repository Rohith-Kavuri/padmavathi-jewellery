import { Phone } from "lucide-react";
import { ANNOUNCEMENTS } from "../data/products";
import { fmtINR } from "../utils/format";
import { STORE, PHONE_URL } from "../data/site";
import { RATE_ROWS, fmtRatesDate } from "../data/rates";
import { useLang } from "../i18n/LanguageContext";

// Top bar: a slow scrolling ticker with today's metal rates (entered in the
// admin page) and the shop announcements, plus the phone number on larger
// screens.
export default function TopUtilityBar() {
  const { lang, t, tx } = useLang();
  const date = fmtRatesDate(lang);

  const items = [...RATE_ROWS.map((r) => `${t(r.key)} ${fmtINR(r.value)}`), ...ANNOUNCEMENTS.map(tx)];

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
        {t("topbar.goldRate")}
        {date && <span className="hidden sm:inline"> · {date}</span>}
      </div>

      <div className="vj-ticker relative flex-1 overflow-hidden whitespace-nowrap py-2">
        <div className="vj-marquee-track vj-marquee-slow inline-flex whitespace-nowrap">
          {run(0)}
          {run(1)}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 flex-shrink-0 px-5" style={{ color: "var(--gold-300)" }}>
        {STORE.phone && (
          <a href={PHONE_URL} className="vj-focus flex items-center gap-1 whitespace-nowrap">
            <Phone size={12} /> {STORE.phone}
          </a>
        )}
      </div>
    </div>
  );
}
