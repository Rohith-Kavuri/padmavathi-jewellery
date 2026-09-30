import { useCountUp } from "../hooks/useCountUp";
import { useLang } from "../i18n/LanguageContext";

export default function StatCard({ stat, inView, gem }) {
  const { tx } = useLang();
  const value = useCountUp(stat.value, inView);
  return (
    <div className="vj-arch p-5 text-center" style={{ background: gem.tint, border: `1px solid ${gem[500]}33` }}>
      <div className="vj-display text-3xl font-semibold" style={{ color: gem[700] }}>
        {value}
        {stat.suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
        {tx(stat.label)}
      </div>
    </div>
  );
}
