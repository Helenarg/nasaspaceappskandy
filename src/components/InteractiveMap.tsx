"use client";

import { useRef, useState, type ReactNode } from "react";

type Location = { name: string; country: string; x: number; y: number };
const navigationKeys = new Set([
  "ArrowRight",
  "ArrowLeft",
  "ArrowUp",
  "ArrowDown",
]);

export function InteractiveMap({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const cursor = useRef(0);
  const [location, setLocation] = useState<Location | null>(null);

  function show(marker: Element | null) {
    if (!(marker instanceof SVGElement) || !marker.dataset.eventName) return;

    setLocation({
      name: marker.dataset.eventName,
      country: marker.dataset.country ?? "",
      x: Number(marker.getAttribute("cx")) / 12,
      y: Number(marker.getAttribute("cy")) / 6,
    });
  }

  return (
    <div
      ref={frame}
      className="world-map-frame"
      tabIndex={0}
      role="group"
      aria-label="Global event map. Hover or tap a location to see its event. Use arrow keys to explore locations; Escape closes the label."
      onPointerMove={(event) => {
        if (!(event.target instanceof Element)) return;
        const marker = event.target.closest("[data-event-name]");
        if (marker) show(marker);
        else if (event.pointerType === "mouse") setLocation(null);
      }}
      onClick={(event) => {
        if (event.target instanceof Element) {
          show(event.target.closest("[data-event-name]"));
        }
      }}
      onPointerLeave={() => setLocation(null)}
      onBlur={() => setLocation(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setLocation(null);
          return;
        }
        if (!navigationKeys.has(event.key)) return;

        event.preventDefault();
        const markers = frame.current?.querySelectorAll("[data-event-name]");
        if (!markers?.length) return;

        const direction =
          event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
        cursor.current =
          (cursor.current + direction + markers.length) % markers.length;
        show(markers[cursor.current]);
      }}
    >
      {children}
      {location ? (
        <div
          className="map-event-tooltip"
          role="status"
          style={{
            left: `clamp(110px, ${location.x}%, calc(100% - 110px))`,
            top: `${Math.max(22, location.y)}%`,
          }}
        >
          <span title={`${location.name}, ${location.country}`}>
            <strong>{location.name}</strong>
            {`, ${location.country}`}
          </span>
        </div>
      ) : null}
    </div>
  );
}
