import { useCountUp } from "../hooks/useCountUp";

export default function StatCard({ stat, inView, gem }) {
  const value = useCountUp(stat.value, inView);
  return (
    <div className="vj-arch p-5 text-center" style={{ background: gem.tint, border: `1px solid ${gem[500]}33` }}>
      <div className="vj-display text-3xl font-semibold" style={{ color: gem[700] }}>
        {value}
        {stat.suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: "var(--ink-soft)" }}>
        {stat.label}
      </div>
    </div>
  );
}
