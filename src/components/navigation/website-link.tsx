"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

/** Start the overlay only when Next accepts a navigation, after click/drag guards. */
export default function WebsiteLink({ onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} onNavigate={(event) => {
    let cancelled = false;
    onNavigate?.({ preventDefault() { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    const href = typeof props.href === "string" ? props.href : props.href.pathname;
    if (!href) return;
    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
    window.dispatchEvent(new CustomEvent("website:navigate", { detail: destination.href }));
  }} />;
}
