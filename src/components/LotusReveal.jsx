import goddessImg from "../assets/hero-padmavathi.webp";

// A lotus that opens to reveal Sri Padmavathi Ammavaru (first hero slide,
// right half). Drawn to look like a real lotus rather than a flat icon:
// fuller petals with pointed tips, ivory bases fading to blush and deeper
// pink tips, fine veins, soft side shading and a light rim instead of hard
// outlines, in three rows (outer, middle, front).
// Layers: glow + gold arch → outer & middle petals → the goddess → front
// petals. The bloom (slow, slightly uneven, like a real flower) and the
// gentle sway afterwards are in index.css (.vj-petal / .vj-lotus-*).

// A natural lotus petal standing on (0,0): broad, boat-shaped body and a
// pointed, very slightly off-centre tip. w = width, h = height.
const petal = (w, h, k = 0) =>
  `M0,0 C${-0.5 * w},${-0.05 * h} ${-0.62 * w},${-0.48 * h} ${-0.22 * w},${-0.83 * h} ` +
  `Q${-0.07 * w},${-0.96 * h} ${(0.02 + k) * w},${-h} ` +
  `Q${(0.09 + k) * w},${-0.95 * h} ${0.22 * w},${-0.83 * h} ` +
  `C${0.62 * w},${-0.48 * h} ${0.5 * w},${-0.05 * h} 0,0 Z`;

// Fine veins fanning from the base to the tip.
const VEINS = [-0.34, -0.22, -0.11, 0, 0.11, 0.22, 0.34];
const vein = (w, h, f) =>
  `M${f * 0.08 * w},${-0.04 * h} C${f * 0.7 * w},${-0.35 * h} ${f * 0.75 * w},${-0.6 * h} ${f * 0.3 * w},${-0.9 * h}`;

// [open angle, closed angle, delay s, height, width, tip lean]
// Outer row: widest open, deepest pink. Middle row: in between. Front row:
// smaller and paler, covering the base of the image.
const OUTER = [
  [-80, -14, 0.5, 200, 104, 0.03], [-58, -10, 0.42, 222, 108, -0.02], [-35, -6, 0.36, 236, 110, 0.02],
  [-12, -3, 0.3, 244, 110, -0.01], [12, 3, 0.33, 244, 110, 0.01], [35, 6, 0.38, 236, 110, -0.02],
  [58, 10, 0.44, 222, 108, 0.02], [80, 14, 0.52, 200, 104, -0.03],
];
const MIDDLE = [
  [-68, -10, 0.25, 176, 100, -0.02], [-45, -7, 0.2, 196, 104, 0.02], [-22, -3, 0.15, 206, 104, -0.01],
  [22, 3, 0.17, 206, 104, 0.01], [45, 7, 0.22, 196, 104, -0.02], [68, 10, 0.27, 176, 100, 0.02],
];
const FRONT = [
  [-76, -16, 0.12, 122, 96, 0.03], [76, 16, 0.14, 122, 96, -0.03],
  [-52, -10, 0.06, 136, 100, -0.02], [52, 10, 0.08, 136, 100, 0.02],
  [-26, -5, 0, 114, 94, 0.01], [26, 5, 0.02, 114, 94, -0.01], [0, 0, 0.04, 92, 88, 0],
];

// colours from base (offset 1) to tip (offset 0) for each row
const ROWS = {
  outer: [["0", "#b91d58"], ["0.16", "#dd4f80"], ["0.42", "#f2a1ba"], ["0.72", "#fbdde5"], ["1", "#f3dfb6"]],
  middle: [["0", "#cf3f73"], ["0.18", "#ec86a6"], ["0.48", "#f9cbd8"], ["0.8", "#fdeff0"], ["1", "#f2dcae"]],
  front: [["0", "#e0698f"], ["0.14", "#f3adc2"], ["0.42", "#fde4ea"], ["0.78", "#fff7f2"], ["1", "#ecd39c"]],
};

