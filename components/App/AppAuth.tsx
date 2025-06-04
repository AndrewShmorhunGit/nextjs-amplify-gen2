"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "@/amplify_outputs.json";
// import { containerProps, theme } from "@/styles/theme";
// import { ThemeStyle } from "@aws-amplify/ui-react/server";
import { I18n } from "@aws-amplify/core";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

Amplify.configure(config, { ssr: true });

I18n.putVocabulariesForLanguage("ru", {
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

  // Подтверждение пароля
  "Your passwords must match": "Пароли должны совпадать",
});

I18n.setLanguage("ru");

export function AppAuth({ children }: { children: React.ReactNode }) {
  return (
    <View>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold">Добро пожаловать / Welcome</h2>
        <p className="text-sm text-[var(--color-text-light)] mt-2">
          Войдите в аккаунт, чтобы продолжить / Sign in to continue
        </p>
      </div>

      <Authenticator
        components={{
          SignIn: {
            Footer() {
              return (
                <div className="text-center mt-4 text-xs text-[var(--color-text-light)]">
                  Продолжая, вы соглашаетесь с&nbsp;
                  <a
                    href="/privacy-policy"
                    className="underline hover:text-[var(--color-primary-dark)]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
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
      <div className="flex justify-center mb-4">
        <ThemeToggle />
      </div>
    </View>
  );
}
