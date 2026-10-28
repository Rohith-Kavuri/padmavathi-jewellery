// A section heading dressed like the brand: a small gold eyebrow between
// stars, the title in the display serif with one word in gold italic, and a
// gold lotus rule underneath.
//
// The gold word is marked with *stars* in strings.js, e.g.
// "Shop by *category*" (Telugu marks its own word), so each language can
// pick the word that reads best.
//   <SectionTitle eyebrow={t("x.eyebrow")} title={t("x.title")} />
//   align="left" for two-column sections; tone="dark" on maroon.

function Title({ text }) {
  return String(text)
    .split(/(\*[^*]+\*)/)
    .map((part, i) =>
      part.startsWith("*") && part.endsWith("*") ? (
        <em key={i} className="vj-gold-word">
          {part.slice(1, -1)}
        </em>
      ) : (
        part
      )
    );
}

function Rule({ align, color }) {
  const lotus = (
    <svg width="46" height="22" viewBox="0 0 54 26" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M27 2c4 5 4 12 0 17-4-5-4-12 0-17z" fill="currentColor" fillOpacity="0.2" />
      <path d="M27 19c-2-6-6-9-11-9 1 5 5 9 11 9z" />
      <path d="M27 19c2-6 6-9 11-9-1 5-5 9-11 9z" />
      <path d="M24 20c-5-2-10-2-14 1 4 2 9 2 14-1z" />
      <path d="M30 20c5-2 10-2 14 1-4 2-9 2-14-1z" />
      <path d="M18 22.5h18" />
    </svg>
  );
  const line = (dir) => (
    <span className="h-px w-14 md:w-24" style={{ background: `linear-gradient(${dir}, transparent, currentColor)` }} />
  );
  return (
    <div className={`flex items-center gap-2 mt-3 ${align === "left" ? "justify-start" : "justify-center"}`} style={{ color }} aria-hidden="true">
      {align !== "left" && line("90deg")}
      {lotus}
      {line("270deg")}
    </div>
  );
}

export default function SectionTitle({ eyebrow, title, align = "center", tone = "light", className = "", children }) {
  const dark = tone === "dark";
  return (
    <div className={`${align === "left" ? "text-left" : "text-center"} ${className}`}>
      {eyebrow && (
        <div className="vj-mono text-[11px] tracking-[0.28em] mb-2.5" style={{ color: dark ? "var(--gold-300)" : "var(--gold-700)" }}>
          ✦ {eyebrow} ✦
        </div>
      )}
      <h2
        className={`vj-display vj-section-title font-semibold leading-[1.08] ${dark ? "vj-section-title-dark" : ""}`}
        style={{ color: dark ? "var(--gold-100)" : "var(--plum-900)" }}
      >
        <Title text={title} />
        {children}
      </h2>
      <Rule align={align} color={dark ? "var(--gold-300)" : "#b8862b"} />
    </div>
  );
}
