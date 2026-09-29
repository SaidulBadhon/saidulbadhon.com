import { Fragment, type CSSProperties } from "react";
import { linearScale, seriesByKey, tipProps, type Series, type Tip } from "./utils";

type Point = {
  series: string;
  value: number;
  /** A value printed beside the dot. Label sparingly: the one that matters. */
  label?: string;
  labelPosition?: "above" | "below";
  /** Moves the dot up (negative) or down in pixels, so near-equal values
   *  don't hide each other. */
  nudge?: number;
  /** Replaces the default tooltip. */
  tip?: Tip;
};

// Rows are 64px tall with the dots on the middle line.
const MIDDLE = 32;
const LABEL_GAP = 8;

type Row = {
  label: string;
  sublabel?: string;
  /** Drawn in order, so the last one sits on top where dots overlap. */
  points: Point[];
  /** Join the lowest and highest dots, to show a change. */
  connect?: boolean;
};

type Props = {
  series: Series[];
  rows: Row[];
  domain: [number, number];
  ticks: number[];
  format: (value: number) => string;
  labelWidth?: string;
};

// Dots are inset from the ends of the track so none are cut in half.
const at = (fraction: number) => `calc(10px + (100% - 20px) * ${fraction})`;

/** Dots on a shared axis, one row per category. With `connect`, a dumbbell. */
export default function DotPlot({ series, rows, domain, ticks, format, labelWidth = "9rem" }: Props) {
  const scale = linearScale(domain);

  return (
    <div
      className="grid sm:grid-cols-[var(--label-width)_1fr] sm:gap-x-5"
      style={{ "--label-width": labelWidth } as CSSProperties}
    >
      {rows.map((row) => {
        const positions = row.points.map((point) => scale(point.value));
        return (
          <Fragment key={row.label}>
            <p className="mt-3 text-sm leading-snug font-medium text-(--viz-ink) sm:mt-0 sm:self-center">
              {row.label}
              {row.sublabel && (
                <span className="block text-xs font-normal text-(--viz-muted)">{row.sublabel}</span>
              )}
            </p>
            <div className="relative h-16">
              <Gridlines ticks={ticks.map(scale)} />
              <div className="absolute inset-x-0 top-8 h-px bg-(--viz-grid)" />
              {row.connect && (
                <div
                  className="absolute top-[31px] h-0.5 rounded-full bg-(--viz-axis)"
                  style={{
                    left: at(Math.min(...positions)),
                    width: `calc((100% - 20px) * ${Math.max(...positions) - Math.min(...positions)})`,
                  }}
                />
              )}
              {row.points.map((point, index) => {
                const item = seriesByKey(series, point.series);
                const tip = point.tip ?? {
                  title: row.label,
                  rows: [{ value: format(point.value), label: item.label, color: item.color }],
                };
                const y = MIDDLE + (point.nudge ?? 0);
                return (
                  <Fragment key={point.series}>
                    {/* A 24px target around a 10px dot, ringed in the surface
                        colour so overlapping dots stay distinct. */}
                    <span
                      {...tipProps(tip)}
                      className="viz-hit absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                      style={{ left: at(positions[index]), top: y }}
                    >
                      <span
                        className="viz-mark size-2.5 rounded-full shadow-[0_0_0_2px_var(--viz-surface)]"
                        style={{ background: item.color }}
                      />
                    </span>
                    {point.label && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -translate-x-1/2 text-xs font-medium whitespace-nowrap text-(--viz-ink) tabular-nums"
                        style={{
                          left: at(positions[index]),
                          ...(point.labelPosition === "below"
                            ? { top: y + LABEL_GAP }
                            : { bottom: 2 * MIDDLE - y + LABEL_GAP }),
                        }}
                      >
                        {point.label}
                      </span>
                    )}
                  </Fragment>
                );
              })}
            </div>
          </Fragment>
        );
      })}

      <div aria-hidden className="relative h-5 sm:col-start-2">
        {ticks.map((tick) => (
          <span
            key={tick}
            className="absolute top-1 -translate-x-1/2 text-[11px] text-(--viz-muted) tabular-nums"
            style={{ left: at(scale(tick)) }}
          >
            {format(tick)}
          </span>
        ))}
      </div>
    </div>
  );
}

function Gridlines({ ticks }: { ticks: number[] }) {
  return ticks.map((tick) => (
    <div
      key={tick}
      aria-hidden
      className="absolute inset-y-0 w-px bg-(--viz-grid)"
      style={{ left: at(tick) }}
    />
  ));
}
