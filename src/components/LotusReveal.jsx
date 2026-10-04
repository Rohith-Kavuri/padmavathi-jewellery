import goddessImg from "../assets/hero-padmavathi.webp";

// A golden lotus that opens to reveal Sri Padmavathi Ammavaru (first hero
// slide, right half). Built from layers so it stays sharp at any size:
//   rays + glow  →  back petals (fan out behind her)  →  the goddess  →
//   front petals (open outwards in front).
// The bud → bloom animation is in index.css (.vj-lotus-*); it plays each
// time the slide comes into view and rests fully open.

// Petal pointing straight up from (0,0): w = width, h = height.
const petal = (w, h) =>
  `M0,0 C${-w * 0.56},${-h * 0.16} ${-w * 0.62},${-h * 0.6} 0,${-h} C${w * 0.62},${-h * 0.6} ${w * 0.56},${-h * 0.16} 0,0 Z`;
const vein = (h) => `M0,-4 C-2,${-h * 0.35} -2,${-h * 0.65} 0,${-h * 0.9}`;

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
function Petals({ list, fill, className }) {
  return (
    <svg viewBox="-230 -250 460 270" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vjPetalGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6D6" />
          <stop offset="0.3" stopColor="#F6CC63" />
          <stop offset="0.68" stopColor="#D59A32" />
          <stop offset="1" stopColor="#7A4A0C" />
        </linearGradient>
        <linearGradient id="vjPetalPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD3E2" />
          <stop offset="0.18" stopColor="#F0508A" />
          <stop offset="0.45" stopColor="#C2185B" />
          <stop offset="0.72" stopColor="#E3AA2C" />
          <stop offset="1" stopColor="#7A4A0C" />
        </linearGradient>
        <linearGradient id="vjPetalCupL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3A1F04" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#3A1F04" stopOpacity="0" />
          <stop offset="0.8" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="1" stopColor="#3A1F04" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="vjPetalCupR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor="#3A1F04" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#3A1F04" stopOpacity="0" />
          <stop offset="0.8" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="1" stopColor="#3A1F04" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="vjPetalSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {list.map(([open, closed, delay, h, w], i) => (
        <g
          key={i}
          className="vj-petal"
          style={{ "--open": `${open}deg`, "--closed": `${closed}deg`, "--pd": `${delay}s` }}
        >
          <path d={petal(w, h)} fill={`url(#${fill})`} />
          {/* cupped shading: darker on the side turned away from the light */}
          <path d={petal(w, h)} fill={open >= 0 ? "url(#vjPetalCupR)" : "url(#vjPetalCupL)"} />
          <path d={petal(w * 0.5, h * 0.95)} fill="url(#vjPetalSheen)" opacity="0.65" />
          {/* fine veins */}
          {[-0.28, -0.14, 0.14, 0.28].map((k) => (
            <path
              key={k}
              d={`M0,-6 C${w * k * 0.8},${-h * 0.35} ${w * k},${-h * 0.62} ${w * k * 0.35},${-h * 0.88}`}
              fill="none"
              stroke="#7A4A0C"
              strokeOpacity="0.22"
              strokeWidth="0.9"
            />
          ))}
          <path d={vein(h)} fill="none" stroke="#FFF3C4" strokeOpacity="0.6" strokeWidth="1.5" />
          {/* rim: bright edge with a thin dark outline */}
          <path d={petal(w, h)} fill="none" stroke="#5C3608" strokeWidth="1.6" strokeOpacity="0.45" />
          <path d={petal(w * 0.94, h * 0.985)} fill="none" stroke="#FFF1C4" strokeWidth="1" strokeOpacity="0.55" />
        </g>
      ))}
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
      <Petals list={BACK} fill="vjPetalPink" className="vj-lotus-back absolute left-1/2 pointer-events-none" />

      {/* Sri Padmavathi */}
      <img src={goddessImg} alt={alt} className="vj-lotus-goddess absolute left-1/2 top-0" />

      {/* petals in front */}
      <Petals list={FRONT} fill="vjPetalGold" className="vj-lotus-front absolute left-1/2 pointer-events-none" />
    </div>
  );
}
