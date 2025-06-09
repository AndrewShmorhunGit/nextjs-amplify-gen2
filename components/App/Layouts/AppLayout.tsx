"use client";

import type React from "react";
import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { cn } from "@/styles/utils";

export function AppLayout({
  children,
  websocketUrl,
}: {
  children: React.ReactNode;
  websocketUrl: string;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg-main)]">
      <Header websocketUrl={websocketUrl} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
        <main
          className={cn(
            "flex-1 overflow-y-auto p-6 transition-all duration-300",
            sidebarCollapsed ? "ml-[70px]" : "ml-[220px]"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
