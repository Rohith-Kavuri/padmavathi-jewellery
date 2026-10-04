import { SOCIALS } from "../data/site";
import { useLang } from "../i18n/LanguageContext";
import WhatsAppIcon from "./WhatsAppIcon";

// Rich social buttons: a glossy brand-coloured disc inside a thin gold ring.
// Links come from the admin page (Homepage → Shop details); each icon only
// shows when its link is filled in.

const InstagramGlyph = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeGlyph = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="1.8" y="5" width="20.4" height="14" rx="4.2" fill="currentColor" />
    <path d="M10 8.9v6.2l5.4-3.1z" fill="#E62117" />
  </svg>
);

const FacebookGlyph = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z" />
  </svg>
);

const BRANDS = {
  whatsapp: {
    Glyph: ({ size }) => <WhatsAppIcon size={size} />,
    bg: "linear-gradient(145deg, #5BE584 0%, #25D366 45%, #128C7E 100%)",
    glow: "rgba(37,211,102,0.55)",
  },
  instagram: {
    Glyph: InstagramGlyph,
    bg: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 6%, #fd5949 45%, #d6249f 62%, #285AEB 92%)",
    glow: "rgba(214,36,159,0.5)",
  },
  youtube: {
    Glyph: YouTubeGlyph,
    bg: "linear-gradient(145deg, #FF5A4F 0%, #E62117 55%, #A50E0E 100%)",
    glow: "rgba(230,33,23,0.5)",
  },
  facebook: {
    Glyph: FacebookGlyph,
    bg: "linear-gradient(145deg, #5B9BFF 0%, #1877F2 55%, #0B57C2 100%)",
    glow: "rgba(24,119,242,0.5)",
  },
};

// One round badge. `size` is the full diameter in px.
export function SocialBadge({ social, size = 44, className = "", showLabel = false }) {
  const { t } = useLang();
  const b = BRANDS[social.key];
  const label = t(`social.${social.key}`);
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`vj-social vj-focus group relative inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className="relative inline-flex rounded-full p-[2px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          background: "conic-gradient(from 210deg, #8a5a0e, #f2c45a, #fff3c4, #e3aa2c, #8a5a0e)",
          boxShadow: `0 10px 22px -10px ${b.glow}, 0 4px 10px -6px rgba(36,5,13,0.6)`,
        }}
      >
        <span className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden" style={{ background: b.bg, color: "#fff" }}>
          {/* glossy highlight */}
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at 32% 22%, rgba(255,255,255,0.45), rgba(255,255,255,0) 52%)" }}
          />
          <span className="relative">
            <b.Glyph size={Math.round(size * 0.5)} />
          </span>
        </span>
      </span>
      {showLabel && <span className="text-sm">{label}</span>}
    </a>
  );
}

// Row of badges (footer, Visit Us, phone menu).
export function SocialRow({ size = 44, exclude = [], className = "" }) {
  const items = SOCIALS.filter((s) => !exclude.includes(s.key));
  if (!items.length) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((s) => (
        <SocialBadge key={s.key} social={s} size={size} />
      ))}
    </div>
  );
}

// Floating stack in the bottom-right corner on laptops and tablets:
// WhatsApp (largest, with a soft pulse) at the bottom, the others above it.
// A label slides out to the left on hover. Phones use the bottom bar instead.
export function SocialDock() {
  const { t } = useLang();
  if (!SOCIALS.length) return null;
  const order = [...SOCIALS.filter((s) => s.key !== "whatsapp"), ...SOCIALS.filter((s) => s.key === "whatsapp")];

  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
      {order.map((s) => {
        const big = s.key === "whatsapp";
        return (
          <div key={s.key} className="group relative flex items-center">
            <span
              className="vj-dock-label pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold"
              style={{ background: "var(--plum-950)", color: "var(--gold-100)", border: "1px solid rgba(227,170,44,0.6)", boxShadow: "0 8px 18px -10px rgba(0,0,0,0.6)" }}
            >
              {t(`social.${s.key}`)}
            </span>
            {big && <span className="vj-ping absolute inset-1 rounded-full" style={{ background: "rgba(37,211,102,0.45)" }} aria-hidden="true" />}
            <SocialBadge social={s} size={big ? 58 : 46} />
          </div>
        );
      })}
    </div>
  );
}
