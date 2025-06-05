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
  en: "en",
  ru: "ru",
};

export const amplifyDictionary = {
  en: {
    "Sign In": "Sign In",
    "Create Account": "Create Account",
    Email: "Email",
    Password: "Password",
    "Confirm Password": "Confirm Password",
    "Please confirm your Password": "Please confirm your Password",
    "Enter your Email": "Enter your Email",
    "Enter your Password": "Enter your Password",
    "Sign in": "Sign in",
    "Preferred Username": "Preferred Username",
    "Enter your Preferred Username": "Enter your Preferred Username",
    "Password must have at least 8 characters":
      "Password must have at least 8 characters",
    "Password must have lower case letters":
      "Password must have lower case letters",
    "Password must have upper case letters":
      "Password must have upper case letters",
    "Password must have numbers": "Password must have numbers",
    "Password must have special characters":
      "Password must have special characters",
    "Your passwords must match": "Your passwords must match",
  },
  ru: {
    "Sign In": "Войти",
    "Create Account": "Создать аккаунт",
    Email: "Почта",
    Password: "Пароль",
    "Confirm Password": "Подтвердите пароль",
    "Please confirm your Password": "Пожалуйста подтвердите ваш пароль",
    "Enter your Email": "Введите почту",
    "Enter your Password": "Введите пароль",
    "Sign in": "Войти",
    "Preferred Username": "Желаемое имя пользователя",
    "Enter your Preferred Username": "Введите жлаемое имя пользователя",
    "Password must have at least 8 characters":
      "Пароль должен содержать минимум 8 символов",
    "Password must have lower case letters":
      "Пароль должен содержать строчные буквы",
    "Password must have upper case letters":
      "Пароль должен содержать заглавные буквы",
    "Password must have numbers": "Пароль должен содержать цифры",
    "Password must have special characters":
      "Пароль должен содержать специальные символы",
    "Your passwords must match": "Пароли должны совпадать",
  },
};
