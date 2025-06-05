"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { cn } from "@/styles/utils";
import { useLocale } from "@/providers/locale.provider";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  Package,
  Layers,
  LogOut,
} from "lucide-react";
import { signOut } from "aws-amplify/auth";

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const { t } = useLocale();
  const lang = params.lang as string;

  const navItems = [
    {
      name: t("dashboard"),
      href: `/${lang}/dashboard`,
      icon: LayoutDashboard,
    },
    {
      name: t("orders"),
      href: `/${lang}/orders`,
      icon: ShoppingBag,
    },
    {
      name: t("groups"),
      href: `/${lang}/groups`,
      icon: Layers,
    },
    {
      name: t("products"),
      href: `/${lang}/products`,
      icon: Package,
    },
    {
      name: t("users"),
      href: `/${lang}/users`,
      icon: Users,
    },
    {
      name: t("settings"),
      href: `/${lang}/settings`,
      icon: Settings,
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-10 flex h-[calc(100vh-4rem)] flex-col justify-between border-r border-[var(--color-border)] bg-[var(--color-bg-main)] transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[200px]"
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[var(--color-primary)]">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
            <button className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <Settings className="h-3 w-3" />
            </button>
          </div>
        </div>
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-main)] hover:bg-[var(--color-bg-form)] hover:text-[var(--color-primary)]"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={handleSignOut}
          className={cn(
            "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-[var(--color-text-main)] hover:bg-[var(--color-bg-form)] hover:text-[var(--color-primary)]",
            collapsed && "justify-center"
          )}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-2")} />
          {!collapsed && <span>{t("logout")}</span>}
        </button>
      </div>
    </aside>
  );
}
