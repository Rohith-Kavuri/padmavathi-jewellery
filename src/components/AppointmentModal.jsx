import { X, Check } from "lucide-react";

export default function AppointmentModal({ open, form, setForm, done, onClose, onSubmit, onDoneClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(31,24,37,0.55)" }} onClick={onClose}>
      <div className="vj-modal-enter w-full max-w-sm rounded-2xl p-6" style={{ background: "var(--cream)" }} onClick={(e) => e.stopPropagation()}>
        {!done ? (
          <>
            <div className="flex justify-between items-start mb-4">
              <h3 className="vj-display text-xl" style={{ color: "var(--plum-900)" }}>
                Book a private visit
              </h3>
              <button onClick={onClose} className="vj-focus" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="vj-focus border rounded-lg px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--line)" }}
              />
              <input
                placeholder="Mobile number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="vj-focus border rounded-lg px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--line)" }}
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="vj-focus border rounded-lg px-3 py-2.5 text-sm"
                style={{ borderColor: "var(--line)" }}
              />
              <button type="submit" className="vj-focus mt-2 py-3 rounded-full text-sm font-medium" style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)", fontWeight: 600 }}>
                Confirm visit
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <Check size={28} style={{ color: "var(--success-600)" }} className="mx-auto mb-3" />
            <h3 className="vj-display text-xl mb-1" style={{ color: "var(--plum-900)" }}>
              Visit booked
            </h3>
            <p className="text-sm" style={{ color: "var(--ink)", opacity: 0.8 }}>
              We'll call {form.phone} to confirm a showroom near you for {form.date || "your chosen date"}.
            </p>
            <button onClick={onDoneClose} className="vj-focus mt-5 px-6 py-2.5 rounded-full text-sm" style={{ background: "linear-gradient(90deg, var(--gold-300), var(--gold-500))", color: "var(--plum-950)", fontWeight: 600 }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
