"use client";

import { useThemeToggle } from "../../hooks/useThemeToggle";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <button
      onClick={toggleTheme}
      className="mt-4 rounded px-4 py-2 text-sm font-semibold bg-primary text-button-text hover:bg-primary-dark transition pointer"
    >
      {isDark ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
};
