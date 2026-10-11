"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, domAnimation, MotionConfig, useReducedMotion } from "motion/react";
import { animate, inView } from "motion";

const REVEAL_TARGETS = [
  ".page-intro > .container",
  ".section-heading",
  ".approach-card",
  ".info-card",
  ".news-card",
  ".sponsor-opportunity",
  ".pathway-grid > a",
  ".community-band > div",
  ".hero-copy > *",
  ".footer-top",
].join(", ");

export function MotionSystem({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const controls: ReturnType<typeof animate>[] = [];
    const targets = document.querySelectorAll<HTMLElement>(REVEAL_TARGETS);
    const stop = inView(
      targets,
      (element) => {
        const siblings = element.parentElement
          ? Array.from(element.parentElement.children)
          : [];
        const delay = Math.max(0, siblings.indexOf(element) % 3) * 0.055;
        controls.push(
          animate(
            element,
            { opacity: [0, 1], y: [16, 0] },
            { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
          ),
        );
      },
      { amount: 0.12 },
    );

    return () => {
      stop();
      controls.forEach((control) => control.complete());
    };
  }, [pathname, reduced]);

  useEffect(() => {
    const supportsSmoothScroll = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (reduced || !supportsSmoothScroll) return;

    let disposed = false;
    let destroy: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      const scroll = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -100 },
        prevent: (node) =>
          document.documentElement.dataset.menuOpen === "true" ||
          !!node.closest('[data-lenis-prevent], [role="listbox"], textarea'),
      });
      destroy = () => scroll.destroy();
    });

    return () => {
      disposed = true;
      destroy?.();
    };
  }, [pathname, reduced]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
