import goddessImg from "../assets/hero-padmavathi.webp";
import petalTex from "../assets/petal-gold.webp";

// A golden lotus that opens to reveal Sri Padmavathi Ammavaru (first hero
// slide, right half). Built from layers so it stays sharp at any size:
//   rays + glow  →  back petals (fan out behind her)  →  the goddess  →
//   front petals (open outwards in front).
// The bud → bloom animation is in index.css (.vj-lotus-*); it plays each
// time the slide comes into view and rests fully open.

// Petal pointing straight up from (0,0): w = width, h = height.
const petal = (w, h) =>
  `M0,0 C${-w * 0.56},${-h * 0.16} ${-w * 0.62},${-h * 0.6} 0,${-h} C${w * 0.62},${-h * 0.6} ${w * 0.56},${-h * 0.16} 0,0 Z`;

// [open angle, closed angle, delay s, height, width]
const BACK = [
  [-84, -6, 0.55, 205, 84],
  [-63, -5, 0.5, 220, 88],
  [-42, -3, 0.45, 232, 90],
  [-21, -2, 0.4, 240, 92],
  [0, 0, 0.35, 244, 92],
  [21, 2, 0.4, 240, 92],
  [42, 3, 0.45, 232, 90],
  [63, 5, 0.5, 220, 88],
  [84, 6, 0.55, 205, 84],
];
const FRONT = [
  [-76, -12, 0.15, 150, 100],
  [76, 12, 0.15, 150, 100],
  [-52, -8, 0.05, 160, 106],
  [52, 8, 0.05, 160, 106],
  [-27, -4, 0, 118, 94],
  [27, 4, 0, 118, 94],
  [0, 0, 0.1, 84, 88],
];
// Each petal is the real engraved gold petal from the shop's artwork
// (petal-gold.webp), clipped to a lotus-petal outline. Petals on the right
// are mirrored so the light falls symmetrically; the back row is tinted pink
// at the tips like the lotus in the artwork. A soft cupped shadow and a
// bright rim finish each one.
function Petals({ list, pink = false, id, className }) {
  return (
    <svg viewBox="-230 -250 460 270" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}Pink`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD6E5" />
          <stop offset="0.16" stopColor="#FF5C93" />
          <stop offset="0.42" stopColor="#D81B60" />
          <stop offset="0.66" stopColor="#E9A93A" />
          <stop offset="1" stopColor="#8A5A0E" />
        </linearGradient>
        <linearGradient id={`${id}CupL`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2A1503" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#2A1503" stopOpacity="0" />
          <stop offset="1" stopColor="#2A1503" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}CupR`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#2A1503" stopOpacity="0.5" />
          <stop offset="0.35" stopColor="#2A1503" stopOpacity="0" />
          <stop offset="1" stopColor="#2A1503" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}Base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.7" stopColor="#2A1503" stopOpacity="0" />
          <stop offset="1" stopColor="#2A1503" stopOpacity="0.55" />
        </linearGradient>
        {list.map(([, , , h, w], i) => (
          <clipPath key={i} id={`${id}C${i}`}>
            <path d={petal(w, h)} />
          </clipPath>
        ))}
      </defs>
      {list.map(([open, closed, delay, h, w], i) => {
        const right = open > 0 || (open === 0 && i % 2 === 1);
        return (
          <g
            key={i}
            className="vj-petal"
            style={{ "--open": `${open}deg`, "--closed": `${closed}deg`, "--pd": `${delay}s` }}
          >
            <g clipPath={`url(#${id}C${i})`}>
              {/* pink back petals: glossy pink-to-gold colour with the engraving laid over it */}
              {pink && <path d={petal(w, h)} fill={`url(#${id}Pink)`} />}
              <image
                href={petalTex}
                x={-w / 2}
                y={-h * 1.017}
                width={w}
                height={h * 1.069}
                preserveAspectRatio="none"
                transform={right ? "scale(-1 1)" : undefined}
                style={pink ? { mixBlendMode: "soft-light" } : undefined}
              />
              <path d={petal(w, h)} fill={`url(#${id}${right ? "CupR" : "CupL"})`} />
              <path d={petal(w, h)} fill={`url(#${id}Base)`} />
            </g>
            {/* rim: thin dark outline with a bright inner edge */}
            <path d={petal(w, h)} fill="none" stroke="#3E2205" strokeWidth="1.6" strokeOpacity="0.55" />
            <path d={petal(w * 0.95, h * 0.988)} fill="none" stroke="#FFF1C4" strokeWidth="1.1" strokeOpacity="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

export default function LotusReveal({ alt }) {
  return (
    <div className="vj-lotus relative" style={{ width: "min(100%, calc(var(--hero-h) * 0.62))", aspectRatio: "0.82" }}>
      {/* light rays and glow behind */}
      <span className="vj-lotus-rays absolute left-1/2 rounded-full pointer-events-none" aria-hidden="true" />
      <span className="vj-lotus-glow absolute left-1/2 rounded-full pointer-events-none" aria-hidden="true" />

      {/* petals that fan out behind her */}
      <Petals list={BACK} pink id="vjLb" className="vj-lotus-back absolute left-1/2 pointer-events-none" />

      {/* Sri Padmavathi */}
      <img src={goddessImg} alt={alt} className="vj-lotus-goddess absolute left-1/2 top-0" />

      {/* petals in front */}
      <Petals list={FRONT} id="vjLf" className="vj-lotus-front absolute left-1/2 pointer-events-none" />
    </div>
  );
}
