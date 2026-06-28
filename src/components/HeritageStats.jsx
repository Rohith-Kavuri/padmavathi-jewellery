import { useInView } from "../hooks/useInView";
import { STATS, GEMS } from "../data/products";
import StatCard from "./StatCard";

const STAT_GEM_ORDER = [GEMS.ruby, GEMS.emerald, GEMS.sapphire, GEMS.amethyst];

export default function HeritageStats() {
  const [ref, inView] = useInView();

  return (
    <section id="heritage-section" ref={ref} className="px-4 md:px-6 py-14" style={{ background: "var(--cream)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="vj-mono text-xs tracking-widest mb-2" style={{ color: "var(--gold-700)" }}>
              SINCE 1971
            </div>
            <h2 className="vj-display text-3xl mb-4" style={{ color: "var(--plum-900)" }}>
              Built guild by guild, not factory by factory
            </h2>
            <p className="text-sm max-w-md" style={{ color: "var(--ink)", opacity: 0.85 }}>
              Padmavathi began as a single workshop in Thanjavur. We still commission from the same nine artisan guilds today
              — each known for one craft: temple work, polki setting, filigree, enamel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} inView={inView} gem={STAT_GEM_ORDER[i % STAT_GEM_ORDER.length]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
