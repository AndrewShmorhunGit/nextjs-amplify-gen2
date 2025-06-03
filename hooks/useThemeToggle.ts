import { useEffect, useState } from "react";

export function useThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    const applyTheme = (mode: "dark" | "light") => {
      root.classList.toggle("dark", mode === "dark");
      root.setAttribute("data-amplify-theme", mode);
      localStorage.setItem("theme", mode);
      setIsDark(mode === "dark");
    };

    if (savedTheme === "dark") {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = isDark ? "light" : "dark";
    const root = window.document.documentElement;
    root.classList.toggle("dark", newMode === "dark");
    root.setAttribute("data-amplify-theme", newMode);
    localStorage.setItem("theme", newMode);
    setIsDark(newMode === "dark");
  };

  return { isDark, toggleTheme };
}
