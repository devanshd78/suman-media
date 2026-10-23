"use client";

import { useWebsiteLocale } from "./localized-content";
import { usePathname } from "next/navigation";
import { localizedPath } from "@/i18n/routing";

export function LanguageSwitcher({ color, onFocus }: { color?: string; onFocus?: () => void }) {
  const locale = useWebsiteLocale();
  const pathname = usePathname();
  return <span className="language-dropdown" style={{ color }} translate="no">
    <select
      aria-label={locale === "mr" ? "संकेतस्थळाची भाषा" : "Website language"}
      value={locale}
      onFocus={onFocus}
      onChange={(event) => {
        if (event.target.value === locale) return;
        window.location.assign(`${localizedPath(pathname, event.target.value)}${window.location.search}${window.location.hash}`);
      }}
    >
      <option value="en" lang="en">English</option>
      <option value="mr" lang="mr">मराठी</option>
    </select>
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>;
}
