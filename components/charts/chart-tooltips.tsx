"use client";

import { useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { Tip } from "./utils";

type Shown = { tip: Tip; x: number; y: number };

/** Shows the tooltip of the mark (any element with data-tip) under the
 *  pointer, tapped, or focused with the keyboard. The charts themselves stay
 *  server-rendered; this only listens. */
export default function ChartTooltips({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<Shown | null>(null);

  function show(target: EventTarget, pointer?: { clientX: number; clientY: number }) {
    const mark = target instanceof Element ? target.closest<HTMLElement>("[data-tip]") : null;
    if (!mark?.dataset.tip || !root.current) {
      setShown(null);
      return;
    }
    const box = root.current.getBoundingClientRect();
    const markBox = mark.getBoundingClientRect();
    // Follow the pointer; for keyboard focus, sit above the middle of the mark.
    setShown({
      tip: JSON.parse(mark.dataset.tip),
      x: (pointer ? pointer.clientX : markBox.left + markBox.width / 2) - box.left,
      y: (pointer ? pointer.clientY : markBox.top) - box.top,
    });
  }

  // Keep the tooltip inside the chart, and flip it below the pointer when
  // there's no room above.
  useLayoutEffect(() => {
    const element = tooltip.current;
    const container = root.current;
    if (!shown || !element || !container) return;
    const half = element.offsetWidth / 2;
    const above = shown.y - element.offsetHeight - 14;
    element.style.left = `${Math.min(Math.max(shown.x, half), container.offsetWidth - half)}px`;
    element.style.top = `${above >= 0 ? above : shown.y + 22}px`;
    element.style.visibility = "visible";
  }, [shown]);

  const onPointer = (event: PointerEvent<HTMLDivElement>) => show(event.target, event);

  return (
    <div
      ref={root}
      className={`relative ${className}`}
      onPointerMove={(event) => event.pointerType === "mouse" && onPointer(event)}
      onPointerDown={(event) => event.pointerType !== "mouse" && onPointer(event)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setShown(null)}
      onFocus={(event) => show(event.target)}
      onBlur={() => setShown(null)}
    >
      {children}
      {shown && (
        // Hidden until the layout effect has placed it. Screen readers already
        // have the same text as the mark's label.
        <div
          ref={tooltip}
          aria-hidden
          style={{ visibility: "hidden" }}
          className="pointer-events-none absolute z-10 w-max max-w-64 -translate-x-1/2 rounded-lg border border-gray-200 bg-(--viz-tooltip) px-3 py-2 shadow-lg shadow-gray-900/10 dark:border-white/10 dark:shadow-black/40"
        >
          <p className="text-xs font-medium text-(--viz-ink-2)">{shown.tip.title}</p>
          <div className="mt-1.5 space-y-1">
            {shown.tip.rows.map((row) => (
              <p key={`${row.label}-${row.value}`} className="flex items-center gap-2">
                {row.color && (
                  <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ background: row.color }} />
                )}
                <span className="text-sm font-semibold text-(--viz-ink) tabular-nums">{row.value}</span>
                <span className="text-xs text-(--viz-ink-2)">{row.label}</span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
