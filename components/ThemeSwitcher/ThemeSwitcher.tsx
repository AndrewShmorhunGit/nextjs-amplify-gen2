"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { useLocale } from "@/providers/locale.provider";

export function ThemeSwitcher() {
  const { isDark, toggleTheme } = useThemeToggle();
  const { t } = useLocale();

  return (
    <Button
      variant="outline"
      // size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? t("theme.light") : t("theme.dark")}
    >
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
