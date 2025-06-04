import type React from "react";
import { AppAuth } from "@/components/App/AppAuth";
import { LocaleProvider } from "@/providers/locale.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import "../styles/globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LocaleProvider locale={lang} dictionary={dictionary}>
            <AppAuth>{children}</AppAuth>
            <div className="absolute top-4 right-4 z-50">
              <LanguageSwitcher />
            </div>
            <div className="absolute top-4 right-20 z-50">
              <ThemeSwitcher />
            </div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
