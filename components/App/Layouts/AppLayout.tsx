"use client";

import type React from "react";
import { useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import { cn } from "@/styles/utils";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen flex-col bg-[var(--color-bg-main)]">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar collapsed={sidebarCollapsed} />
        <main
          className={cn(
            "flex-1 overflow-y-auto p-6 transition-all duration-200",
            sidebarCollapsed ? "ml-[60px]" : "ml-[200px]"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
