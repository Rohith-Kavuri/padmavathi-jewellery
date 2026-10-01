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
        background: "linear-gradient(90deg, var(--plum-950), var(--ruby-500) 50%, var(--plum-950))",
        color: "var(--gold-100)",
        borderBottom: "1px solid rgba(227,170,44,0.45)",
      }}
      className="text-center text-xs py-2 px-4"
    >
      <span key={annIndex} className="vj-fadeshift inline-block">
        {tx(ANNOUNCEMENTS[annIndex])}
      </span>
    </div>
  );
}
