import { Languages } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

// Two-segment pill: EN | తె. The whole pill is one switch — clicking anywhere
// flips the language, and the highlighted side shows the one in use.
export default function LanguageToggle({ compact = false }) {
  const { lang, toggleLang, t } = useLang();
  const isTe = lang === "te";

  const seg = (active) => ({
    background: active ? "var(--plum-900)" : "transparent",
    color: active ? "var(--gold-100)" : "var(--ink)",
    transition: "background .25s ease, color .25s ease",
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isTe}
      aria-label={t("lang.switchTo")}
      title={t("lang.switchTo")}
      onClick={toggleLang}
      className={`vj-focus flex items-center gap-1.5 rounded-full border p-0.5 ${compact ? "" : "pl-2"}`}
      style={{ borderColor: "var(--gold-500)", background: "var(--gold-100)" }}
    >
      {!compact && <Languages size={15} style={{ color: "var(--gold-700)" }} aria-hidden="true" />}
      <span className="flex items-center rounded-full text-[11px] font-semibold leading-none">
        <span className="rounded-full px-2 py-1" style={seg(!isTe)} lang="en">
          EN
        </span>
        <span className="rounded-full px-2 py-1" style={{ ...seg(isTe), fontFamily: '"Noto Sans Telugu", sans-serif' }} lang="te">
          తె
        </span>
      </span>
    </button>
  );
}
