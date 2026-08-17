import { validateProductionEnv } from "@/lib/env/validate-production-env";

export function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  validateProductionEnv();
  console.info(
    JSON.stringify({
      level: "info",
      event: "server_initialized",
      timestamp: new Date().toISOString(),
    }),
  );
}
