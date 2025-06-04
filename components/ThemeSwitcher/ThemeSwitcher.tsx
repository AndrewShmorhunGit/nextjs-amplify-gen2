"use client";

import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {isDark ? (
        <>
          <Sun className="w-6 h-6 " />
        </>
      ) : (
        <>
          <Moon className="w-6 h-6 " />
        </>
      )}
    </Button>
  );
}
