import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // 'ok' | 'error'

  function submit(e) {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(ok ? "ok" : "error");
    if (ok) setEmail("");
  }

  return (
    <section className="px-4 md:px-6 py-14" style={{ background: "var(--cream)" }}>
      <div className="max-w-xl mx-auto text-center">
        <Sparkles size={22} style={{ color: "var(--gold-700)" }} className="mx-auto mb-3" />
        <h2 className="vj-display text-2xl mb-2" style={{ color: "var(--plum-900)" }}>
          {t("newsletter.title")}
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--ink)", opacity: 0.8 }}>
          {t("newsletter.body")}
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus(null);
            }}
            placeholder={t("newsletter.placeholder")}
            aria-label={t("newsletter.aria")}
            className="vj-focus border rounded-full px-4 py-2.5 text-sm flex-1 max-w-xs"
            style={{ borderColor: status === "error" ? "var(--ruby-500)" : "var(--line)" }}
          />
          <button
            type="submit"
            className="vj-shimmer vj-focus px-6 py-2.5 rounded-full text-sm font-medium"
            style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)", fontWeight: 600 }}
          >
            {t("newsletter.submit")}
          </button>
        </form>
        {status === "ok" && (
          <p className="text-xs mt-3" style={{ color: "var(--success-600)" }}>
            <Check size={12} className="inline mr-1" />
            {t("newsletter.ok")}
          </p>
        )}
        {status === "error" && (
          <p className="text-xs mt-3" style={{ color: "var(--ruby-500)" }}>
            {t("newsletter.error")}
          </p>
        )}
      </div>
    </section>
  );
}
