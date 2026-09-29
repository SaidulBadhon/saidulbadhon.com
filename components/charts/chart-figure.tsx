import type { ReactNode } from "react";
import ChartTooltips from "./chart-tooltips";
import type { Series } from "./utils";

type Props = {
  title: string;
  description?: ReactNode;
  /** Shown for charts with two or more series. Bars get square keys, lines
   *  short strokes, dots circles, to match the marks. */
  legend?: { series: Series[]; mark: "bar" | "line" | "dot" };
  /** Where the numbers come from. */
  source: ReactNode;
  /** Every value in the chart as a table, so nothing depends on reading
   *  colours or hovering. */
  table: { columns: string[]; rows: ReactNode[][] };
  children: ReactNode;
};

/** The card a chart sits on: title, legend, the chart, its source, and the
 *  data behind it. */
export default function ChartFigure({ title, description, legend, source, table, children }: Props) {
  return (
    <figure className="viz not-prose my-10 rounded-2xl border border-gray-200 bg-(--viz-surface) p-5 sm:p-7 dark:border-white/10">
      <figcaption>
        <p className="leading-snug font-semibold tracking-tight text-balance text-(--viz-ink)">{title}</p>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-(--viz-ink-2)">{description}</p>
        )}
      </figcaption>

      {legend && (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--viz-ink-2)">
          {legend.series.map((series) => (
            <li key={series.key} className="flex items-center gap-2">
              <Key color={series.color} mark={legend.mark} />
              {series.label}
            </li>
          ))}
        </ul>
      )}

      <ChartTooltips className="mt-6">{children}</ChartTooltips>

      <div className="mt-6 border-t border-(--viz-grid) pt-4 text-xs leading-relaxed text-(--viz-muted)">
        <p className="text-pretty">{source}</p>
        <details className="mt-2">
          <summary className="w-fit cursor-pointer font-medium transition-colors hover:text-(--viz-ink)">
            Show the data
          </summary>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-(--viz-ink-2) tabular-nums">
              <thead>
                <tr>
                  {table.columns.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-(--viz-axis) py-1.5 pr-4 font-medium text-(--viz-ink)"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, column) => (
                      <td key={column} className="border-b border-(--viz-grid) py-1.5 pr-4">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </figure>
  );
}

function Key({ color, mark }: { color: string; mark: "bar" | "line" | "dot" }) {
  const shape = {
    bar: "size-2.5 rounded-[3px]",
    line: "h-0.5 w-4 rounded-full",
    dot: "size-2.5 rounded-full",
  }[mark];
  return <span aria-hidden className={`shrink-0 ${shape}`} style={{ background: color }} />;
}
