"use client";

import { useParams } from "next/navigation";
import type { Locale } from "./routing";

import en from "../messages/en.json";
import pt from "../messages/pt.json";
import ch from "../messages/ch.json";

const messages = { en, pt, ch };

type Messages = typeof en;
type SectionKey = keyof Messages;

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function useTranslations(section: SectionKey) {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "en";

  const dict: Messages = (messages[locale] ?? messages.en) as Messages;
  const sectionData = dict[section] as Record<string, unknown>;

  function t(key: string): string {
    const val = getNestedValue(sectionData, key);
    return typeof val === "string" ? val : key;
  }

  t.raw = function (key: string): unknown {
    return getNestedValue(sectionData, key);
  };

  return t;
}
