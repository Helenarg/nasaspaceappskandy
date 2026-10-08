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
        <link rel="icon" type="image/svg+xml" sizes="any" href="/kandy-orbit.svg?v=2" />

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

/* Clear lift, arrow travel and image emphasis instead of only opacity changes. */
[data-testid="action-primary"], [data-testid="action-secondary"] { overflow: hidden; }
[data-testid="action-arrow"] { transition: transform 350ms cubic-bezier(.2,.8,.2,1); }
[data-testid="feature-card"] { transition: border-color 350ms ease, background-color 350ms ease; }
@media (hover: hover) and (pointer: fine) {
  [data-testid="action-primary"]:hover, [data-testid="action-secondary"]:hover { transform: translateY(-4px); opacity: 1; }
  [data-testid="action-primary"]:hover [data-testid="action-arrow"], [data-testid="action-secondary"]:hover [data-testid="action-arrow"] { transform: translateX(7px); }
  [data-testid="action-secondary"]:hover { background-color: rgba(46,150,245,.14); border-color: #2E96F5; }
  [data-testid="feature-card"]:hover { border-color: #EAFE07; background-color: rgba(46,150,245,.045); }
}
html[lang="si"] input, html[lang="si"] textarea { font-family: NotoSansSinhala_400Regular, sans-serif !important; letter-spacing: 0 !important; }
html[lang="ta"] input, html[lang="ta"] textarea { font-family: NotoSansTamil_400Regular, sans-serif !important; letter-spacing: 0 !important; }

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
