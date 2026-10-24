"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useWebsiteLocale } from "./localized-content";
import { usePathname } from "next/navigation";
import { localizedPath } from "@/i18n/routing";

export function LanguageSwitcher({ color, onFocus, className, mobile = false }: { color?: string; onFocus?: () => void; className?: string; mobile?: boolean }) {
  const locale = useWebsiteLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const label = locale === "mr" ? "संकेतस्थळाची भाषा" : "Website language";

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const changeLanguage = (language: string) => {
    setOpen(false);
    if (language === locale) return;
    window.location.assign(`${localizedPath(pathname, language)}${window.location.search}${window.location.hash}`);
  };

  const chevron = <svg aria-hidden="true" viewBox="0 0 12 12" fill="none"><path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

  return <div
    ref={rootRef}
    className={`language-dropdown${mobile ? " language-dropdown-mobile" : ""}`}
    style={{ color }}
    translate="no"
    onPointerEnter={(event) => {
      if (!mobile && event.pointerType === "mouse") { onFocus?.(); setOpen(true); }
    }}
    onPointerLeave={() => { if (!mobile) setOpen(false); }}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }}
  >
    {mobile ? <>
      <select className={className} aria-label={label} value={locale} onFocus={onFocus} onChange={(event) => changeLanguage(event.target.value)}>
        <option value="en" lang="en">English</option>
        <option value="mr" lang="mr">मराठी</option>
      </select>
      {chevron}
    </> : <>
      <button
        ref={triggerRef}
        type="button"
        className={`${className ?? ""} language-dropdown-trigger`}
        aria-label={label}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onFocus={onFocus}
        onClick={(event) => setOpen(event.detail > 0 && event.currentTarget.matches(":hover") ? true : !open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            const last = event.key === "ArrowUp";
            requestAnimationFrame(() => {
              const options = rootRef.current?.querySelectorAll<HTMLButtonElement>(".language-dropdown-option");
              options?.[last ? options.length - 1 : 0]?.focus();
            });
          }
        }}
      >
        <span lang={locale}>{locale === "mr" ? "मराठी" : "English"}</span>
        {chevron}
      </button>
      {open && <div id={menuId} className="language-dropdown-panel">
        <div className="language-dropdown-options" role="group" aria-label={label}>
          {(["en", "mr"] as const).map((language) => <button
            key={language}
            type="button"
            lang={language}
            className="language-dropdown-option"
            aria-pressed={locale === language}
            onClick={() => changeLanguage(language)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                const options = rootRef.current?.querySelectorAll<HTMLButtonElement>(".language-dropdown-option");
                options?.[language === "en" ? 1 : 0]?.focus();
              }
            }}
          >{language === "en" ? "English" : "मराठी"}</button>)}
        </div>
      </div>}
    </>}
  </div>;
}
