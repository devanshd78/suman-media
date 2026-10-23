import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { localizedPath } from "./routing";
import { translateText, type TranslationDictionary } from "./translate";

const textProps = new Set(["alt", "title", "placeholder", "aria-label", "aria-description", "label", "heading", "description", "eyebrow", "text", "message", "emptyLabel", "loadingLabel"]);

// Localize React content before it renders. No DOM mutation, extra markup, or
// translated form values: identifiers, handlers, refs and submitted data survive.
export function localizeNode(node: ReactNode, locale: string, dictionary: TranslationDictionary): ReactNode {
  if (typeof node === "string") return translateText(node, locale, dictionary);
  if (Array.isArray(node)) return Children.map(node, (child) => localizeNode(child, locale, dictionary));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  if (element.type === "script" || element.type === "style" || element.props.translate === "no" || element.props["data-no-translate"]) return element;
  const props: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(element.props)) {
    if (key === "children") props.children = localizeNode(value as ReactNode, locale, dictionary);
    else if (textProps.has(key) && typeof value === "string") props[key] = translateText(value, locale, dictionary);
    else if (key === "href" && typeof value === "string") props.href = localizedPath(value, locale);
  }
  return cloneElement(element, props);
}

