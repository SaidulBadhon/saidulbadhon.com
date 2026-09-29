/** A series in a chart: a model, or a part of a cost. */
export type Series = {
  key: string;
  label: string;
  /** A CSS colour, normally one of the --viz-* variables in globals.css. */
  color: string;
};

/** What a mark's tooltip shows: a heading, then values with their labels. */
export type Tip = {
  title: string;
  rows: { value: string; label: string; color?: string }[];
};

/** Makes an element a mark with a tooltip, shown on hover and on keyboard
 *  focus. Screen readers get the same text as a label. */
export function tipProps(tip: Tip) {
  return {
    "data-tip": JSON.stringify(tip),
    tabIndex: 0,
    role: "img",
    "aria-label": `${tip.title}: ${tip.rows.map((row) => `${row.label} ${row.value}`).join(", ")}`,
  };
}

export function seriesByKey(series: Series[], key: string): Series {
  const found = series.find((item) => item.key === key);
  if (!found) {
    throw new Error(`No series called "${key}"`);
  }
  return found;
}

/** Where a value sits along an axis, from 0 at the start to 1 at the end. */
export type Scale = (value: number) => number;

export function linearScale([min, max]: [number, number]): Scale {
  return (value) => (value - min) / (max - min);
}

export function logScale([min, max]: [number, number]): Scale {
  const [low, high] = [Math.log10(min), Math.log10(max)];
  return (value) => (Math.log10(value) - low) / (high - low);
}

export const percent = (fraction: number) => `${fraction * 100}%`;
