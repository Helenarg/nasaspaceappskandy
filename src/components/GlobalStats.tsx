"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { SectionLabel } from "./Elements";
import { LocalizedText as L } from "./LocalizedText";

const metrics = [
  { value: 487, suffix: "K+", label: "home.stats.registrations" },
  { value: 3400, suffix: "+", label: "home.stats.events" },
  { value: 190, suffix: "+", label: "home.stats.countries" },
  { value: 17, suffix: "", label: "home.stats.agencies" },
] as const;

const formatNumber = (value: number) => value.toLocaleString("en-US");

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = element.current;
    if (!node || reduceMotion || !("IntersectionObserver" in window)) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1600, 1);
          const current = Math.round(value * (1 - (1 - progress) ** 3));
          node.textContent = `${formatNumber(current)}${suffix}`;
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion, suffix, value]);

  const formattedValue = `${formatNumber(value)}${suffix}`;

  return (
    <>
      <span className="sr-only">{formattedValue}</span>
      <span ref={element} aria-hidden="true">
        {formattedValue}
      </span>
    </>
  );
}

export function GlobalStats() {
  return (
    <section className="global-stats" aria-labelledby="global-stats-title">
      <span className="stats-pattern" aria-hidden="true" />
      <div className="stats-intro">
        <SectionLabel>
          <L id="home.stats.label" />
        </SectionLabel>
        <h2 id="global-stats-title">
          <L id="home.stats.title" />
        </h2>
        <p>
          <L id="home.stats.description" />
        </p>
      </div>
      <dl className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <dt>
              <L id={metric.label} />
            </dt>
            <dd>
              <CountUp value={metric.value} suffix={metric.suffix} />
            </dd>
          </div>
        ))}
      </dl>
      <div className="stats-source">
        <p>
          <L id="home.stats.note" />
        </p>
        <div>
          <a
            className="text-link"
            href="https://www.spaceappschallenge.org/about/results-and-metrics/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="home.stats.source" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
          <a
            className="text-link"
            href="https://www.spaceappschallenge.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="home.stats.updates" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
