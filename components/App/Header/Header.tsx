"use client";

import { useEffect, useState } from "react";
import { Search, Clock, Users } from "lucide-react";
import { useLocale } from "@/providers/locale.provider";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { ShieldLogo } from "@/components/Logos/ShieldLogo";
import { useConnectionCount } from "@/hooks/useConnectionCount";

export function Header({ websocketUrl }: { websocketUrl: string }) {
  const { locale } = useLocale();
  const dateLocale = locale === "ru" ? ru : enUS;
  const { count, isConnected } = useConnectionCount(websocketUrl);

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const dayName = capitalize(format(now, "EEEE", { locale: dateLocale }));
  const rawMonth = format(now, "MMMM", { locale: dateLocale }).slice(0, 3);
  const day = format(now, "dd");
  const year = format(now, "yyyy");

  const dateFormatted = `${day} ${capitalize(rawMonth)} ${year}`;
  const timeFormatted = format(now, "HH:mm");

  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-bg-main)]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        {/* Logo + Search */}
        <div className="flex items-center gap-10">
          <div className="flex items-center">
            <ShieldLogo />

            <span className="ml-2 text-lg font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              Inventory
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-light)]" />
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-[300px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] pl-10 pr-4 text-sm text-[var(--color-text-main)] focus:border-[var(--color-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Date + Clock + Server */}
        <div className="flex items-center gap-6">
          <div className="text-right text-sm">
            <div className="font-medium text-[var(--color-text-main)]">
              {dayName}
            </div>
            <div className="text-[var(--color-text-light)]">
              {dateFormatted}
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm items-center">
            <Users className="h-4 w-4 text-[var(--color-primary)]" />
            <span
              className={
                isConnected
                  ? "text-[var(--color-text-main)]"
                  : "text-[var(--color-text-error)]"
              }
            >
              {isConnected ? `${count} online` : "Disconnected"}
            </span>
            <Clock className="h-4 w-4 text-[var(--color-primary)]" />
            <span className="text-[var(--color-text-main)] font-semibold">
              {timeFormatted}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
