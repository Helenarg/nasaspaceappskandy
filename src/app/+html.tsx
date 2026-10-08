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
        <meta name="theme-color" content="#050912" />

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
html, body { background-color: #050912; }

/* Starfield: two faint nebula washes plus a static star layer, per the design system. */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.07) 0%, transparent 42%),
    radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.06) 0%, transparent 42%),
    radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.65) 50%, transparent 100%),
    radial-gradient(1px 1px at 37% 62%, rgba(255,255,255,0.45) 50%, transparent 100%),
    radial-gradient(1.4px 1.4px at 68% 22%, rgba(255,255,255,0.55) 50%, transparent 100%),
    radial-gradient(1px 1px at 84% 48%, rgba(255,255,255,0.40) 50%, transparent 100%),
    radial-gradient(1px 1px at 52% 84%, rgba(255,255,255,0.35) 50%, transparent 100%),
    radial-gradient(1.2px 1.2px at 26% 74%, rgba(255,255,255,0.30) 50%, transparent 100%);
  background-repeat: no-repeat, no-repeat, repeat, repeat, repeat, repeat, repeat, repeat;
  background-size: 100% 100%, 100% 100%, 340px 340px, 420px 420px, 500px 500px, 380px 380px, 460px 460px, 520px 520px;
}

/* Keyboard users need to see where they are; mouse users should not. */
:focus:not(:focus-visible) { outline: none; }
:focus-visible {
  outline: 2px solid #00E5FF;
  outline-offset: 2px;
  border-radius: 4px;
}

::selection { background: rgba(0, 229, 255, 0.3); color: #fff; }

/* Text stays visible while the webfonts download instead of flashing invisible. */
@font-face { font-display: swap; }

/* Every Pressable carries an ARIA role, so one rule gives the whole site
   consistent hover/press feedback without touching 60 components. */
[role="button"], [role="link"] {
  transition: transform 140ms ease, filter 140ms ease, opacity 140ms ease;
}
@media (hover: hover) and (pointer: fine) {
  [role="button"]:hover, [role="link"]:hover { filter: brightness(1.14); }
}
[role="button"]:active, [role="link"]:active { transform: scale(0.985); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
`;
