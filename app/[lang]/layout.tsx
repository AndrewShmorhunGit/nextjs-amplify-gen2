import type React from "react";
import { AppAuth } from "@/components/App/AppAuth";
import { LocaleProvider } from "@/providers/locale.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeScript } from "@/styles/theme.script";
import { ThemeWrapper } from "@/styles/theme.wrapper";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import "../styles/globals.css";

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
      <head>
        <ThemeScript />
      </head>
      <body className="transition-colors duration-200">
        <ThemeProvider>
          <ThemeWrapper>
            <LocaleProvider locale={lang} dictionary={dictionary}>
              <div className="relative min-h-screen">
                <AppAuth>{children}</AppAuth>
              </div>
            </LocaleProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
