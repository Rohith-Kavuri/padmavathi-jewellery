// Gold lotus divider, echoing the lotus crown of the Padmavathi logo.
export default function Ornament({ className = "", color = "#a8761c" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true" style={{ color }}>
      <span className="h-px w-20 md:w-44" style={{ background: "linear-gradient(90deg, transparent, currentColor)" }} />
      <svg width="84" height="40" viewBox="0 0 54 26" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
        {/* centre petal */}
        <path d="M27 2c4 5 4 12 0 17-4-5-4-12 0-17z" fill="currentColor" fillOpacity="0.18" />
        {/* inner petals */}
        <path d="M27 19c-2-6-6-9-11-9 1 5 5 9 11 9z" />
        <path d="M27 19c2-6 6-9 11-9-1 5-5 9-11 9z" />
        {/* outer petals */}
        <path d="M24 20c-5-2-10-2-14 1 4 2 9 2 14-1z" />
        <path d="M30 20c5-2 10-2 14 1-4 2-9 2-14-1z" />
        {/* base */}
        <path d="M18 22.5h18" />
        <circle cx="4" cy="21" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="50" cy="21" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      <span className="h-px w-20 md:w-44" style={{ background: "linear-gradient(90deg, currentColor, transparent)" }} />
    </div>
  );
}
