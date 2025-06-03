import { createTheme } from "@aws-amplify/ui-react";

export const theme = createTheme({
  name: "custom-green-theme",
  tokens: {
    colors: {
      brand: {
        primary: "var(--primary)",
        secondary: "var(--primary-foreground)",
      },
      background: {
        primary: "var(--background)",
        secondary: "var(--secondary)",
      },
      font: {
        primary: "var(--foreground)",
        secondary: "var(--muted-foreground)",
      },
      border: {
        primary: "var(--border)",
      },
    },
    fonts: {
      default: {
        variable: "var(--font-inter)",
        static: "'Inter', sans-serif",
      },
    },
    radii: {
      small: "6px",
      medium: "10px",
      large: "16px",
    },
  },
});

export const containerProps = () => ({
  className: "w-full px-4",
});
