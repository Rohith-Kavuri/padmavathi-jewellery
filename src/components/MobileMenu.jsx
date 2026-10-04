import { X, Search } from "lucide-react";
import { SocialRow } from "./SocialIcons";
import { useLang } from "../i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function MobileMenu({
  open,
  onClose,
  searchTerm,
  setSearchTerm,
  onGoCollections,
  onGoBridal,
  onGoRates,
  onGoHeritage,
  onGoVisit,
  onGoCatalogue,
  onBookVisit,
}) {
  const { t } = useLang();
  if (!open) return null;

  const links = [
    ["nav.collections", onGoCollections],
    ["nav.bridal", onGoBridal],
    ["nav.rates", onGoRates],
    ["nav.heritage", onGoHeritage],
    ["nav.visit", onGoVisit],
    ["nav.catalogue", onGoCatalogue],
    ["nav.book", onBookVisit],
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-72 h-full p-5 flex flex-col gap-5" style={{ background: "var(--cream)" }}>
        <div className="flex justify-between items-center">
          <span className="vj-display text-xl" style={{ color: "var(--plum-900)" }}>
            {t("brand.name")}
          </span>
          <button onClick={onClose} className="vj-focus" aria-label={t("aria.closeMenu")}>
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center border rounded-full px-3 py-2" style={{ borderColor: "var(--line)" }}>
          <Search size={15} style={{ color: "var(--gold-700)" }} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("search.aria")}
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-4 text-base mt-2">
          {links.map(([key, fn]) => (
            <button
              key={key}
              className="text-left"
              onClick={() => {
                fn();
                onClose();
              }}
            >
              {t(key)}
            </button>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-4">
          <SocialRow size={42} />
          <LanguageToggle />
        </div>
      </div>
      <div className="flex-1" style={{ background: "rgba(43,34,48,0.5)" }} onClick={onClose} />
    </div>
  );
}
