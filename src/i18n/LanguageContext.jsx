import { createContext, useContext, useEffect, useCallback } from "react";
import en from "./en.json";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }, []);

  const t = useCallback((key) => {
    const keys = key.split(".");
    let val = en;
    for (const k of keys) val = val?.[k];
    return val ?? key;
  }, []);

  return (
    <LanguageContext.Provider value={{ lang: "en", t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
