import "dotenv/config";
import pg from "pg";

type RestCountry = {
  cca2?: string;
  flag?: string;
  name?: { common?: string };
  idd?: { root?: string; suffixes?: string[] };
};

type SeedCountry = {
  iso2: string;
  name: string;
  callingCode: string;
  flag: string;
};

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag";

function callingCodeFor(country: RestCountry): string | null {
  const root = country.idd?.root?.trim();
  if (!root) return null;

  // +1 and +7 are complete shared numbering-plan codes. Other API roots are
  // combined with their first suffix (for example +9 and 1 becomes +91).
  if (root === "+1" || root === "+7") return root;

  const suffix = country.idd?.suffixes?.find(Boolean)?.trim() ?? "";
  return `${root}${suffix}`;
}

function normalizeCountries(input: RestCountry[]): SeedCountry[] {
  const countries = input.flatMap((country) => {
    const iso2 = country.cca2?.trim().toUpperCase();
    const name = country.name?.common?.trim();
    const callingCode = callingCodeFor(country);

    if (!iso2 || !name || !callingCode) return [];

    return [
      {
        iso2,
        name,
        callingCode,
        flag: country.flag?.trim() || "🌐",
      },
    ];
  });

  return countries.sort((left, right) => left.name.localeCompare(right.name));
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");

  const response = await fetch(REST_COUNTRIES_URL, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`Country source returned HTTP ${response.status}`);
  }

  const countries = normalizeCountries((await response.json()) as RestCountry[]);
  if (countries.length < 200) {
    throw new Error(`Country source returned only ${countries.length} usable records`);
  }

  const pool = new pg.Pool({ connectionString, max: 1 });
  const force = process.argv.includes("--force");

  try {
    const existing = await pool.query<{ count: string }>(
      'SELECT COUNT(*)::text AS count FROM "CountryCallingCode"',
    );
    if (!force && Number(existing.rows[0]?.count ?? 0) > 0) {
      console.log(
        "Country calling codes are already seeded. Use --force to refresh them.",
      );
      return;
    }

    await pool.query("BEGIN");
    for (const country of countries) {
      await pool.query(
        `INSERT INTO "CountryCallingCode"
          ("iso2", "name", "callingCode", "flag", "enabled", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
         ON CONFLICT ("iso2") DO UPDATE SET
          "name" = EXCLUDED."name",
          "callingCode" = EXCLUDED."callingCode",
          "flag" = EXCLUDED."flag",
          "enabled" = true,
          "updatedAt" = CURRENT_TIMESTAMP`,
        [country.iso2, country.name, country.callingCode, country.flag],
      );
    }
    await pool.query("COMMIT");
    console.log(`Seeded ${countries.length} country calling codes.`);
  } catch (error) {
    await pool.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
