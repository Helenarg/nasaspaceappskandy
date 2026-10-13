"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { useId, useState } from "react";
import { useI18n } from "@/i18n";
import { consentCopy, consentLanguages, consentPdfHref, type ConsentLanguage } from "@/content/consent";
import { site } from "@/content/site";
import { FaqItem } from "@/components/FaqItem";
import { FormSelect } from "@/components/FormSelect";

export function ConsentPanel() {
  const { lang, t } = useI18n();
  const [selectedLanguage, setSelectedLanguage] = useState<ConsentLanguage | null>(null);
  const languageId = useId();
  const downloadLanguage = selectedLanguage ?? lang;
  const copy = consentCopy[lang];
  return (
    <aside className="quiet-note consent-panel" id="consent-letter" lang={lang}>
      <h3>{t("participation.minors.title")}</h3>
      <p>{t("participation.minors.text")}</p>
      <div className="consent-actions">
        <div className="consent-language">
          <label htmlFor={languageId}>{copy.languageLabel}</label>
          <FormSelect
            id={languageId}
            name="consent-language"
            value={downloadLanguage}
            options={consentLanguages}
            getOptionLabel={(value) => {
              const code = consentLanguages.find((language) => language === value);
              return code ? <span lang={code}>{consentCopy[code].languageName}</span> : value;
            }}
            onValueChange={(value) => {
              const code = consentLanguages.find((language) => language === value);
              if (code) setSelectedLanguage(code);
            }}
          />
        </div>
        <a className="white-button" href={consentPdfHref(downloadLanguage)} hrefLang={downloadLanguage} download>
          <span className="button-label">{copy.download}</span>
          <ArrowUpRightIcon size={17} aria-hidden="true" />
        </a>
        <a className="text-link consent-contact" href={`mailto:${site.email}`}>
          <span className="button-label">{t("participation.help")}</span>
          <ArrowUpRightIcon size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="consent-conditions">
        <FaqItem question={copy.conditionsTitle}>
          <ol>
            {copy.conditions.map((condition) => <li key={condition}>{condition}</li>)}
          </ol>
          <a className="text-link" href={site.participantTerms} target="_blank" rel="noopener noreferrer">
            {copy.terms}
          </a>
        </FaqItem>
      </div>
    </aside>
  );
}
