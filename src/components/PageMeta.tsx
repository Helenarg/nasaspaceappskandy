import React from 'react';
import { Platform } from 'react-native';
import Head from 'expo-router/head';

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
  if (Platform.OS !== 'web') return null;

  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Head>
  );
}
