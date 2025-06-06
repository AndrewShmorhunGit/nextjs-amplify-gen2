"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/providers/locale.provider";
import { locales, localeNames, type Locale } from "@/lib/dictionaries";
import { Button } from "../Buttons/PrimaryButton";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLocale();

  const nextLocale: Locale = locales.find((l) => l !== locale)!;

  const handleToggle = () => {
    const cleanPath = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${cleanPath}`);
  };

  return (
    <Button variant="outline" onClick={handleToggle}>
      {localeNames[nextLocale]}
    </Button>
  );
}
