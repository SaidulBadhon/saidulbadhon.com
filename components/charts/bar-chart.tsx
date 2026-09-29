import { Fragment, type CSSProperties } from "react";
import { seriesByKey, tipProps, type Series, type Tip } from "./utils";

export type Bar = {
  series: string;
  /** null shows "not reported" instead of a bar. */
  value: number | null;
  /** Text at the end of the bar. Defaults to the formatted value. */
  label?: string;
  /** Quieter text after the label, like a change from the last model. */
  note?: string;
  /** Replaces the default tooltip. */
  tip?: Tip;
};

export type BarGroup = { label: string; bars: Bar[] };

type Props = {
  series: Series[];
  groups: BarGroup[];
  /** The value that fills the track. */
  max: number;
  format: (value: number) => string;
  /** Kept free at the end of the track for the longest label and note. */
  labelRoom?: string;
  /** Width of the group labels beside the bars. On phones they sit above. */
  labelWidth?: string;
};

/** Horizontal bars, grouped. Every bar is labelled with its value, so there's
 *  no value axis. */
export default function BarChart({
  series,
  groups,
  max,
  format,
  labelRoom = "4rem",
  labelWidth = "9rem",
}: Props) {
  return (
    <div
      className="grid gap-y-5 sm:grid-cols-[var(--label-width)_1fr] sm:gap-x-5"
      style={{ "--label-width": labelWidth, "--label-room": labelRoom } as CSSProperties}
    >
      {groups.map((group) => (
        <Fragment key={group.label}>
          <p className="text-sm leading-[18px] font-medium text-(--viz-ink)">{group.label}</p>
          {/* Bars in a group touch, with a 2px gap; the left border is the baseline. */}
          <div className="-mt-3 flex flex-col gap-0.5 border-l border-(--viz-axis) sm:mt-0">
            {group.bars.map((bar) => {
              const item = seriesByKey(series, bar.series);
              const label = bar.value === null ? "not reported" : (bar.label ?? format(bar.value));
              const tip = bar.tip ?? {
                title: group.label,
                rows: [{ value: label, label: item.label, color: item.color }],
              };
              return (
                <div key={bar.series} {...tipProps(tip)} className="viz-hit flex h-4.5 items-center">
                  {bar.value !== null && (
                    <div
                      className="viz-mark h-full shrink-0 rounded-r-[4px]"
                      style={{
                        width: `calc((100% - var(--label-room)) * ${bar.value / max})`,
                        background: item.color,
                      }}
                    />
                  )}
                  <span className="ml-2 text-xs whitespace-nowrap text-(--viz-ink-2) tabular-nums">
                    {bar.value === null ? <span className="text-(--viz-muted) italic">{label}</span> : label}
                    {bar.note && <span className="ml-1.5 text-(--viz-muted)">{bar.note}</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
