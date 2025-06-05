"use client";

import { Search } from "lucide-react";

import { useLocale } from "@/providers/locale.provider";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher";

export function Header() {
  const { locale } = useLocale();
  const currentDate = new Date();

  // Format date based on locale
  const dateLocale = locale === "ru" ? ru : enUS;
  const dayName = format(currentDate, "EEEE", { locale: dateLocale });
  const dateFormatted = format(currentDate, "dd MMM, yyyy", {
    locale: dateLocale,
  });
  const timeFormatted = format(currentDate, "HH:mm", { locale: dateLocale });

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-main)] px-4">
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-primary)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
              <path d="M1 21h22" />
              <path d="M12 7v8" />
              <path d="m9 11 3-3 3 3" />
            </svg>
          </div>
          <span className="ml-2 text-lg font-semibold uppercase tracking-wider text-[var(--color-primary)]">
            Inventory
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-light)]" />
          <input
            type="text"
            placeholder="Поиск"
            className="h-10 w-[300px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] pl-10 pr-4 text-sm text-[var(--color-text-main)] focus:border-[var(--color-primary)] focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mr-32">
        <div className="text-right text-sm">
          <div className="font-medium text-[var(--color-text-main)]">
            {dayName}
          </div>
          <div className="text-[var(--color-text-light)]">{dateFormatted}</div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-sm font-medium text-white">
          {timeFormatted}
        </div>
        {/* <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div> */}
      </div>
    </header>
  );
}
