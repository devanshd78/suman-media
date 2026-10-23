import "server-only";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { getEditorialTranslations } from "@/i18n/server";
import { localizeNode } from "@/i18n/localize-node";

export async function LocalizedContent({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const dictionary = locale === "mr" ? await getEditorialTranslations() : {};
  return localizeNode(children, locale, dictionary);
}
