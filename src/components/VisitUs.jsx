import { MapPin, Clock, Phone, Navigation, CalendarHeart } from "lucide-react";
import { STORE, WHATSAPP_URL, PHONE_URL, MAP_EMBED_URL, DIRECTIONS_URL, SOCIALS } from "../data/site";
import { SocialRow } from "./SocialIcons";
import { useLang } from "../i18n/LanguageContext";
import WhatsAppIcon from "./WhatsAppIcon";

// Showroom details + map. Details are edited in the admin page
// (Homepage → Shop details); empty fields are simply not shown.
export default function VisitUs({ onBookVisit }) {
  const { t, tx } = useLang();
  const hours = tx(STORE.hours);

  const btn = "vj-shimmer vj-focus inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold";

  return (
    <section id="visit-section" className="px-4 md:px-6 py-12 md:py-16" style={{ scrollMarginTop: 110 }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="vj-mono text-xs tracking-widest mb-2" style={{ color: "var(--gold-700)" }}>
            {t("visit.eyebrow")}
          </div>
          <h2 className="vj-display text-3xl md:text-4xl mb-5" style={{ color: "var(--plum-900)" }}>
            {t("visit.title")}
          </h2>

          <div
            className="rounded-2xl p-5 md:p-6 space-y-4"
            style={{ background: "var(--cream-card)", border: "1px solid rgba(227,170,44,0.35)", boxShadow: "0 14px 34px -24px rgba(74,11,24,0.5)" }}
          >
            <div className="flex gap-3">
              <MapPin size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--ruby-500)" }} />
              <div>
                <div className="font-semibold" style={{ color: "var(--plum-900)" }}>{STORE.name}</div>
                <div className="text-sm" style={{ color: "var(--ink-soft)" }}>{tx(STORE.address)}</div>
              </div>
            </div>
            {hours && (
              <div className="flex gap-3">
                <Clock size={20} className="flex-shrink-0 mt-0.5" style={{ color: "var(--ruby-500)" }} />
                <div className="text-sm whitespace-pre-line" style={{ color: "var(--ink)" }}>{hours}</div>
              </div>
            )}
            {STORE.phone && (
              <a href={PHONE_URL} className="flex gap-3 items-center text-sm vj-focus" style={{ color: "var(--ink)" }}>
                <Phone size={20} className="flex-shrink-0" style={{ color: "var(--ruby-500)" }} /> {STORE.phone}
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {DIRECTIONS_URL && (
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={btn}
                style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)" }}
              >
                <Navigation size={16} /> {t("visit.directions")}
              </a>
            )}
            {WHATSAPP_URL && (
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={btn} style={{ background: "#1f8f4e", color: "#fff" }}>
                <WhatsAppIcon size={17} /> {t("visit.whatsapp")}
              </a>
            )}
            <button onClick={onBookVisit} className={btn} style={{ background: "var(--plum-900)", color: "var(--gold-100)", border: "1px solid var(--gold-500)" }}>
              <CalendarHeart size={16} /> {t("nav.book")}
            </button>
          </div>

          {SOCIALS.some((x) => x.key !== "whatsapp") && (
            <div className="flex items-center gap-4 mt-7">
              <span className="vj-mono text-[11px] tracking-widest" style={{ color: "var(--gold-700)" }}>
                {t("footer.follow").toUpperCase()}
              </span>
              <span className="h-px w-8" style={{ background: "var(--gold-500)" }} />
              <SocialRow size={44} exclude={["whatsapp"]} />
            </div>
          )}
        </div>

        {/* map in a gold arch; the maroon backdrop shows while it loads */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "1 / 1",
            maxHeight: 460,
            borderRadius: "50% 50% 18px 18px / 30% 30% 18px 18px",
            border: "2px solid rgba(227,170,44,0.7)",
            background: "radial-gradient(ellipse at 50% 40%, #8E1D33, #2C0610)",
            boxShadow: "0 30px 60px -30px rgba(36,5,13,0.7)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-8" style={{ color: "var(--gold-100)" }}>
            <MapPin size={34} style={{ color: "var(--gold-300)" }} />
            <div className="vj-display text-xl">{STORE.name}</div>
            <div className="text-xs opacity-80">{tx(STORE.address)}</div>
          </div>
          {MAP_EMBED_URL && (
            <iframe
              title={t("visit.mapTitle")}
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
