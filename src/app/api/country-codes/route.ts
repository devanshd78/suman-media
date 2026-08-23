import { getDb } from "@/lib/db";
import {
  FALLBACK_COUNTRY_CALLING_CODES,
  type CountryCallingCode,
} from "@/lib/country-calling-codes";
import { withApiHandler } from "@/lib/http/handler";
import { methodNotAllowed } from "@/lib/http/method-not-allowed";
import { apiSuccess } from "@/lib/http/responses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withApiHandler(async (_request, { requestId }) => {
  let items: CountryCallingCode[] = FALLBACK_COUNTRY_CALLING_CODES;

  try {
    const storedCountries = await getDb().countryCallingCode.findMany({
      where: { enabled: true },
      orderBy: { name: "asc" },
      select: {
        iso2: true,
        name: true,
        callingCode: true,
        flag: true,
      },
    });

    if (storedCountries.length > 0) items = storedCountries;
  } catch (error) {
    console.warn("Country calling-code table is unavailable; using fallback data", error);
  }

  return apiSuccess({
    requestId,
    data: { items },
  });
});

const unsupportedMethod = methodNotAllowed(["GET"]);
export const POST = unsupportedMethod;
export const PUT = unsupportedMethod;
export const PATCH = unsupportedMethod;
export const DELETE = unsupportedMethod;
export const HEAD = unsupportedMethod;
export const OPTIONS = unsupportedMethod;
