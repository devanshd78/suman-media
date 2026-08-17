"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold">The website could not be loaded</h1>
            <p className="mt-3 text-zinc-600">Please reload the application.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-white"
            >
              Reload
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
