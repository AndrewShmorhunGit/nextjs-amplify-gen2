"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeTransition() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Temporarily disable transitions
    root.classList.add("theme-transition-disable");

    // Re-enable transitions after a short delay
    const timer = setTimeout(() => {
      root.classList.remove("theme-transition-disable");
    }, 100);

    return () => clearTimeout(timer);
  }, [theme, resolvedTheme]);
}
