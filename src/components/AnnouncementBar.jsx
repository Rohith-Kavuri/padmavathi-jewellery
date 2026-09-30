import { useEffect, useState } from "react";
import { ANNOUNCEMENTS } from "../data/products";
import { useLang } from "../i18n/LanguageContext";

export default function AnnouncementBar() {
  const { tx } = useLang();
  const [annIndex, setAnnIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAnnIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(90deg, var(--ruby-500), var(--amethyst-500), var(--sapphire-500))",
        color: "var(--cream)",
      }}
      className="text-center text-xs py-2 px-4"
    >
      <span key={annIndex} className="vj-fadeshift inline-block">
        {tx(ANNOUNCEMENTS[annIndex])}
      </span>
    </div>
  );
}
