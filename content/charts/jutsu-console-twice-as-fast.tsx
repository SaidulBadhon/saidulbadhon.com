// Charts for content/blogs/jutsu-console-twice-as-fast.mdx.
// Every number is from our write-up on the Jutsu blog, published October 4, 2026:
// https://jutsu.ai/blog/jutsu-console-twice-as-fast
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import DotPlot from "@/components/charts/dot-plot";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const before: Series = { key: "before", label: "Before", color: "var(--viz-previous)" };
const after: Series = { key: "after", label: "After", color: "var(--viz-jutsu)" };

const source = (
  <>
    Source: <a href="https://jutsu.ai/blog/jutsu-console-twice-as-fast">Jutsu</a>. Production build served gzipped,
    Edge under Playwright, throttled to 40 ms latency and 20 Mbit/s, cold cache, median of 3 runs.
  </>
);

/** Milliseconds as "956 ms" or "1.28 s". */
const duration = (ms: number) => (ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`);
const signed = (change: number) => `${change > 0 ? "+" : "−"}${Math.abs(change)}%`;

export function AtAGlance() {
  return (
    <StatTiles
      title="The Jutsu console, before and after"
      tiles={[
        {
          label: "Time to usable, 23 pages added up",
          value: "41.8 s → 21.6 s",
          detail: "48% less, on cold loads over a throttled connection",
          trend: "down",
          good: true,
        },
        {
          label: "JavaScript downloaded",
          value: "39.6 MB → 10.7 MB",
          detail: "73% less, because pages now load when you open them",
          trend: "down",
          good: true,
        },
        {
          label: "Main-thread blocking",
          value: "7.67 s → 1.99 s",
          detail: "74% less time where the browser can't respond to you",
          trend: "down",
          good: true,
        },
        {
          label: "Time spent in ClickHouse",
          value: "5.55 s → 1.51 s",
          detail: "73% less, from 40% fewer queries that read far less",
          trend: "down",
          good: true,
        },
      ]}
      footer={
        <>
          Sums across 23 console pages, each loaded cold, median of 3 runs. No new servers, no new infrastructure,
          no rewrite. Source: Jutsu.
        </>
      }
    />
  );
}

/** Sums across the 23 pages. */
const metrics = [
  { metric: "Main-thread blocking", before: "7.67 s", after: "1.99 s", change: -74 },
  { metric: "JavaScript transferred", before: "39.64 MB", after: "10.72 MB", change: -73 },
  { metric: "ClickHouse time", before: "5.55 s", after: "1.51 s", change: -73 },
  { metric: "First contentful paint", before: "36.26 s", after: "14.22 s", change: -61 },
  { metric: "Time to usable", before: "41.83 s", after: "21.59 s", change: -48 },
  { metric: "ClickHouse queries", before: "77", after: "46", change: -40 },
  { metric: "API requests", before: "570", after: "518", change: -9 },
  { metric: "Postgres queries", before: "619", after: "562", change: -9 },
];

export function ResultsChart() {
  const series = [{ key: "cut", label: "How much less", color: after.color }];
  return (
    <ChartFigure
      title="The number of requests barely moved. Everything heavy did."
      description="How much each measure fell, added up across 23 console pages. We sent 9% fewer API requests, but the JavaScript, the main-thread work and the ClickHouse time each fell by almost three quarters."
      source={
        <>
          {source} API requests include CORS preflights.
        </>
      }
      table={{
        columns: ["Measure", "Before", "After", "Change"],
        rows: metrics.map(({ metric, before, after, change }) => [metric, before, after, signed(change)]),
      }}
    >
      <BarChart
        series={series}
        max={100}
        format={(value) => `${value}%`}
        labelWidth="10rem"
        labelRoom="9rem"
        groups={metrics.map(({ metric, before, after, change }) => ({
          label: metric,
          bars: [
            {
              series: "cut",
              value: -change,
              label: signed(change),
              note: `${before} → ${after}`,
              tip: {
                title: metric,
                rows: [
                  { value: signed(change), label: "change", color: series[0].color },
                  { value: before, label: "before" },
                  { value: after, label: "after" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

/** The single script the console used to ship, and the entry chunk it ships now. */
const bundle = [
  { label: "Uncompressed", before: 6.16, after: 1.28 },
  { label: "Gzipped, what you download", before: 1.81, after: 0.376 },
];
const megabytes = (value: number) => (value < 1 ? `${Math.round(value * 1000)} KB` : `${value.toFixed(2)} MB`);

export function BundleChart() {
  const series = [
    { ...before, label: "Before: the whole console, one script" },
    { ...after, label: "After: the entry chunk" },
  ];
  return (
    <ChartFigure
      title="What the browser has to download before it can show you anything"
      description="Before, every one of the console's pages was in one script, so the dashboard couldn't start until compliance, the super admin panel, a code editor, two charting libraries and a map renderer had downloaded. Now the 94 routed pages are separate chunks, and the start is a fifth of the size."
      legend={{ series, mark: "bar" }}
      source={source}
      table={{
        columns: ["Size", "Before", "After", "Change"],
        rows: bundle.map(({ label, before, after }) => [
          label,
          megabytes(before),
          megabytes(after),
          signed(-Math.round((1 - after / before) * 100)),
        ]),
      }}
    >
      <BarChart
        series={series}
        max={6.2}
        format={megabytes}
        labelWidth="9rem"
        labelRoom="6rem"
        groups={bundle.map((row) => ({
          label: row.label,
          bars: [
            { series: "before", value: row.before },
            { series: "after", value: row.after, note: signed(-Math.round((1 - row.after / row.before) * 100)) },
          ],
        }))}
      />
    </ChartFigure>
  );
}

/** Time to usable per page after the change, and the change, as published.
 *  "Before" is worked back from those two: after ÷ (1 + change). */
const pages = [
  { page: "Action Center", after: 956, change: -62.6 },
  { page: "Dashboard", after: 790, change: -66.5 },
  { page: "Events", after: 934, change: -59.8 },
  { page: "Organization", after: 808, change: -63.4 },
  { page: "Alerts", after: 1280, change: -36.9 },
  { page: "Alert detail", after: 1340, change: -33.8 },
  { page: "Compliance", after: 981, change: -49.9 },
  { page: "Incidents", after: 1150, change: -38 },
  { page: "Compliance controls", after: 892, change: -48.8 },
  { page: "Account", after: 651, change: -62.2 },
  { page: "Rules marketplace", after: 745, change: -56.7 },
  { page: "Compliance policies", after: 955, change: -44.1 },
  { page: "Rules", after: 901, change: -46.9 },
  { page: "Incident detail", after: 1100, change: -33.7 },
  { page: "Notifications", after: 748, change: -54.7 },
  { page: "Organization team", after: 955, change: -42 },
  { page: "Risks", after: 971, change: -39.8 },
  { page: "People", after: 935, change: -42 },
  { page: "Connections", after: 1470, change: -7.6 },
  { page: "Reports", after: 939, change: -40.7 },
  { page: "Organization audit", after: 737, change: -53.2 },
  { page: "Incident handoff", after: 662, change: -55.9 },
  { page: "Copilot", after: 700, change: -53.3 },
].map((row) => ({ ...row, before: row.after / (1 + row.change / 100) }));

export function PerPageChart() {
  const series = [before, after];
  return (
    <ChartFigure
      title="Every page got faster. Most by a third to two thirds."
      description="Time until each page is usable: its first burst of API calls has finished. Cold load, with 10,000 events and 1,000 alerts in the org. Connections is the one that barely moved, because it still carries every connect dialog we have."
      legend={{ series, mark: "bar" }}
      source={
        <>
          {source} The before times are worked back from the published after times and percentage changes.
        </>
      }
      table={{
        columns: ["Page", "Before", "After", "Change"],
        rows: pages.map(({ page, before, after, change }) => [page, duration(before), duration(after), signed(change)]),
      }}
    >
      <BarChart
        series={series}
        max={2600}
        format={duration}
        labelWidth="10rem"
        labelRoom="7rem"
        groups={pages.map(({ page, before: old, after: now, change }) => ({
          label: page,
          bars: [
            { series: "before", value: old },
            { series: "after", value: now, note: signed(change) },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function ScaleChart() {
  // Each row is a range, so its two ends need separate keys; the legend shows
  // only before and after.
  const ends: Series[] = [
    { ...before, key: "before-low" },
    { ...before, key: "before-high" },
    { ...after, key: "after-low" },
    { ...after, key: "after-high" },
  ];
  const seconds = (value: number) => `${value} s`;
  const rows = [
    { label: "Before", low: 1.5, high: 3.6, key: "before" },
    { label: "After", low: 0.7, high: 1.4, key: "after" },
  ];
  return (
    <ChartFigure
      title="Bigger orgs don't get slower pages any more"
      description="The fastest and slowest time to usable across ten data-heavy pages (Dashboard, Action Center, Events, Alerts, Alert detail, Incidents, Incident detail, Incident handoff, Risks and People), at six dataset sizes from 100 events to 5 million events with 250,000 alerts."
      legend={{ series: [before, after], mark: "dot" }}
      source={
        <>
          {source} One exception: at 5 million events, the Dashboard&rsquo;s event breakdown still takes 1.1 to
          1.5 s on a cold cache. We didn&rsquo;t touch that code in this pass.
        </>
      }
      table={{
        columns: ["", "Fastest page", "Slowest page"],
        rows: rows.map((row) => [row.label, seconds(row.low), seconds(row.high)]),
      }}
    >
      <DotPlot
        series={ends}
        domain={[0, 4.5]}
        ticks={[0, 1, 2, 3, 4]}
        format={seconds}
        labelWidth="8rem"
        rows={rows.map((row) => ({
          label: row.label,
          sublabel: "100 to 5M events",
          connect: true,
          points: [
            { series: `${row.key}-low`, value: row.low, label: seconds(row.low) },
            { series: `${row.key}-high`, value: row.high, label: seconds(row.high) },
          ],
        }))}
      />
    </ChartFigure>
  );
}
