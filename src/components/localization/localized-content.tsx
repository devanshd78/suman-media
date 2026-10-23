"use client";

import { createContext, useContext, type ReactNode } from "react";
import { localizeNode } from "@/i18n/localize-node";
import { translateText, type TranslationDictionary } from "@/i18n/translate";

const TranslationContext = createContext<{ locale: string; translations: TranslationDictionary } | null>(null);

export function TranslationProvider({ children, locale, translations = {} }: { children: ReactNode; locale: string; translations?: TranslationDictionary }) {
  return <TranslationContext.Provider value={{ locale, translations }}>{children}</TranslationContext.Provider>;
}

function useTranslationContext() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("TranslationProvider is required for website content");
  return context;
}

export function useWebsiteLocale() {
  return useTranslationContext().locale;
}

export function useTextTranslation() {
  const { locale, translations: overrides } = useTranslationContext();
  return (text: string) => translateText(text, locale, overrides);
}

export function LocalizedContent({ children }: { children: ReactNode }) {
  const { locale, translations: dictionary } = useTranslationContext();
  return localizeNode(children, locale, dictionary);
}
