import { MapPin, Phone } from "lucide-react";
import { CITIES } from "../data/products";
import { fmtINR } from "../utils/format";

export default function TopUtilityBar({ city, setCity, displayRate22, displayRate24 }) {
  return (
    <div
      style={{ background: "var(--plum-900)", color: "var(--gold-300)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs"
    >
      <div className="flex items-center gap-2 overflow-hidden" style={{ maxWidth: "55%" }}>
        <span className="vj-mono opacity-80">GOLD&nbsp;RATE</span>
        <div className="overflow-hidden whitespace-nowrap" style={{ width: 380 }}>
          <div className="vj-marquee-track inline-flex gap-10 whitespace-nowrap">
            <span>22K {fmtINR(displayRate22)}/g · 24K {fmtINR(displayRate24)}/g · {city}</span>
            <span>22K {fmtINR(displayRate22)}/g · 24K {fmtINR(displayRate24)}/g · {city}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="vj-focus bg-transparent border-none text-xs"
          style={{ color: "var(--gold-300)" }}
        >
          {CITIES.map((c) => (
            <option key={c.name} value={c.name} style={{ color: "var(--ink)" }}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="flex items-center gap-1">
          <MapPin size={12} /> Find a showroom
        </span>
        <span className="flex items-center gap-1">
          <Phone size={12} /> 1800 425 7333
        </span>
      </div>
    </div>
  );
}
