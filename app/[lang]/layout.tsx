import type React from "react";
import { AppAuth } from "@/components/App/AppAuth";
import { LocaleProvider } from "@/providers/locale.provider";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import "../styles/globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

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
    <html lang={lang}>
      <body>
        <LocaleProvider locale={lang} dictionary={dictionary}>
          <AppAuth>{children}</AppAuth>
          <div className="absolute top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
