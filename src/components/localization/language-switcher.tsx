"use client";

import { useWebsiteLocale } from "./localized-content";
import { usePathname } from "next/navigation";
import { localizedPath } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useWebsiteLocale();
  const pathname = usePathname();
  return <nav className="language-switcher" aria-label={locale === "mr" ? "संकेतस्थळाची भाषा" : "Website language"} translate="no">
    {(["en", "mr"] as const).map((language) => <a
      key={language}
      href={localizedPath(pathname, language)}
      hrefLang={language}
      lang={language}
      aria-current={locale === language ? "true" : undefined}
      onClick={(event) => {
        event.currentTarget.href = `${localizedPath(pathname, language)}${window.location.search}${window.location.hash}`;
      }}
    >{language === "en" ? "English" : "मराठी"}</a>)}
  </nav>;
}
