import { Fragment, type CSSProperties } from "react";
import { tipProps, type Series } from "./utils";

type Row = { label: string; sublabel?: string; values: Record<string, number> };

type Props = {
  /** The parts each bar is split into, from the baseline out. */
  parts: Series[];
  rows: Row[];
  /** The total that fills the track. */
  max: number;
  format: (value: number) => string;
  /** Parts whose value is printed inside the segment, on wide enough charts. */
  labelled?: { part: string; ink: string }[];
  labelRoom?: string;
  labelWidth?: string;
};

/** Horizontal stacked bars, one per row, with the total at the end. */
export default function StackedBarChart({
  parts,
  rows,
  max,
  format,
  labelled = [],
  labelRoom = "3.5rem",
  labelWidth = "10rem",
}: Props) {
  return (
    <div
      className="@container grid gap-y-6 sm:grid-cols-[var(--label-width)_1fr] sm:gap-x-5"
      style={{ "--label-width": labelWidth, "--label-room": labelRoom } as CSSProperties}
    >
      {rows.map((row) => {
        const total = parts.reduce((sum, part) => sum + (row.values[part.key] ?? 0), 0);
        const name = row.sublabel ? `${row.label}, ${row.sublabel.toLowerCase()}` : row.label;
        return (
          <Fragment key={name}>
            <p className="text-sm leading-snug font-medium text-(--viz-ink)">
              {row.label}
              {row.sublabel && (
                <span className="block text-xs font-normal text-(--viz-muted)">{row.sublabel}</span>
              )}
            </p>
            <div className="-mt-4 flex h-5.5 items-center border-l border-(--viz-axis) sm:mt-0">
              {/* Segments sit 2px apart, so each reads on its own. */}
              <div
                className="flex h-full shrink-0 gap-0.5"
                style={{ width: `calc((100% - var(--label-room)) * ${total / max})` }}
              >
                {parts.map((part, index) => {
                  const value = row.values[part.key] ?? 0;
                  const inside = labelled.find((item) => item.part === part.key);
                  const tip = {
                    title: name,
                    rows: [
                      {
                        value: format(value),
                        label: `${part.label}, ${Math.round((value / total) * 100)}% of the total`,
                        color: part.color,
                      },
                    ],
                  };
                  return (
                    <div
                      key={part.key}
                      {...tipProps(tip)}
                      className={`viz-hit viz-mark flex h-full min-w-0 items-center justify-center overflow-visible ${index === parts.length - 1 ? "rounded-r-[4px]" : ""}`}
                      // Grow factors that add up to less than 1 leave space
                      // unfilled, so share out the whole bar by percentage.
                      style={{ flex: `${(value / total) * 100} 1 0`, background: part.color }}
                    >
                      {/* Only where the segment is wide enough for the text; the
                          tooltip and table always have the value. */}
                      {inside && value / max >= 0.08 && (
                        <span
                          className="hidden text-[11px] font-semibold tabular-nums @md:inline"
                          style={{ color: inside.ink }}
                        >
                          {format(value)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="ml-2 text-xs font-semibold whitespace-nowrap text-(--viz-ink) tabular-nums">
                {format(total)}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
