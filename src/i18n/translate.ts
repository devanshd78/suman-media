import marathi from "../../messages/mr.json";

export type TranslationDictionary = Record<string, string>;
const dictionary: TranslationDictionary = Object.fromEntries(
  Object.entries(marathi).map(([key, value]) => [normalizeMessage(key), value]),
);

const foldedDictionary = Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [key.toLowerCase(), value]));

export function normalizeMessage(text: string) {
  return text.replace(/[’‘\uFFFD]/g, "'").replace(/\s+/g, " ").trim();
}

export function translateText(text: string, locale: string, overrides: TranslationDictionary = {}): string {
  if (locale !== "mr" || !/[a-z]/i.test(text)) return text;
  const key = normalizeMessage(text);
  const translated = overrides[key] ?? dictionary[key] ?? foldedDictionary[key.toLowerCase()];
  if (!translated) {
    // Compose labels from translated phrases instead of requiring a dictionary
    // entry for every carousel index, title/description pair and button target.
    const t = (value: string) => translateText(value, locale, overrides);
    const number = (value: string) => new Intl.NumberFormat("mr-IN", { useGrouping: false }).format(Number(value));
    if (key.includes(": ")) return key.split(": ").map(t).join(": ");
    const culture = key.match(/^Culture highlight (\d+) of (\d+)$/);
    if (culture) return `कार्यसंस्कृतीतील क्षण ${number(culture[1])}, एकूण ${number(culture[2])}`;
    const position = key.match(/^(\d+) of (\d+)$/);
    if (position) return `${number(position[1])}, एकूण ${number(position[2])}`;
    const event = key.match(/^Suman Entertainment event moment (\d+)$/);
    if (event) return `सुमन एंटरटेनमेंटच्या कार्यक्रमातील क्षण ${number(event[1])}`;
    const highlight = key.match(/^Show highlight (\d+)$/);
    if (highlight) return `ठळक क्षण ${number(highlight[1])} पाहा`;
    const image = key.match(/^(?:Go to slide|Show slide|Go to image|Show image) (\d+)$/);
    if (image) return `चित्र ${number(image[1])} पाहा`;
    const featuredVideo = key.match(/^Featured video (\d+)$/);
    if (featuredVideo) return `निवडक व्हिडिओ ${number(featuredVideo[1])}`;
    const musicCategory = key.match(/^Music category (\d+)$/);
    if (musicCategory) return `संगीत प्रकार ${number(musicCategory[1])}`;
    const personality = key.match(/^Notable personality (\d+)$/);
    if (personality) return `मान्यवर व्यक्ती ${number(personality[1])}`;
    const service = key.match(/^Service (\d+)$/);
    if (service) return `सेवा ${number(service[1])}`;
    const video = key.match(/^Play (.+) YouTube video (\d+)$/);
    if (video) return `${t(video[1])} यांचा यूट्यूब व्हिडिओ ${number(video[2])} पाहा`;
    const youtube = key.match(/^Open (.+) on YouTube$/);
    if (youtube) return `${t(youtube[1])} यूट्यूबवर उघडा`;
    const follow = key.match(/^Follow Suman Media on (.+)$/);
    if (follow) return `${t(follow[1])} वर सुमन मीडियाला फॉलो करा`;
    const action = key.match(/^(Learn more about|Open|Show|Play|Read) (.+)$/);
    if (action) {
      const target = t(action[2]);
      switch (action[1]) {
        case "Learn more about": return `${target} विषयी अधिक जाणून घ्या`;
        case "Open": return `${target} उघडा`;
        case "Read": return `${target} वाचा`;
        default: return `${target} पाहा`;
      }
    }
    const menu = key.match(/^(.+) menu$/);
    if (menu) return `${t(menu[1])} मेनू`;
    const content = key.match(/^(.+) content$/);
    if (content) return `${t(content[1])} आशय`;
    if (key.includes(" | ")) return text.split(" | ").map((part) => translateText(part, locale, overrides)).join(" | ");
    // Dates are emitted in this stable format by the news components.
    if (/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(key)) {
      const date = new Date(key + " 12:00:00 GMT");
      if (!Number.isNaN(date.getTime())) return new Intl.DateTimeFormat("mr-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(date);
    }
    const discussion = key.match(/^Discuss (.+)$/);
    if (discussion) return `${translateText(discussion[1], locale, overrides)} विषयी चर्चा करा`;
    return text;
  }
  return `${text.match(/^\s*/)?.[0] ?? ""}${translated}${text.match(/\s*$/)?.[0] ?? ""}`;
}

export function graphemes(text: string) {
  return Array.from(new Intl.Segmenter("mr", { granularity: "grapheme" }).segment(text), ({ segment }) => segment);
}
