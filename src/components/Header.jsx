import { Search, ShoppingBag, Menu } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import wordmark from "../assets/padmavathi-wordmark.webp";

// Classic jeweller header: the gold wordmark centred, search on the left,
// language + bag on the right, and (on laptops) the menu on a slim line
// below in small spaced capitals.
export default function Header({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenMobileMenu,
  onOpenCart,
  onGoCollections,
  onGoBridal,
  onGoRates,
  onGoHeritage,
  onGoVisit,
  onBookVisit,
}) {
  const { t } = useLang();

  const links = [
    ["nav.collections", onGoCollections],
    ["nav.bridal", onGoBridal],
    ["nav.rates", onGoRates],
    ["nav.heritage", onGoHeritage],
    ["nav.visit", onGoVisit],
    ["nav.book", onBookVisit],
  ];

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "rgba(253,246,236,0.96)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(227,170,44,0.55)",
      }}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-6 py-2.5 lg:py-3">
        {/* left: menu (phones/tablets) + search */}
        <div className="flex items-center gap-3 min-w-0">
          <button className="lg:hidden vj-focus" onClick={onOpenMobileMenu} aria-label={t("aria.openMenu")}>
            <Menu size={22} />
          </button>
          <div className="hidden md:flex items-center border rounded-full px-3 py-1.5" style={{ borderColor: "rgba(184,134,43,0.35)" }}>
            <Search size={15} style={{ color: "var(--gold-700)" }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("search.aria")}
              className="vj-focus bg-transparent border-none outline-none text-sm ml-2 w-32 lg:w-40"
            />
          </div>
        </div>

        {/* centre: wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="vj-focus justify-self-center"
          aria-label={t("brand.name")}
        >
          <img src={wordmark} alt={t("brand.name")} className="block h-9 md:h-12 lg:h-14 w-auto" />
        </button>

        {/* right: language + bag */}
        <div className="flex items-center justify-end gap-3 md:gap-4">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="sm:hidden">
            <LanguageToggle compact />
          </div>
          <button className="relative vj-focus" onClick={onOpenCart} aria-label={t("aria.bag")}>
            <ShoppingBag size={21} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: "var(--plum-900)", color: "var(--gold-100)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* laptop menu line */}
      <nav
        className="vj-navline hidden lg:flex items-center justify-center gap-8 xl:gap-10 pb-2.5 text-[11px] uppercase whitespace-nowrap"
        style={{ color: "var(--plum-900)" }}
      >
        {links.map(([key, fn]) => (
          <button key={key} className="vj-underline vj-focus" onClick={fn}>
            {t(key)}
          </button>
        ))}
      </nav>
    </header>
  );
}
