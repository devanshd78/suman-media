"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLoadingScreen } from "./site-loading-screen";

const INITIAL_SPLASH_MS = 1250;
const MIN_NAVIGATION_MS = 950;
const MAX_NAVIGATION_MS = 9000;

/**
 * Next's app/loading.tsx handles suspense, while this persistent root overlay
 * also covers prefetched links and normal client-side transitions.
 */
export function PageTransitionLoader() {
  const pathname = usePathname();
  const [requestedLocale, setRequestedLocale] = useState<string | undefined>(undefined);
  const previousPath = useRef(pathname);
  const pendingSince = useRef(0);
  const initialTimer = useRef<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [complete, setComplete] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const finishOverlay = useCallback(() => setVisible(false), []);

  useEffect(() => {
    initialTimer.current = window.setTimeout(() => {
      initialTimer.current = null;
      setComplete(true);
    }, INITIAL_SPLASH_MS);
    return () => {
      if (initialTimer.current !== null) window.clearTimeout(initialTimer.current);
    };
  }, []);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    setRequestedLocale(pathname?.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
    // Programmatic router.push/replace may not originate from an anchor click.
    // Show this same loader for those page changes, too.
    if (!pendingSince.current) {
      if (initialTimer.current !== null) {
        window.clearTimeout(initialTimer.current);
        initialTimer.current = null;
      }
      pendingSince.current = Date.now();
      setTransitionKey((key) => key + 1);
      setComplete(false);
      setVisible(true);
    }
    const remaining = Math.max(0, MIN_NAVIGATION_MS - (Date.now() - pendingSince.current));
    const timer = window.setTimeout(() => {
      pendingSince.current = 0;
      setComplete(true);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const startTransition = () => {
      if (initialTimer.current !== null) {
        window.clearTimeout(initialTimer.current);
        initialTimer.current = null;
      }
      pendingSince.current = Date.now();
      setTransitionKey((key) => key + 1);
      setComplete(false);
      setVisible(true);
    };

    const onLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
      ) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || link.dataset.noGlobalLoader === "true") return;
      if (link.target && link.target !== "_self") return;

      let next: URL;
      try { next = new URL(link.href, window.location.href); }
      catch { return; }

      const current = new URL(window.location.href);
      if (next.origin !== current.origin || !["http:", "https:"].includes(next.protocol)) return;
      if (next.pathname === current.pathname) return;
      if (link.getAttribute("rel")?.split(/\s+/).includes("external")) return;
      setRequestedLocale(next.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    // Popstate covers browser back/forward as well as normal anchor navigation.
    const onPopState = () => {
      setRequestedLocale(window.location.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    document.addEventListener("click", onLinkClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onLinkClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (!visible || complete) return;
    // A broken or aborted route must never trap someone behind the overlay.
    const timer = window.setTimeout(() => {
      pendingSince.current = 0;
      setComplete(true);
    }, MAX_NAVIGATION_MS);
    return () => window.clearTimeout(timer);
  }, [visible, complete, transitionKey]);

  if (!visible) return null;
  return (
    <SiteLoadingScreen
      key={transitionKey}
      label="Loading page"
      locale={requestedLocale}
      complete={complete}
      onFinish={finishOverlay}
    />
  );
}
