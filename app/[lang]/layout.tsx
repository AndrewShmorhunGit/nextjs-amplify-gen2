import type React from "react";
import { AppAuth } from "@/components/App/AppAuth";
import { LocaleProvider } from "@/providers/locale.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { ThemeScript } from "@/styles/theme.script";
import { ThemeWrapper } from "@/styles/theme.wrapper";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import "../styles/globals.css";
import ReduxProviders from "../redux/provider";
import { AppLayout } from "@/components/App/Layouts/AppLayout";
import { DialogProvider } from "@/providers/dialog.provider";
import { getWebSocketUrl } from "@/utils/get-websocket-url";

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

  const websocketUrl = getWebSocketUrl() || "";
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="transition-colors duration-200">
        <ReduxProviders>
          <ThemeProvider>
            <ThemeWrapper>
              <LocaleProvider locale={lang} dictionary={dictionary}>
                <AppAuth>
                  <DialogProvider>
                    <AppLayout websocketUrl={websocketUrl}>
                      {children}
                      {/* <CreateUserLayout>{children}</CreateUserLayout> */}
                    </AppLayout>
                  </DialogProvider>
                </AppAuth>
              </LocaleProvider>
            </ThemeWrapper>
          </ThemeProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
