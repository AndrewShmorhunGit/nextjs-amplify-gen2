export type Locale = "en" | "ru";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ru: () => import("@/dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }
  return dictionaries[locale]();
};

export const locales: Locale[] = ["en", "ru"];
export const defaultLocale: Locale = "en";

export const localeNames = {
  en: "English",
  ru: "Русский",
};
