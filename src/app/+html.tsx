import React from 'react';
import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

/**
 * Web-only HTML shell for every statically rendered route. Native ignores this file.
 * Everything here has to be inline: it runs before the JS bundle loads.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#07173F" />

        {/* The app renders in a single scroll container; this keeps body scroll sane. */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: BASE_CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const BASE_CSS = `
:root { color-scheme: dark; }

/* Painted before the bundle loads, so the first frame is not a white flash. */
html, body { background-color: #07173F; }

/* Blueprint grid, deliberately quiet enough to keep text and imagery primary. */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px);
  background-size: 96px 96px;
}

/* Keyboard users need to see where they are; mouse users should not. */
:focus:not(:focus-visible) { outline: none; }
:focus-visible {
  outline: 2px solid #EAFE07;
  outline-offset: 2px;
  border-radius: 4px;
}

::selection { background: #EAFE07; color: #07173F; }

/* Text stays visible while the webfonts download instead of flashing invisible. */
input, textarea { caret-color: #EAFE07; }

/* Every Pressable carries an ARIA role, so one rule gives the whole site
   consistent hover/press feedback without touching 60 components. */
[role="button"], [role="link"] {
  transition: transform 200ms ease, background-color 200ms ease, border-color 200ms ease, opacity 200ms ease;
}
@media (hover: hover) and (pointer: fine) {
  [role="button"]:hover, [role="link"]:hover { opacity: .85; }
}
[role="button"]:active, [role="link"]:active { transform: translateY(1px); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
`;
