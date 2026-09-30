import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS } from "./strings";

export const LANGS = ["en", "te"];
const STORAGE_KEY = "padmavathi-lang";

const LanguageContext = createContext(null);

// Bilingual values in the data layer are written as { en: "...", te: "..." }.
// pick() returns the right side for the current language, falling back to
// English, and passes plain strings/numbers straight through.
export function pick(value, lang) {
  if (value && typeof value === "object" && "en" in value) return value[lang] ?? value.en;
  return value;
}

function readSavedLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage unavailable (private mode etc.) — fall back to English */
  }
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readSavedLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = STRINGS[lang]["meta.title"] || STRINGS.en["meta.title"];
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key, vars) => {
      let str = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
      if (vars) {
        str = str.replace(/\{(\w+)\}/g, (_, name) => {
          const v = vars[name];
          return v == null ? "" : String(pick(v, lang));
        });
      }
      return str;
    },
    [lang]
  );

  const tx = useCallback((value) => pick(value, lang), [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === "en" ? "te" : "en")),
      t,
      tx,
    }),
    [lang, t, tx]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
