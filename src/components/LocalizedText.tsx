"use client";

import { useI18n, type StringKey } from "@/i18n";

export function LocalizedText({ id }: { id: StringKey }) {
  const { t } = useI18n();
  return <>{t(id)}</>;
}
