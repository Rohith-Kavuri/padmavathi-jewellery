import { ShieldCheck, Repeat, Sparkles, IndianRupee, Gift } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

// The shop's promises (from the brand poster), shown as a gold-edged band
// right under the hero.
const ITEMS = [
  { key: "trust.bis", Icon: ShieldCheck },
  { key: "trust.exchange", Icon: Repeat },
  { key: "trust.cleaning", Icon: Sparkles },
  { key: "trust.buyback", Icon: IndianRupee },
  { key: "trust.packaging", Icon: Gift },
];

export default function TrustStrip() {
  const { t } = useLang();
  return (
    <section
      aria-label={t("trust.aria")}
      className="px-4 md:px-6"
      style={{
        background: "linear-gradient(180deg, var(--cream-card), var(--cream))",
        borderTop: "1px solid rgba(227,170,44,0.55)",
        borderBottom: "1px solid rgba(227,170,44,0.55)",
      }}
    >
      <ul className="max-w-6xl mx-auto flex md:grid md:grid-cols-5 gap-6 md:gap-4 overflow-x-auto vj-scrollx py-5">
        {ITEMS.map(({ key, Icon }) => (
          <li key={key} className="flex items-center gap-3 flex-shrink-0 md:justify-center">
            <span
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 38,
                height: 38,
                border: "1px solid var(--gold-500)",
                background: "radial-gradient(circle at 35% 30%, #fff7e2, #f3e4cc)",
                color: "var(--ruby-500)",
              }}
            >
              <Icon size={18} strokeWidth={1.6} />
            </span>
            <span className="text-xs font-medium leading-tight whitespace-nowrap md:whitespace-normal" style={{ color: "var(--plum-900)" }}>
              {t(key)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
