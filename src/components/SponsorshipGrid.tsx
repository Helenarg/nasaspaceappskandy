"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Align only the static summaries. Expanded benefits never set a neighbouring card's height.
export function SponsorshipGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".support-package"));
    const selectors = [".package-heading", ".package-price", ".package-highlights"];
    const sections = cards.map((card) => selectors.map((selector) => card.querySelector<HTMLElement>(selector)!));
    let frame = 0;

    function alignSummaries() {
      const rows = new Map<number, number[]>();
      cards.forEach((card, index) => {
        const top = card.offsetTop;
        rows.set(top, [...(rows.get(top) ?? []), index]);
      });
      // Read every intrinsic section height before writing the grid tracks.
      const heights = sections.map((parts) => parts.map((part) => part.getBoundingClientRect().height));
      for (const indices of rows.values()) {
        const tracks = selectors.map((_, part) => Math.max(...indices.map((index) => heights[index][part])));
        for (const index of indices) {
          cards[index].style.setProperty("--package-summary-rows", tracks.map((height) => `${height}px`).join(" "));
        }
      }
    }

    alignSummaries();
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(alignSummaries);
    });
    sections.flat().forEach((part) => observer.observe(part));
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="support-package-grid" ref={ref}>{children}</div>;
}
