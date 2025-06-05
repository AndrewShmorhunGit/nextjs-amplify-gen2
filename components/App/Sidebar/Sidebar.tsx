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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { signOut } from "aws-amplify/auth";

const navIcons = {
  dashboard: LayoutDashboard,
  orders: ShoppingBag,
  groups: Layers,
  products: Package,
  users: Users,
  settings: Settings,
};

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const pathname = usePathname();
  const params = useParams();
  const { t } = useLocale();
  const lang = params.lang as string;

  const navItems = [
    { key: "dashboard", href: `/${lang}/dashboard` },
    { key: "orders", href: `/${lang}/orders` },
    { key: "groups", href: `/${lang}/groups` },
    { key: "products", href: `/${lang}/products` },
    { key: "users", href: `/${lang}/users` },
    { key: "settings", href: `/${lang}/settings` },
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
        "fixed top-16 left-0 z-10 h-[calc(100vh-4rem)] flex flex-col justify-between transition-all duration-300 border-r border-[var(--color-border)] shadow-sm bg-[var(--color-bg-main)]",
        collapsed ? "w-[70px]" : "w-[220px]"
      )}
    >
      {/* Верхняя часть: кнопка, аватар, навигация */}
      <div>
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="absolute top-2 right-2 z-20 p-1 rounded hover:bg-[var(--color-bg-form)] transition"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Avatar */}
        <div
          className={cn(
            "flex flex-col items-center",
            !collapsed ? "py-10" : "py-16"
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-[var(--color-bg-form)]",
              !collapsed ? "h-20 w-20" : "h-14 w-14"
            )}
          >
            {/* <img
              src="/placeholder.svg?height=80&width=80"
              alt="User Avatar"
              className="h-full w-full object-cover"
            /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-2/3 h-2/3 text-[var(--color-text-light)]"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 00-5 5v1a5 5 0 0010 0V7a5 5 0 00-5-5zm-3 6V7a3 3 0 116 0v1a3 3 0 11-6 0zm-5 9.75A4.75 4.75 0 018.75 13h6.5A4.75 4.75 0 0120 17.75V20a1 1 0 11-2 0v-2.25a2.75 2.75 0 00-2.75-2.75h-6.5A2.75 2.75 0 006 17.75V20a1 1 0 11-2 0v-2.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "mt-6",
            collapsed
              ? "flex flex-col items-center gap-4"
              : "flex flex-col items-center gap-3"
          )}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = navIcons[item.key as keyof typeof navIcons];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group px-4 py-1.5 font-bold uppercase tracking-wide text-[var(--color-text-main)] transition-colors",
                  collapsed
                    ? "text-[var(--color-text-main)]"
                    : "text-center hover:text-[var(--color-primary)]"
                )}
              >
                {collapsed ? (
                  <div className="relative flex items-center justify-center group">
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive && "text-[var(--color-primary)]"
                      )}
                    />
                    <span className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-[var(--color-bg-form)] px-2 py-1 text-xs shadow opacity-0 group-hover:opacity-100 transition-opacity">
                      {t(item.key)}
                    </span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">{t(item.key)}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-full bg-[var(--color-primary)]" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 mt-auto">
        <button
          onClick={handleSignOut}
          className={cn(
            "w-full font-semibold hover:text-[var(--color-primary)] flex items-center justify-center gap-2 cursor-pointer",
            collapsed ? "flex-col" : "flex-row"
          )}
        >
          <LogOut className="h-5 w-5 font-bold" />
          {!collapsed && <span>{t("logout")}</span>}
        </button>
      </div>
    </aside>
  );
};
