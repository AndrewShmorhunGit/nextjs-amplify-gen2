"use client";
import type React from "react";
import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/amplify_outputs.json";
import { I18n } from "@aws-amplify/core";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { useLocale } from "@/providers/locale.provider";

Amplify.configure(config, { ssr: true });

// AWS Amplify translations
const amplifyTranslations = {
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

export function AppAuth({ children }: { children: React.ReactNode }) {
  const { locale, t } = useLocale();

  // Set Amplify language based on current locale
  useEffect(() => {
    // Add translations for the current locale
    I18n.putVocabulariesForLanguage(locale, amplifyTranslations[locale]);
    // Set the language
    I18n.setLanguage(locale);
  }, [locale]);

  return (
    <View>
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>

      <Authenticator
        components={{
          SignIn: {
            Footer() {
              return (
                <div className="text-center mt-4 text-xs text-[var(--color-text-light)]">
                  {t("auth.agree")}&nbsp;
                  <a
                    href="/privacy-policy"
                    className="underline hover:text-[var(--color-primary-dark)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("auth.agreeWithPolitics")}
                  </a>
                  .
                </div>
              );
            },
          },
        }}
      >
        {children}
      </Authenticator>
    </View>
  );
}
