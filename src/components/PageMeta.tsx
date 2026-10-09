import React from 'react';
import { Platform } from 'react-native';
import Head from 'expo-router/head';
import { useI18n } from '../i18n';
import { translateCopy } from '../i18n/copy';

export const SITE_URL = 'https://nasaspaceapps.lk';
const SITE_NAME = 'NASA Space Apps Challenge Sri Lanka';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

type Props = {
  title: string;
  description: string;
  /** Route path, e.g. "/events". Used for canonical + og:url. */
  path: string;
};

/**
 * Per-route <head> tags. Static web export renders these into each route's HTML,
 * so search engines and link previews see real titles instead of one SPA shell.
 * Renders nothing on native.
 */
export default function PageMeta({ title, description, path }: Props) {
  const { lang } = useI18n();
  if (Platform.OS !== 'web') return null;

  const url = `${SITE_URL}${path === '/' ? '' : path}${lang === 'en' ? '' : `?lang=${lang}`}`;
  const displayTitle = translateCopy(title, lang);
  const displayDescription = translateCopy(description, lang);

  return (
    <Head>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Space Apps Kandy — explore, collaborate, create" />
      <meta property="og:locale" content={lang === 'si' ? 'si_LK' : lang === 'ta' ? 'ta_LK' : 'en_LK'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Head>
  );
}
