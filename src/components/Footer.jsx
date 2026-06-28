import { Phone, Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import { CATEGORIES } from "../data/products";

export default function Footer({ onSelectCategory, onBookVisit }) {
  return (
    <footer style={{ background: "var(--plum-950)", color: "rgba(255,251,242,0.7)" }} className="px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 text-sm">
        <div className="col-span-2">
          <div className="vj-display text-2xl mb-2" style={{ color: "var(--gold-100)" }}>
            PADMAVATHI
          </div>
          <p className="text-xs max-w-xs" style={{ color: "rgba(255,251,242,0.7)", opacity: 0.85 }}>
            Fine jewellery, made by nine artisan guilds across South India, sold from 120 showrooms in three countries.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs">
            <Phone size={13} /> 1800 425 7333
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <Mail size={13} /> care@padmavathijewellery.example
          </div>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="vj-focus flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: "var(--plum-800)", color: "var(--gold-100)" }}
            >
              <MessageCircle size={15} />
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="vj-focus flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: "var(--plum-800)", color: "var(--gold-100)" }}
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="vj-focus flex items-center justify-center w-8 h-8 rounded-full"
              style={{ background: "var(--plum-800)", color: "var(--gold-100)" }}
            >
              <Youtube size={15} />
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs tracking-widest mb-3" style={{ color: "var(--gold-500)" }}>
            SHOP
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {CATEGORIES.slice(0, 5).map((c) => (
              <button key={c.key} onClick={() => onSelectCategory(c.key)} className="text-left vj-focus" style={{ color: "rgba(255,251,242,0.7)" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-widest mb-3" style={{ color: "var(--gold-500)" }}>
            COMPANY
          </div>
          <div className="flex flex-col gap-2 text-xs">
            <span>About Padmavathi</span>
            <span>Our artisan guilds</span>
            <span>Showroom locator</span>
            <span>Careers</span>
          </div>
        </div>
        <div>
          <div className="text-xs tracking-widest mb-3" style={{ color: "var(--gold-500)" }}>
            VISIT
          </div>
          <button
            onClick={onBookVisit}
            className="vj-focus text-xs px-4 py-2 rounded-full border"
            style={{ borderColor: "var(--gold-500)", color: "var(--gold-100)" }}
          >
            Book a private visit
          </button>
        </div>
      </div>
      <div
        className="max-w-6xl mx-auto mt-10 pt-6 text-xs flex flex-col sm:flex-row justify-between gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)", opacity: 0.7 }}
      >
        <span>© 2026 Padmavathi Jewellery. A fictional brand built for demonstration.</span>
        <span>Privacy · Terms · Hallmarking standards</span>
      </div>
    </footer>
  );
}
