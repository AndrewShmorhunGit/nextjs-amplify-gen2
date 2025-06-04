import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ru"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Simple locale matching without external dependencies
  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim().toLowerCase());

  // Find the first matching locale
  for (const preferredLocale of preferredLocales) {
    // Check for exact match
    if (locales.includes(preferredLocale)) {
      return preferredLocale;
    }

    // Check for language match (e.g., 'en-US' matches 'en')
    const language = preferredLocale.split("-")[0];
    if (locales.includes(language)) {
      return language;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
