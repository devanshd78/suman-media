import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function databasePoolMax(): number {
  const parsed = Number.parseInt(process.env.DATABASE_POOL_MAX ?? "10", 10);
  return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 50) : 10;
}

export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");

  const adapter = new PrismaPg({
    connectionString,
    max: databasePoolMax(),
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 30_000,
  });
  const prisma = new PrismaClient({ adapter });
  globalForPrisma.prisma = prisma;
  return prisma;
}
