"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteLoadingScreen } from "./site-loading-screen";

const INITIAL_SPLASH_MS = 250;
const NAVIGATION_DEBOUNCE_MS = 260;
const MAX_NAVIGATION_MS = 8000;

/**
 * High-performance page transition loader.
 * Debounces instant/prefetched transitions so fast navigations never suffer
 * full-screen blocking delay, while still providing feedback on slower network loads.
 */
export function PageTransitionLoader() {
  const pathname = usePathname();
  const [requestedLocale, setRequestedLocale] = useState<string | undefined>(undefined);
  const previousPath = useRef(pathname);
  const pendingSince = useRef(0);
  const pendingDestination = useRef<string | null>(null);
  const initialTimer = useRef<number | null>(null);
  const debounceTimer = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [complete, setComplete] = useState(false);
  const [transitionKey, setTransitionKey] = useState(0);

  const finishOverlay = useCallback(() => {
    setVisible(false);
  }, []);

  // Initial visit splash
  useEffect(() => {
    const hasSeenSplash = typeof sessionStorage !== "undefined" && sessionStorage.getItem("site_splash_seen");
    if (hasSeenSplash) {
      return;
    }
    try {
      sessionStorage.setItem("site_splash_seen", "1");
    } catch {
      // Ignore storage errors in private browsing modes
    }

    const animFrame = window.requestAnimationFrame(() => {
      setVisible(true);
      setComplete(false);
    });

    initialTimer.current = window.setTimeout(() => {
      initialTimer.current = null;
      setComplete(true);
      setVisible(false);
    }, INITIAL_SPLASH_MS);

    return () => {
      window.cancelAnimationFrame(animFrame);
      if (initialTimer.current !== null) window.clearTimeout(initialTimer.current);
    };
  }, []);

  // Route change listener
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    pendingDestination.current = null;
    setRequestedLocale(pathname?.match(/^\/(en|mr)(?:\/|$)/)?.[1]);

    if (debounceTimer.current !== null) {
      window.clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }

    pendingSince.current = 0;
    // Route has mounted: immediately dismiss transition overlay
    setComplete(true);
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const startTransition = () => {
      if (initialTimer.current !== null) {
        window.clearTimeout(initialTimer.current);
        initialTimer.current = null;
      }
      if (debounceTimer.current !== null) {
        window.clearTimeout(debounceTimer.current);
      }

      pendingSince.current = Date.now();
      // Debounce: only show overlay if navigation takes longer than NAVIGATION_DEBOUNCE_MS
      debounceTimer.current = window.setTimeout(() => {
        debounceTimer.current = null;
        setTransitionKey((key) => key + 1);
        setComplete(false);
        setVisible(true);
      }, NAVIGATION_DEBOUNCE_MS);
    };

    const onNavigate = (event: Event) => {
      const destination = new URL((event as CustomEvent<string>).detail);
      pendingDestination.current = destination.href;
      setRequestedLocale(destination.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    const onPopState = () => {
      pendingDestination.current = null;
      if (window.location.pathname === previousPath.current) return;
      setRequestedLocale(window.location.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
      startTransition();
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor || !anchor.href) return;
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("rel")?.includes("external") ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }
      try {
        const destination = new URL(anchor.href, window.location.href);
        if (destination.origin !== window.location.origin) return;
        if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
        pendingDestination.current = destination.href;
        setRequestedLocale(destination.pathname.match(/^\/(en|mr)(?:\/|$)/)?.[1]);
        startTransition();
      } catch {
        // Ignore invalid URL parsing
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("website:navigate", onNavigate);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("website:navigate", onNavigate);
      window.removeEventListener("popstate", onPopState);
      if (debounceTimer.current !== null) window.clearTimeout(debounceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!visible || complete) return;
    // Safety recovery if a transition hangs
    const timer = window.setTimeout(() => {
      pendingSince.current = 0;
      setComplete(true);
      setVisible(false);
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
