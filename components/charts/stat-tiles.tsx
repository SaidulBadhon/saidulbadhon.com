import type { ReactNode } from "react";
import { FiAlertCircle, FiArrowDownRight, FiArrowUpRight, FiMinus } from "react-icons/fi";

type Tile = {
  label: string;
  value: string;
  detail: string;
  /** The icon beside the detail. Good and caution also colour it; the words
   *  always say which it is. */
  trend: "up" | "down" | "flat" | "caution";
  good?: boolean;
};

const icons = {
  up: FiArrowUpRight,
  down: FiArrowDownRight,
  flat: FiMinus,
  caution: FiAlertCircle,
};

/** A row of headline numbers. */
export default function StatTiles({
  title,
  tiles,
  footer,
}: {
  title: string;
  tiles: Tile[];
  footer?: ReactNode;
}) {
  return (
    <section className="viz not-prose my-10 rounded-2xl border border-gray-200 bg-(--viz-surface) p-5 sm:p-7 dark:border-white/10">
      <p className="leading-snug font-semibold tracking-tight text-(--viz-ink)">{title}</p>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
        {tiles.map((tile) => {
          const Icon = icons[tile.trend];
          const color =
            tile.trend === "caution" ? "var(--viz-caution)" : tile.good ? "var(--viz-good)" : "var(--viz-muted)";
          return (
            <div key={tile.label}>
              <dt className="text-xs leading-snug text-(--viz-muted)">{tile.label}</dt>
              <dd className="mt-1.5 text-2xl font-semibold tracking-tight text-(--viz-ink) sm:text-3xl">
                {tile.value}
              </dd>
              <dd className="mt-1.5 flex gap-1.5 text-xs leading-snug text-(--viz-ink-2)">
                <Icon aria-hidden className="mt-px size-3.5 shrink-0" style={{ color }} />
                {tile.detail}
              </dd>
            </div>
          );
        })}
      </dl>
      {footer && (
        <p className="mt-6 border-t border-(--viz-grid) pt-4 text-xs leading-relaxed text-(--viz-muted)">
          {footer}
        </p>
      )}
    </section>
  );
}
