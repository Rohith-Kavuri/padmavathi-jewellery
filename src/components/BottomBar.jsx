import { Home, LayoutGrid, Coins, ShoppingBag, MapPin } from "lucide-react";
import { WHATSAPP_URL } from "../data/site";
import { SocialDock } from "./SocialIcons";
import { useLang } from "../i18n/LanguageContext";
import WhatsAppIcon from "./WhatsAppIcon";

// App-style bar along the bottom of the screen on phones, plus a floating
// WhatsApp button on larger screens (only when a WhatsApp number is set in
// the admin page).
export default function BottomBar({ cartCount, onHome, onCategories, onRates, onBag, onVisit }) {
  const { t } = useLang();

  const item = "vj-focus flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-[10px] leading-tight";
  const items = [
    { key: "bottom.home", Icon: Home, onClick: onHome },
    { key: "bottom.categories", Icon: LayoutGrid, onClick: onCategories },
    { key: "bottom.rates", Icon: Coins, onClick: onRates },
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch"
        style={{
          background: "linear-gradient(180deg, #4A0B18, #2C0610)",
          borderTop: "1px solid rgba(227,170,44,0.6)",
          color: "var(--gold-100)",
          paddingBottom: "env(safe-area-inset-bottom)",
          boxShadow: "0 -10px 30px -12px rgba(36,5,13,0.6)",
        }}
        aria-label={t("bottom.aria")}
      >
        {items.map(({ key, Icon, onClick }) => (
          <button key={key} className={item} onClick={onClick}>
            <Icon size={19} style={{ color: "var(--gold-300)" }} />
            {t(key)}
          </button>
        ))}
        <button className={item} onClick={onBag}>
          <span className="relative">
            <ShoppingBag size={19} style={{ color: "var(--gold-300)" }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-2.5 text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-semibold"
                style={{ background: "var(--gold-500)", color: "var(--plum-950)" }}
              >
                {cartCount}
              </span>
            )}
          </span>
          {t("bottom.bag")}
        </button>
        {WHATSAPP_URL ? (
          <a className={item} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={19} className="text-[#4ade80]" />
            {t("bottom.whatsapp")}
          </a>
        ) : (
          <button className={item} onClick={onVisit}>
            <MapPin size={19} style={{ color: "var(--gold-300)" }} />
            {t("bottom.visit")}
          </button>
        )}
      </nav>

      <SocialDock />
    </>
  );
}
