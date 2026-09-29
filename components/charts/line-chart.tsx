import { Fragment, type ReactNode } from "react";
import { linearScale, logScale, percent, tipProps, type Series, type Tip } from "./utils";

type Point = {
  x: number;
  y: number;
  /** What the point is, e.g. an effort level. */
  name: string;
};

/** Which side of a point its label sits on. */
type Placement = "right" | "left" | "above" | "below" | "above-left" | "below-right";

type Axis = {
  domain: [number, number];
  ticks: number[];
  format: (value: number) => string;
  title: string;
  log?: boolean;
};

type Props = {
  series: Series[];
  points: Record<string, Point[]>;
  x: Axis;
  y: Axis;
  /** Names each line at its last point. */
  endLabels?: Record<string, Placement>;
  /** Labels every point of one series with its name. */
  pointLabels?: { series: string; placement: Placement };
  /** A point's tooltip. Its first row gets the line's colour as a key. */
  describe: (series: Series, point: Point) => Tip;
};

const offset: Record<Placement, string> = {
  right: "translate(10px, -50%)",
  left: "translate(calc(-100% - 10px), -50%)",
  above: "translate(-50%, calc(-100% - 9px))",
  below: "translate(-50%, 9px)",
  "above-left": "translate(calc(-100% - 5px), calc(-100% - 5px))",
  "below-right": "translate(6px, 5px)",
};

/** Lines through points on two axes; here, each point one effort level of a
 *  model. The lines are SVG stretched to fit, the dots and labels HTML on
 *  top, so the text stays the same size on every screen. */
export default function LineChart({ series, points, x, y, endLabels = {}, pointLabels, describe }: Props) {
  const scaleX = (x.log ? logScale : linearScale)(x.domain);
  const scaleY = linearScale(y.domain);
  const left = (point: Point) => percent(scaleX(point.x));
  const top = (point: Point) => percent(1 - scaleY(point.y));

  return (
    <div>
      <p className="mb-3 text-xs text-(--viz-muted)">{y.title}</p>
      <div className="grid grid-cols-[2rem_1fr]">
        <div aria-hidden className="relative">
          {y.ticks.map((tick) => (
            <span
              key={tick}
              className="absolute right-2 -translate-y-1/2 text-[11px] text-(--viz-muted) tabular-nums"
              style={{ top: percent(1 - scaleY(tick)) }}
            >
              {y.format(tick)}
            </span>
          ))}
        </div>

        <div className="relative h-72 border-b border-l border-(--viz-axis) sm:h-80">
          {y.ticks.map((tick) => (
            <div
              key={tick}
              aria-hidden
              className="absolute inset-x-0 h-px bg-(--viz-grid)"
              style={{ top: percent(1 - scaleY(tick)) }}
            />
          ))}
          {x.ticks.map((tick) => (
            <div
              key={tick}
              aria-hidden
              className="absolute inset-y-0 w-px bg-(--viz-grid)"
              style={{ left: percent(scaleX(tick)) }}
            />
          ))}

          <svg
            aria-hidden
            className="absolute inset-0 size-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {series.map((item) => (
              <polyline
                key={item.key}
                points={points[item.key]
                  .map((point) => `${scaleX(point.x) * 100},${(1 - scaleY(point.y)) * 100}`)
                  .join(" ")}
                fill="none"
                stroke={item.color}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {series.map((item) => (
            <Fragment key={item.key}>
              {points[item.key].map((point) => (
                // A 24px target around an 8px dot with a ring in the surface colour.
                <span
                  key={point.name}
                  {...tipProps(keyed(describe(item, point), item.color))}
                  className="viz-hit absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                  style={{ left: left(point), top: top(point) }}
                >
                  <span
                    className="viz-mark size-2 rounded-full shadow-[0_0_0_2px_var(--viz-surface)]"
                    style={{ background: item.color }}
                  />
                </span>
              ))}
            </Fragment>
          ))}

          {pointLabels &&
            points[pointLabels.series].map((point) => (
              <Label key={point.name} point={point} placement={pointLabels.placement} left={left} top={top}>
                <span className="text-[11px] text-(--viz-ink-2)">{point.name}</span>
              </Label>
            ))}

          {series.map((item) => {
            const placement = endLabels[item.key];
            const last = points[item.key].at(-1);
            if (!placement || !last) return null;
            return (
              <Label key={item.key} point={last} placement={placement} left={left} top={top}>
                <span className="text-xs font-semibold text-(--viz-ink)">{item.label}</span>
              </Label>
            );
          })}
        </div>

        <div aria-hidden className="relative col-start-2 h-6">
          {x.ticks.map((tick) => (
            <span
              key={tick}
              className="absolute top-1.5 -translate-x-1/2 text-[11px] text-(--viz-muted) tabular-nums"
              style={{ left: percent(scaleX(tick)) }}
            >
              {x.format(tick)}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-1 text-right text-xs text-(--viz-muted)">{x.title}</p>
    </div>
  );
}

function Label({
  point,
  placement,
  left,
  top,
  children,
}: {
  point: Point;
  placement: Placement;
  left: (point: Point) => string;
  top: (point: Point) => string;
  children: ReactNode;
}) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute whitespace-nowrap"
      style={{ left: left(point), top: top(point), transform: offset[placement] }}
    >
      {children}
    </span>
  );
}

/** Keys the first row with the line's colour. */
function keyed(tip: Tip, color: string): Tip {
  const [first, ...rest] = tip.rows;
  return { ...tip, rows: first ? [{ ...first, color }, ...rest] : [] };
}
