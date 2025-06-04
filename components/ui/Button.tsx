import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "error" | "outline";
  size?: "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        "transition-all font-semibold uppercase tracking-wider rounded-full",
        size === "lg" && "px-6 py-3 text-base",
        size === "md" && "px-4 py-2 text-sm",
        variant === "primary" &&
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/80",
        variant === "error" &&
          "bg-[var(--destructive)] text-white hover:bg-[var(--destructive)]/80",
        variant === "outline" &&
          "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10",
        className
      )}
    >
      {children}
    </button>
  );
};
