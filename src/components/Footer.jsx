import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { CATEGORIES } from "../data/products";
import { STORE, WHATSAPP_URL, PHONE_URL } from "../data/site";
import { useLang } from "../i18n/LanguageContext";
import WhatsAppIcon from "./WhatsAppIcon";
import goldWordmark from "../assets/padmavathi-wordmark-gold.webp";

// Gold flourish for the footer corners (mirrored for the right side).
function Corner({ className, flip }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, color: "rgba(227,170,44,0.55)" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M6 114V40C6 20 20 6 40 6h74" />
      <path d="M16 114V48c0-18 14-32 32-32h66" strokeOpacity="0.5" />
      <path d="M40 6c0 14 8 22 22 22-14 0-22 8-22 22 0-14-8-22-22-22 14 0 22-8 22-22z" fill="currentColor" fillOpacity="0.15" />
      <circle cx="6" cy="114" r="2.5" fill="currentColor" />
      <circle cx="114" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function Footer({ onSelectCategory, onBookVisit, onGoVisit, onGoRates }) {
  const { t, tx } = useLang();

  const social = [
    WHATSAPP_URL && { href: WHATSAPP_URL, label: "WhatsApp", icon: <WhatsAppIcon size={16} /> },
    STORE.instagram && { href: STORE.instagram, label: "Instagram", icon: <Instagram size={16} /> },
    STORE.facebook && { href: STORE.facebook, label: "Facebook", icon: <Facebook size={16} /> },
  ].filter(Boolean);

  const linkStyle = { color: "rgba(251,236,200,0.75)" };
  const head = "vj-mono text-[11px] tracking-widest mb-4";

  return (
    <footer
      className="relative overflow-hidden px-4 md:px-6 pt-14 pb-8"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #5C0F20 0%, #3A0812 45%, #1E040A 100%)", color: "rgba(251,236,200,0.75)" }}
    >
      <Corner className="absolute top-3 left-3 w-16 h-16 md:w-24 md:h-24" />
      <Corner className="absolute top-3 right-3 w-16 h-16 md:w-24 md:h-24" flip />

      <div className="relative max-w-6xl mx-auto">
        {/* brand block, centred */}
        <div className="text-center mb-10">
          <img src={goldWordmark} alt={STORE.name} className="mx-auto h-14 md:h-16 w-auto" />
          <p className="vj-display text-lg md:text-xl mt-3" style={{ color: "var(--gold-100)" }}>
            {t("footer.tagline")}
          </p>
          <p className="text-xs md:text-sm max-w-md mx-auto mt-2">{t("footer.about")}</p>
        </div>

        <div className="h-px mb-10" style={{ background: "linear-gradient(90deg, transparent, rgba(227,170,44,0.55), transparent)" }} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2 md:col-span-2">
            <div className={head} style={{ color: "var(--gold-500)" }}>{t("footer.visit")}</div>
            <div className="flex gap-2.5 text-sm">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "var(--gold-300)" }} />
              <span>
                <span className="block" style={{ color: "var(--gold-100)" }}>{STORE.name}</span>
                {tx(STORE.address)}
              </span>
            </div>
            {STORE.phone && (
              <a href={PHONE_URL} className="flex items-center gap-2.5 mt-3 vj-focus">
                <Phone size={15} style={{ color: "var(--gold-300)" }} /> {STORE.phone}
              </a>
            )}
            {STORE.email && (
              <a href={`mailto:${STORE.email}`} className="flex items-center gap-2.5 mt-2 vj-focus">
                <Mail size={15} style={{ color: "var(--gold-300)" }} /> {STORE.email}
              </a>
            )}
            {social.length > 0 && (
              <div className="flex items-center gap-3 mt-5">
                <span className="text-xs mr-1">{t("footer.follow")}</span>
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="vj-focus flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-[#e3aa2c] hover:text-[#24050d]"
                    style={{ border: "1px solid rgba(227,170,44,0.55)", color: "var(--gold-100)" }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className={head} style={{ color: "var(--gold-500)" }}>{t("footer.shop")}</div>
            <div className="flex flex-col gap-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <button key={c.key} onClick={() => onSelectCategory(c.key)} className="text-left vj-focus hover:text-[#f2c45a]" style={linkStyle}>
                  {tx(c.label)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className={head} style={{ color: "var(--gold-500)" }}>{t("footer.help")}</div>
            <div className="flex flex-col gap-2 items-start">
              <button onClick={onGoRates} className="text-left vj-focus hover:text-[#f2c45a]" style={linkStyle}>{t("nav.rates")}</button>
              <button onClick={onGoVisit} className="text-left vj-focus hover:text-[#f2c45a]" style={linkStyle}>{t("nav.visit")}</button>
              <button
                onClick={onBookVisit}
                className="vj-shimmer vj-focus mt-2 text-xs px-4 py-2 rounded-full"
                style={{ border: "1px solid var(--gold-500)", color: "var(--gold-100)" }}
              >
                {t("footer.book")}
              </button>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 text-xs flex flex-col sm:flex-row justify-between gap-2 text-center sm:text-left"
          style={{ borderTop: "1px solid rgba(227,170,44,0.25)", color: "rgba(251,236,200,0.6)" }}
        >
          <span>{t("footer.copyright", { name: STORE.name })}</span>
          <span>{t("footer.legal")}</span>
        </div>
      </div>
    </footer>
  );
}
