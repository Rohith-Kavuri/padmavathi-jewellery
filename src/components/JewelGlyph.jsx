// Line-art jewellery glyphs — the catalogue's signature visual element.
export default function JewelGlyph({ category, className }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (category) {
    case "Necklace":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <path {...common} d="M10 14c2 16 10 26 22 26s20-10 22-26" />
          <circle {...common} cx="32" cy="44" r="5" />
          <path {...common} d="M32 40v-2" />
        </svg>
      );
    case "Bridal Set":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <path {...common} d="M8 16c3 14 11 23 24 23s21-9 24-23" />
          <path {...common} d="M32 39v3" />
          <circle {...common} cx="32" cy="45" r="4.5" />
          <circle {...common} cx="14" cy="50" r="2.6" />
          <circle {...common} cx="50" cy="50" r="2.6" />
        </svg>
      );
    case "Earrings":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <circle {...common} cx="22" cy="16" r="3.4" />
          <path {...common} d="M22 19.4c0 9-7 11-7 19a7 7 0 0 0 14 0c0-8-7-10-7-19" />
          <circle {...common} cx="44" cy="16" r="3.4" />
          <path {...common} d="M44 19.4c0 9-7 11-7 19a7 7 0 0 0 14 0c0-8-7-10-7-19" />
        </svg>
      );
    case "Bangles":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <circle {...common} cx="26" cy="34" r="17" />
          <circle {...common} cx="40" cy="30" r="17" />
        </svg>
      );
    case "Bracelets":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <ellipse {...common} cx="32" cy="32" rx="22" ry="11" />
          <circle {...common} cx="14" cy="29" r="2" />
          <circle {...common} cx="24" cy="22.5" r="2" />
          <circle {...common} cx="38" cy="21.5" r="2" />
          <circle {...common} cx="50" cy="27" r="2" />
        </svg>
      );
    case "Rings":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <circle {...common} cx="32" cy="38" r="14" />
          <path {...common} d="M26 24l6-10 6 10z" />
          <path {...common} d="M27 24h10" />
        </svg>
      );
    case "Mangalsutra":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <path {...common} d="M8 18c5 12 6 12 8 12s3 0 8-12 6-12 8-12 3 0 8 12 6 12 8 12 3 0 8-12" />
          <circle {...common} cx="26" cy="42" r="5" />
          <circle {...common} cx="38" cy="42" r="5" />
        </svg>
      );
    case "Chains":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <ellipse {...common} cx="16" cy="20" rx="7" ry="5" transform="rotate(20 16 20)" />
          <ellipse {...common} cx="28" cy="28" rx="7" ry="5" transform="rotate(20 28 28)" />
          <ellipse {...common} cx="40" cy="36" rx="7" ry="5" transform="rotate(20 40 36)" />
          <ellipse {...common} cx="52" cy="44" rx="7" ry="5" transform="rotate(20 52 44)" />
        </svg>
      );
    case "Pendant":
      return (
        <svg viewBox="0 0 64 64" className={className}>
          <circle {...common} cx="32" cy="16" r="5" />
          <path {...common} d="M32 21v6" />
          <path {...common} d="M22 27h20l-10 24z" />
        </svg>
      );
    default:
      return null;
  }
}
