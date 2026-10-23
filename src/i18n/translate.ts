import marathi from "../../messages/mr.json";

export type TranslationDictionary = Record<string, string>;
const dictionary: TranslationDictionary = Object.fromEntries(
  Object.entries(marathi).map(([key, value]) => [normalizeMessage(key), value]),
);

const foldedDictionary = Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [key.toLowerCase(), value]));

export function normalizeMessage(text: string) {
  return text.replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}

export function translateText(text: string, locale: string, overrides: TranslationDictionary = {}): string {
  if (locale !== "mr" || !/[a-z]/i.test(text)) return text;
  const key = normalizeMessage(text);
  const translated = overrides[key] ?? dictionary[key] ?? foldedDictionary[key.toLowerCase()];
  if (!translated) {
    if (key.includes(" | ")) return text.split(" | ").map((part) => translateText(part, locale, overrides)).join(" | ");
    // Dates are emitted in this stable format by the news components.
    if (/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(key)) {
      const date = new Date(key + " 12:00:00 GMT");
      if (!Number.isNaN(date.getTime())) return new Intl.DateTimeFormat("mr-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
    }
    const slide = key.match(/^(Go to slide|Show slide|Go to image|Show image) (\d+)$/);
    if (slide) return `चित्र ${slide[2]} पाहा`;
    const discussion = key.match(/^Discuss (.+)$/);
    if (discussion) return `${translateText(discussion[1], locale, overrides)} विषयी चर्चा करा`;
    return text;
  }
  return `${text.match(/^\s*/)?.[0] ?? ""}${translated}${text.match(/\s*$/)?.[0] ?? ""}`;
}

export function graphemes(text: string) {
  return Array.from(new Intl.Segmenter("mr", { granularity: "grapheme" }).segment(text), ({ segment }) => segment);
}