function Defs({ id }) {
  return (
    <defs>
      {Object.entries(ROWS).map(([row, stops]) => (
        <linearGradient key={row} id={`${id}-${row}`} x1="0" y1="0" x2="0" y2="1">
          {stops.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
      ))}
      {/* cupped shading: the side turned away from the light is a little deeper */}
      <linearGradient id={`${id}-cupL`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7a1238" stopOpacity="0.32" />
        <stop offset="0.42" stopColor="#7a1238" stopOpacity="0" />
        <stop offset="0.72" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#7a1238" stopOpacity="0.1" />
      </linearGradient>
      <linearGradient id={`${id}-cupR`} x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stopColor="#7a1238" stopOpacity="0.32" />
        <stop offset="0.42" stopColor="#7a1238" stopOpacity="0" />
        <stop offset="0.72" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#7a1238" stopOpacity="0.1" />
      </linearGradient>
      {/* soft sheen down the middle of each petal */}
      <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.35" />
        <stop offset="0.7" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      {/* warm light falling from the goddess onto the base */}
      <linearGradient id={`${id}-base`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="#ffd98a" stopOpacity="0.35" />
        <stop offset="0.35" stopColor="#ffd98a" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Row({ list, row, id, sway = 1 }) {
  return list.map(([open, closed, delay, h, w, k], i) => {
    const right = open > 0 || (open === 0 && i % 2);
    const d = petal(w, h, k);
    return (
      <g
        key={`${row}${i}`}
        className="vj-petal"
        style={{
          "--open": `${open}deg`,
          "--closed": `${closed}deg`,
          "--pd": `${delay}s`,
          "--sw": `${(right ? 1 : -1) * (0.9 + (i % 3) * 0.35) * sway}deg`,
          "--swd": `${5.5 + (i % 4) * 0.8}s`,
        }}
      >
        <path d={d} fill={`url(#${id}-${row})`} />
        <path d={d} fill={`url(#${id}-${right ? "cupR" : "cupL"})`} />
        <path d={petal(w * 0.42, h * 0.94, k)} fill={`url(#${id}-sheen)`} />
        {VEINS.map((f) => (
          <path key={f} d={vein(w, h, f)} fill="none" stroke="#a3204f" strokeOpacity="0.13" strokeWidth="0.7" />
        ))}
        <path d={d} fill={`url(#${id}-base)`} />
        {/* light rim and a whisper of an edge, instead of a hard outline */}
        <path d={petal(w * 0.96, h * 0.99, k)} fill="none" stroke="#fff6f2" strokeOpacity="0.55" strokeWidth="0.9" />
        <path d={d} fill="none" stroke="#7a1238" strokeOpacity="0.18" strokeWidth="0.6" />
      </g>
    );
  });
}

export default function LotusReveal({ alt }) {
  return (
    <div className="vj-lotus relative" style={{ width: "min(100%, calc(var(--hero-h) * 0.57))", aspectRatio: "0.82" }}>
      {/* soft glow, and a gold temple arch drawn behind her like a shrine niche */}
      <span className="vj-lotus-glow absolute left-1/2 rounded-full pointer-events-none" aria-hidden="true" />
      <svg viewBox="0 0 100 122" className="vj-lotus-arch absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }} aria-hidden="true">
        <defs>
          <linearGradient id="vjArchGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.35" stopColor="#e3aa2c" />
            <stop offset="0.6" stopColor="#8a5a0e" />
            <stop offset="0.85" stopColor="#f6d77c" />
            <stop offset="1" stopColor="#b8862b" />
          </linearGradient>
          <radialGradient id="vjArchNiche" cx="50%" cy="42%" r="60%">
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.22" />
            <stop offset="0.6" stopColor="#8e1d33" stopOpacity="0.18" />
            <stop offset="1" stopColor="#24050d" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className="vj-arch-fill" d="M8 98 V43 C8 19 28 6 50 0.5 C72 6 92 19 92 43 V98 Z" fill="url(#vjArchNiche)" />
        <path className="vj-arch-line" pathLength="1" d="M3.5 98 V44 C3.5 18 25.5 4.5 50 -1 C74.5 4.5 96.5 18 96.5 44 V98" fill="none" stroke="url(#vjArchGold)" strokeWidth="0.9" />
        <path className="vj-arch-line" pathLength="1" d="M8 98 V43 C8 19 28 6 50 0.5 C72 6 92 19 92 43 V98" fill="none" stroke="url(#vjArchGold)" strokeWidth="0.4" style={{ animationDelay: "1.05s" }} />
        <g className="vj-arch-crown">
          <path d="M50 -8 C52.2 -5.5 52.2 -3.3 50 -1.7 C47.8 -3.3 47.8 -5.5 50 -8 Z" fill="url(#vjArchGold)" />
          <circle cx="50" cy="-9.5" r="0.9" fill="#fff3c4" />
          <circle cx="43" cy="1" r="0.8" fill="#f2c45a" />
          <circle cx="57" cy="1" r="0.8" fill="#f2c45a" />
        </g>
      </svg>

      {/* outer and middle petals, behind her */}
      <svg viewBox="-230 -250 460 270" className="vj-lotus-back absolute left-1/2 pointer-events-none" aria-hidden="true">
        <Defs id="vjLb" />
        <g className="vj-row-outer">
          <Row list={OUTER} row="outer" id="vjLb" />
        </g>
        <g className="vj-row-middle">
          <Row list={MIDDLE} row="middle" id="vjLb" sway={0.8} />
        </g>
      </svg>

      {/* Sri Padmavathi */}
      <img src={goddessImg} alt={alt} className="vj-lotus-goddess absolute left-1/2 top-0" />

      {/* front petals */}
      <svg viewBox="-230 -250 460 270" className="vj-lotus-front absolute left-1/2 pointer-events-none" aria-hidden="true">
        <Defs id="vjLf" />
        <Row list={FRONT} row="front" id="vjLf" sway={0.6} />
      </svg>
    </div>
  );
}
