import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "./en.json";
import ar from "./ar.json";
import es from "./es.json";
import fr from "./fr.json";

const TRANSLATIONS = { en, ar, es, fr };
const STORAGE_KEY = "astra-lang";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((code) => {
    if (TRANSLATIONS[code]) setLangState(code);
  }, []);

  const t = useCallback((key) => {
    const keys = key.split(".");
    let val = TRANSLATIONS[lang];
    for (const k of keys) val = val?.[k];
    if (val !== undefined) return val;
    // Fall back to English
    val = TRANSLATIONS.en;
    for (const k of keys) val = val?.[k];
    return val ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
