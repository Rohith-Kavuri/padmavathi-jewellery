import { useState } from "react";
import { Sparkles, Check } from "lucide-react";

export default function Newsletter() {
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
          New collections, before they reach the showroom floor
        </h2>
        <p className="text-sm mb-5" style={{ color: "var(--ink)", opacity: 0.8 }}>
          One email a month. Mostly Muhurat dates and new arrivals.
        </p>
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus(null);
            }}
            placeholder="you@email.com"
            className="vj-focus border rounded-full px-4 py-2.5 text-sm flex-1 max-w-xs"
            style={{ borderColor: status === "error" ? "var(--ruby-500)" : "var(--line)" }}
          />
          <button
            type="submit"
            className="vj-focus px-6 py-2.5 rounded-full text-sm font-medium"
            style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)", fontWeight: 600 }}
          >
            Subscribe
          </button>
        </form>
        {status === "ok" && (
          <p className="text-xs mt-3" style={{ color: "var(--success-600)" }}>
            <Check size={12} className="inline mr-1" />
            You're on the list.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs mt-3" style={{ color: "var(--ruby-500)" }}>
            That doesn't look like an email address.
          </p>
        )}
      </div>
    </section>
  );
}
