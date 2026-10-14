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
    const hasSectionNavigation = pathname === "/sponsors-and-partners";
    if (reduced || (!supportsSmoothScroll && !hasSectionNavigation)) return;

    let disposed = false;
    let destroy: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      const scroll = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: supportsSmoothScroll,
        syncTouch: false,
        anchors: { offset: -100 },
        prevent: (node) =>
          document.documentElement.dataset.menuOpen === "true" ||
          !!node.closest('[data-lenis-prevent], [role="listbox"], textarea'),
      });
      const sectionNav = hasSectionNavigation
        ? document.querySelector<HTMLElement>(".support-section-nav")
        : null;
      const onSectionClick = (event: MouseEvent) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
        if (!link || !sectionNav?.contains(link)) return;
        const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
        if (!target) return;
        event.preventDefault();
        // Prevent the generic Lenis anchor handler from starting a second animation.
        event.stopPropagation();
        if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
        scroll.scrollTo(target, {
          offset: -(parseFloat(getComputedStyle(target).scrollMarginTop) || 0),
          duration: 0.5,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            const previousTabIndex = target.getAttribute("tabindex");
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
            if (previousTabIndex === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", previousTabIndex);
          },
        });
      };
      sectionNav?.addEventListener("click", onSectionClick);
      destroy = () => {
        sectionNav?.removeEventListener("click", onSectionClick);
        scroll.destroy();
      };
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
