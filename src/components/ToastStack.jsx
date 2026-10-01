import { useLang } from "../i18n/LanguageContext";

// Toasts hold a translation key + vars, so a toast already on screen switches
// language along with the rest of the page.
export default function ToastStack({ toasts }) {
  const { t } = useLang();
  return (
    <div className="fixed bottom-20 md:bottom-24 right-5 z-50 flex flex-col gap-2 items-end" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="vj-toast text-sm px-4 py-2.5 rounded-full"
          style={{ background: "var(--plum-900)", color: "var(--gold-100)" }}
        >
          {t(toast.key, toast.vars)}
        </div>
      ))}
    </div>
  );
}
