import { X, Search } from "lucide-react";

export default function MobileMenu({
  open,
  onClose,
  searchTerm,
  setSearchTerm,
  onGoCollections,
  onGoBridal,
  onGoRates,
  onGoHeritage,
  onBookVisit,
}) {
  if (!open) return null;

  const links = [
    ["Collections", onGoCollections],
    ["Bridal", onGoBridal],
    ["Gold Rates", onGoRates],
    ["Heritage", onGoHeritage],
    ["Book a Visit", onBookVisit],
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-72 h-full p-5 flex flex-col gap-5" style={{ background: "var(--cream)" }}>
        <div className="flex justify-between items-center">
          <span className="vj-display text-xl" style={{ color: "var(--plum-900)" }}>
            PADMAVATHI
          </span>
          <button onClick={onClose} className="vj-focus" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <div className="flex items-center border rounded-full px-3 py-2" style={{ borderColor: "var(--line)" }}>
          <Search size={15} style={{ color: "var(--gold-700)" }} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jewellery"
            className="bg-transparent border-none outline-none text-sm ml-2 w-full"
          />
        </div>
        <div className="flex flex-col gap-4 text-base mt-2">
          {links.map(([label, fn]) => (
            <button
              key={label}
              className="text-left"
              onClick={() => {
                fn();
                onClose();
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1" style={{ background: "rgba(43,34,48,0.5)" }} onClick={onClose} />
    </div>
  );
}
