import { Search, ShoppingBag, Menu } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import wordmark from "../assets/padmavathi-wordmark.webp";

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
  onBookVisit,
}) {
  const { t } = useLang();

  const links = [
    ["nav.collections", onGoCollections],
    ["nav.bridal", onGoBridal],
    ["nav.rates", onGoRates],
    ["nav.heritage", onGoHeritage],
    ["nav.book", onBookVisit],
  ];

  return (
    <header style={{ background: "var(--cream)", borderBottom: "1px solid var(--line)" }} className="sticky top-0 z-40">
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <button className="lg:hidden vj-focus" onClick={onOpenMobileMenu} aria-label={t("aria.openMenu")}>
            <Menu size={22} />
          </button>
          {/* gold wordmark from the logo */}
          <img src={wordmark} alt={t("brand.name")} className="block h-9 md:h-12 w-auto" />
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm whitespace-nowrap" style={{ color: "var(--ink)" }}>
          {links.map(([key, fn]) => (
            <button key={key} className="vj-underline vj-focus" onClick={fn}>
              {t(key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center border rounded-full px-3 py-1.5" style={{ borderColor: "var(--line)" }}>
            <Search size={15} style={{ color: "var(--gold-700)" }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("search.aria")}
              className="vj-focus bg-transparent border-none outline-none text-sm ml-2 w-36"
            />
          </div>

          {/* language toggle — replaces the old wishlist icon */}
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="sm:hidden">
            <LanguageToggle compact />
          </div>

          <button className="relative vj-focus" onClick={onOpenCart} aria-label={t("aria.bag")}>
            <ShoppingBag size={20} />
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
    </header>
  );
}