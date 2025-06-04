"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/dictionaries";

type Dictionary = Record<string, any>;

interface LocaleContextType {
  locale: Locale;
  dictionary: Dictionary;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
}

export function LocaleProvider({
  children,
  locale,
  dictionary,
}: LocaleProviderProps) {
  const t = (key: string): string => {
    const keys = key.split(".");
    let value = dictionary;

    for (const k of keys) {
      value = value?.[k];
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LocaleContext.Provider value={{ locale, dictionary, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
