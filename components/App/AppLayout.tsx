import { inter } from "@/styles/fonts";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[var(--color-bg-main)] text-[var(--color-text-main)] font-sans min-h-screen">
        <main className="flex justify-center items-center min-h-screen px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
