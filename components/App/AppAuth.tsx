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
import { amplifyDictionary } from "@/lib/dictionaries";
import { AuthWrapper } from "./AuthWrapper";

Amplify.configure(config, { ssr: true });

export function AppAuth({ children }: { children: React.ReactNode }) {
  const { locale, t } = useLocale();

  useEffect(() => {
    I18n.putVocabulariesForLanguage(locale, amplifyDictionary[locale]);
    I18n.setLanguage(locale);
  }, [locale]);

  return (
    <View className="mt-0">
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
        <AuthWrapper>{children}</AuthWrapper>
      </Authenticator>
    </View>
  );
}
