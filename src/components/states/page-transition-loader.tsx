"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLoadingScreen } from "./site-loading-screen";

const INITIAL_SPLASH_MS = 1250;
const MIN_NAVIGATION_MS = 950;
const MAX_NAVIGATION_MS = 20000;

/**
 * Next's app/loading.tsx handles suspense, while this persistent root overlay
 * also covers prefetched links and normal client-side transitions.
 */
export function PageTransitionLoader() {
  const pathname = usePathname();
  const [requestedLocale, setRequestedLocale] = useState<string | undefined>(undefined);
  const previousPath = useRef(pathname);
  const pendingSince = useRef(0);
  const pendingDestination = useRef<string | null>(null);
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
    pendingDestination.current = null;
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

    const onNavigate = (event: Event) => {
      const destination = new URL((event as CustomEvent<string>).detail);
      pendingDestination.current = destination.href;
      setRequestedLocale(destination.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    // Popstate covers browser back/forward as well as normal anchor navigation.
    const onPopState = () => {
      pendingDestination.current = null;
      if (window.location.pathname === previousPath.current) return;
      setRequestedLocale(window.location.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    window.addEventListener("website:navigate", onNavigate);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("website:navigate", onNavigate);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  useEffect(() => {
    if (!visible || complete) return;
    // Recover a stalled client transition with the actual requested document.
    const timer = window.setTimeout(() => {
      pendingSince.current = 0;
      setComplete(true);
      const destination = pendingDestination.current;
      pendingDestination.current = null;
      if (destination && window.location.pathname === previousPath.current) {
        window.location.assign(destination);
      }
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
