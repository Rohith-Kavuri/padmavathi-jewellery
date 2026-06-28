export default function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="vj-toast text-sm px-4 py-2.5 rounded-full"
          style={{ background: "var(--plum-900)", color: "var(--gold-100)" }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
