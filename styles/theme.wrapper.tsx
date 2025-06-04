"use client";

import type React from "react";

import { useThemeTransition } from "@/hooks/useThemeTransition";
import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  useThemeTransition();

  useEffect(() => {
    if (resolvedTheme) {
      document.documentElement.setAttribute(
        "data-amplify-theme",
        resolvedTheme
      );
    }
  }, [resolvedTheme]);

  return <>{children}</>;
}
