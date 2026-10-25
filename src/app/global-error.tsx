"use client";

import { useEffect, useSyncExternalStore } from "react";
import { translateText } from "@/i18n/translate";

const subscribe = () => () => {};
const browserLocale = () => window.location.pathname.startsWith("/en") ? "en" : "mr";
const serverLocale = () => "mr";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // The root provider can itself have failed, so this boundary reads the URL.
  const locale = useSyncExternalStore(subscribe, browserLocale, serverLocale);
  const t = (text: string) => translateText(text, locale);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={locale}>
      <body>
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold">{t("The website could not be loaded")}</h1>
            <p className="mt-3 text-zinc-600">{t("Please reload the application.")}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-[0.25rem] bg-zinc-950 px-4 py-2 text-white"
            >
              {t("Reload")}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
