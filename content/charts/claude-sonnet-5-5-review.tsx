// Charts for content/blogs/claude-sonnet-5-5-review.mdx. Every number is from
// a source named under its chart, as of September 29, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import DotPlot from "@/components/charts/dot-plot";
import LineChart from "@/components/charts/line-chart";
import StackedBarChart from "@/components/charts/stacked-bar-chart";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const sonnet5: Series = { key: "sonnet-5", label: "Sonnet 5", color: "var(--viz-previous)" };
const sonnet55: Series = { key: "sonnet-5-5", label: "Sonnet 5.5", color: "var(--viz-sonnet-5-5)" };
const opus55: Series = { key: "opus-5-5", label: "Opus 5.5", color: "var(--viz-opus-5-5)" };
const sol: Series = { key: "gpt-6-sol", label: "GPT-6 Sol", color: "var(--viz-gpt-6-sol)" };
const astra: Series = { key: "gpt-6-astra", label: "GPT-6 Astra", color: "var(--viz-gpt-6-astra)" };

const efforts = ["Low", "Medium", "High", "Xhigh", "Max"] as const;

/** Artificial Analysis Intelligence Index: cost to run one task, and the
 *  score, at each effort level from low to max. */
const index: Record<string, { cost: number; score: number }[]> = {
  "sonnet-5": [
    { cost: 0.51, score: 24 },
    { cost: 1.0, score: 28 },
    { cost: 1.79, score: 32 },
    { cost: 2.87, score: 34 },
    { cost: 5.09, score: 38 },
  ],
  "sonnet-5-5": [
    { cost: 0.41, score: 36 },
    { cost: 0.59, score: 41 },
    { cost: 1.08, score: 47 },
    { cost: 2.74, score: 52 },
    { cost: 7.6, score: 56 },
  ],
  "opus-5-5": [
    { cost: 0.55, score: 42 },
    { cost: 1.34, score: 51 },
    { cost: 1.82, score: 54 },
    { cost: 3.46, score: 56 },
    { cost: 5.98, score: 58 },
  ],
  "gpt-6-sol": [
    { cost: 0.13, score: 34 },
    { cost: 0.25, score: 40 },
    { cost: 0.38, score: 43 },
    { cost: 0.52, score: 44 },
    { cost: 1.05, score: 48 },
  ],
};

const usd = (value: number) => `$${value.toFixed(2)}`;
const usdTick = (value: number) => (value < 1 ? usd(value) : `$${value}`);
const percentage = (value: number) => `${value}%`;

function change(before: number, after: number) {
  const difference = Math.round(((after - before) / before) * 100);
  return difference < 0 ? `${-difference}% cheaper` : `${difference}% more`;
}

const indexPoints = (key: string) =>
  index[key].map(({ cost, score }, level) => ({ x: cost, y: score, name: efforts[level] }));

const indexTable = (series: Series[]) => ({
  columns: ["Model", "Effort", "Cost per task", "Index score"],
  rows: series.flatMap((item) =>
    index[item.key].map(({ cost, score }, level) => [item.label, efforts[level], usd(cost), score])
  ),
});

const aaSource = "Source: Artificial Analysis, as of September 29, 2026.";

export function AtAGlance() {
  return (
    <StatTiles
      title="Sonnet 5.5 at a glance"
      tiles={[
        {
          label: "API price, input / output",
          value: "$2 / $10",
          detail: "Per million tokens, unchanged from Sonnet 5",
          trend: "flat",
        },
        {
          label: "Intelligence Index, max effort",
          value: "56",
          detail: "18 points above Sonnet 5, 2 below Opus 5.5",
          trend: "up",
          good: true,
        },
        {
          label: "Cost per task, medium effort",
          value: "$0.59",
          detail: "41% less than Sonnet 5 at the same effort",
          trend: "down",
          good: true,
        },
        {
          label: "Cache read price",
          value: "$0.20",
          detail: "Per million tokens, the same as Opus 5.5",
          trend: "caution",
        },
      ]}
      footer={
        <>
          Released September 28, 2026 as <code>claude-sonnet-5-5</code>, with a 1M-token context window and up to
          128K tokens of output. Index score and cost per task from Artificial Analysis; prices from Anthropic.
        </>
      }
    />
  );
}

export function CostPerTaskChart() {
  const series = [sonnet5, sonnet55];
  return (
    <ChartFigure
      title="Same price per token, a very different bill"
      description="What one task on Artificial Analysis's Intelligence Index costs at each effort level. Sonnet 5.5 is cheaper at every level except max, and scores higher at all of them."
      legend={{ series, mark: "bar" }}
      source={`${aaSource} Hover or tap a bar for its Intelligence Index score.`}
      table={{
        columns: ["Effort", "Sonnet 5 cost", "Sonnet 5 score", "Sonnet 5.5 cost", "Sonnet 5.5 score", "Change in cost"],
        rows: efforts.map((effort, level) => {
          const [before, after] = [index["sonnet-5"][level], index["sonnet-5-5"][level]];
          return [
            effort,
            usd(before.cost),
            before.score,
            usd(after.cost),
            after.score,
            change(before.cost, after.cost),
          ];
        }),
      }}
    >
      <BarChart
        series={series}
        max={8}
        format={usd}
        labelWidth="4rem"
        labelRoom="7.5rem"
        groups={efforts.map((effort, level) => ({
          label: effort,
          bars: series.map((item) => {
            const { cost, score } = index[item.key][level];
            return {
              series: item.key,
              value: cost,
              note: item === sonnet55 ? change(index["sonnet-5"][level].cost, cost) : undefined,
              tip: {
                title: `${item.label}, ${effort.toLowerCase()} effort`,
                rows: [
                  { value: usd(cost), label: "per task", color: item.color },
                  { value: String(score), label: "Intelligence Index" },
                ],
              },
            };
          }),
        }))}
      />
    </ChartFigure>
  );
}

export function CacheReadChart() {
  const previous: Series = { key: "previous", label: "Previous model", color: "var(--viz-previous)" };
  const current: Series = { key: "current", label: "Opus 5.5, Fable 5.1", color: "var(--viz-context)" };
  const series = [previous, current, sonnet55];
  const families = [
    { family: "Opus", before: ["Opus 5", 0.5, "10%"], after: ["Opus 5.5", 0.2, "5%"] },
    { family: "Fable", before: ["Fable 5", 1, "10%"], after: ["Fable 5.1", 0.25, "2.5%"] },
    { family: "Sonnet", before: ["Sonnet 5", 0.2, "10%"], after: ["Sonnet 5.5", 0.2, "10%"] },
  ] as const;

  return (
    <ChartFigure
      title="Anthropic cut cache-read prices on Opus and Fable, but not on Sonnet"
      description="Price per million tokens read from the prompt cache, previous model to current one."
      legend={{ series, mark: "dot" }}
      source="Source: Anthropic API pricing. Cache reads cost 5% of the input price on Opus 5.5 and 2.5% on Fable 5.1; Sonnet 5.5 stays at the standard 10%."
      table={{
        columns: ["Model", "Cache read per 1M tokens", "Share of input price"],
        rows: families.flatMap(({ before, after }) => [
          [before[0], usd(before[1]), before[2]],
          [after[0], usd(after[1]), after[2]],
        ]),
      }}
    >
      <DotPlot
        series={series}
        domain={[0, 1.1]}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
        format={usd}
        labelWidth="10rem"
        rows={families.map(({ family, before, after }) => {
          const sonnet = family === "Sonnet";
          return {
            label: family,
            sublabel: `${before[0]} → ${after[0]}`,
            connect: true,
            points: [
              {
                series: "previous",
                value: before[1],
                label: sonnet ? undefined : usd(before[1]),
                tip: {
                  title: before[0],
                  rows: [{ value: usd(before[1]), label: `per 1M tokens, ${before[2]} of input` }],
                },
              },
              {
                series: sonnet ? "sonnet-5-5" : "current",
                value: after[1],
                label: sonnet ? `${usd(after[1])}, unchanged` : usd(after[1]),
                tip: {
                  title: sonnet ? "Sonnet 5 → Sonnet 5.5" : after[0],
                  rows: [{ value: usd(after[1]), label: `per 1M tokens, ${after[2]} of input` }],
                },
              },
            ],
          };
        })}
      />
    </ChartFigure>
  );
}

export function CacheBreakdownChart() {
  const parts: Series[] = [
    { key: "cache", label: "Cache reads (2M tokens)", color: "var(--viz-accent)" },
    { key: "input", label: "Fresh input (100K tokens)", color: "var(--viz-part-1)" },
    { key: "output", label: "Output (50K tokens)", color: "var(--viz-part-2)" },
  ];
  const rows = [
    { label: "Sonnet 5.5", sublabel: "Today's prices", values: { cache: 0.4, input: 0.2, output: 0.5 } },
    { label: "Opus 5.5", sublabel: "Today's prices", values: { cache: 0.4, input: 0.4, output: 1 } },
    { label: "Sonnet 5.5", sublabel: "If it had Opus 5.5's 5% cache rate", values: { cache: 0.2, input: 0.2, output: 0.5 } },
  ];

  return (
    <ChartFigure
      title="One agent task: where the money goes"
      description="An illustrative agent loop that reads 2M cached tokens, sends 100K fresh input tokens and writes 50K output tokens. Opus 5.5 costs 1.6 times as much here, not twice as much."
      legend={{ series: parts, mark: "bar" }}
      source="An illustrative example priced at Anthropic's API rates, not a benchmark. Cache writes are left out to keep it simple."
      table={{
        columns: ["Scenario", "Cache reads", "Fresh input", "Output", "Total"],
        rows: rows.map((row) => [
          `${row.label}, ${row.sublabel.toLowerCase()}`,
          usd(row.values.cache),
          usd(row.values.input),
          usd(row.values.output),
          usd(row.values.cache + row.values.input + row.values.output),
        ]),
      }}
    >
      <StackedBarChart
        parts={parts}
        rows={rows}
        max={2}
        format={usd}
        labelled={[{ part: "cache", ink: "var(--viz-on-accent)" }]}
      />
    </ChartFigure>
  );
}

export function IntelligenceCostChart() {
  const series = [sonnet5, sonnet55, opus55];
  return (
    <ChartFigure
      title="Sonnet 5.5 leaps past Sonnet 5, but Opus 5.5 sits higher for similar money"
      description="Intelligence Index score against the cost of one task. Each dot is an effort level, from low on the left to max on the right, so higher and further left is better value."
      legend={{ series, mark: "line" }}
      source={`${aaSource} The cost axis is logarithmic.`}
      table={indexTable(series)}
    >
      <LineChart
        series={series}
        points={Object.fromEntries(series.map((item) => [item.key, indexPoints(item.key)]))}
        x={{
          domain: [0.3, 10],
          ticks: [0.3, 1, 3, 10],
          format: usdTick,
          title: "Cost per task",
          log: true,
        }}
        y={{ domain: [20, 60], ticks: [20, 30, 40, 50, 60], format: String, title: "Intelligence Index" }}
        endLabels={{ "sonnet-5": "right", "sonnet-5-5": "below", "opus-5-5": "above-left" }}
        describe={(item, point) => ({
          title: `${item.label}, ${point.name.toLowerCase()} effort`,
          rows: [
            { value: String(point.y), label: "Intelligence Index" },
            { value: usd(point.x), label: "per task" },
          ],
        })}
      />
    </ChartFigure>
  );
}

export function KnowledgeWorkChart() {
  const series = [sonnet5, sonnet55, opus55, sol];
  // Drawn so Sonnet 5.5 sits on top where it overlaps Opus 5.5.
  const drawOrder = [sonnet5, sol, opus55, sonnet55];
  // Sonnet 5.5 and Opus 5.5 are within a few points, so they sit just above
  // and below the line, each labelled on its own side.
  const nudges: Record<string, number> = { "sonnet-5-5": -6, "opus-5-5": 6 };
  const benchmarks = [
    { label: "GDPval-AA v2.1", scores: { "sonnet-5": 1449, "gpt-6-sol": 1487, "opus-5-5": 1846, "sonnet-5-5": 1844 } },
    {
      label: "AA-Briefcase v1.1",
      scores: { "sonnet-5": 1359, "gpt-6-sol": 1483, "opus-5-5": 1822, "sonnet-5-5": 1811 },
    },
  ];

  return (
    <ChartFigure
      title="On knowledge work, Sonnet 5.5 is level with Opus 5.5"
      description="Elo-style ratings on two knowledge-work benchmarks, as Anthropic reported them at launch. Higher is better."
      legend={{ series, mark: "dot" }}
      source="Source: Anthropic's Sonnet 5.5 launch post, which footnotes its GPT-6 Sol figures."
      table={{
        columns: ["Benchmark", ...series.map((item) => item.label)],
        rows: benchmarks.map((benchmark) => [
          benchmark.label,
          ...series.map((item) => benchmark.scores[item.key as keyof typeof benchmark.scores]),
        ]),
      }}
    >
      <DotPlot
        series={series}
        domain={[1300, 1900]}
        ticks={[1300, 1400, 1500, 1600, 1700, 1800, 1900]}
        format={String}
        labelWidth="8.5rem"
        rows={benchmarks.map((benchmark) => ({
          label: benchmark.label,
          points: drawOrder.map((item) => {
            const value = benchmark.scores[item.key as keyof typeof benchmark.scores];
            return {
              series: item.key,
              value,
              nudge: nudges[item.key],
              label: item === sonnet5 ? undefined : String(value),
              labelPosition: item === sonnet55 ? ("above" as const) : ("below" as const),
            };
          }),
        }))}
      />
    </ChartFigure>
  );
}

export function CodingBenchmarksChart() {
  const series = [sonnet5, sonnet55, opus55, sol];
  const benchmarks = [
    { label: "Terminal-Bench 4.0", scores: [10.3, 70.6, 66.4, null] },
    { label: "CursorBench 4.0", scores: [34.1, 55.5, 57.8, null] },
    { label: "FrontierCode 1.1 (max)", scores: [42.4, 46.2, 54.4, 49.3] },
  ];

  return (
    <ChartFigure
      title="Coding benchmarks, as Anthropic reports them"
      description="Sonnet 5.5 leads on terminal work. On the harder coding tests it trails Opus 5.5, and on FrontierCode it trails GPT-6 Sol too."
      legend={{ series, mark: "bar" }}
      source="Source: Anthropic's Sonnet 5.5 launch post. Anthropic didn't report GPT-6 Sol on Terminal-Bench or CursorBench, and footnotes some figures."
      table={{
        columns: ["Benchmark", ...series.map((item) => item.label)],
        rows: benchmarks.map((benchmark) => [
          benchmark.label,
          ...benchmark.scores.map((score) => (score === null ? "Not reported" : percentage(score))),
        ]),
      }}
    >
      <BarChart
        series={series}
        max={100}
        format={percentage}
        labelWidth="10rem"
        labelRoom="5.5rem"
        groups={benchmarks.map((benchmark) => ({
          label: benchmark.label,
          bars: series.map((item, position) => ({ series: item.key, value: benchmark.scores[position] })),
        }))}
      />
    </ChartFigure>
  );
}

/** One bar per model, each labelled with the model's name. */
function modelBars(scores: [Series, number][], describe: (value: number) => string, title: string) {
  return scores.map(([item, value]) => ({
    label: item.label,
    bars: [
      {
        series: item.key,
        value,
        tip: { title, rows: [{ value: describe(value), label: item.label, color: item.color }] },
      },
    ],
  }));
}

export function TerminalBenchChart() {
  const scores: [Series, number][] = [
    [sonnet5, 14.1],
    [sonnet55, 63.6],
    [opus55, 59.6],
    [sol, 43],
    [astra, 59.1],
  ];
  return (
    <ChartFigure
      title="Terminal-Bench 4.0, measured independently"
      description="Artificial Analysis's own run puts Sonnet 5.5 ahead of Opus 5.5 and GPT-6 Astra on command-line work, the same order Anthropic reported."
      source={aaSource}
      table={{
        columns: ["Model", "Terminal-Bench 4.0"],
        rows: scores.map(([item, value]) => [item.label, percentage(value)]),
      }}
    >
      <BarChart
        series={scores.map(([item]) => item)}
        max={100}
        format={percentage}
        labelWidth="6.5rem"
        groups={modelBars(scores, percentage, "Terminal-Bench 4.0")}
      />
    </ChartFigure>
  );
}

export function SpeedChart() {
  const speeds: [Series, number][] = [
    [sonnet5, 65],
    [sonnet55, 89],
    [opus55, 75],
    [sol, 71],
  ];
  const format = (value: number) => `${value} tokens/s`;
  return (
    <ChartFigure
      title="Output speed at high effort"
      description="Tokens generated per second. Speed is one place Sonnet 5.5 clearly beats Opus 5.5."
      source={aaSource}
      table={{
        columns: ["Model", "Output tokens per second"],
        rows: speeds.map(([item, value]) => [item.label, value]),
      }}
    >
      <BarChart
        series={speeds.map(([item]) => item)}
        max={100}
        format={format}
        labelWidth="6.5rem"
        labelRoom="6.5rem"
        groups={modelBars(speeds, format, "Output speed, high effort")}
      />
    </ChartFigure>
  );
}

export function SolLadderChart() {
  const series = [sonnet55, sol];
  return (
    <ChartFigure
      title="Same price per token, opposite approaches"
      description="Sonnet 5.5 and GPT-6 Sol on the Intelligence Index, one dot per effort level. At about $1 a task they're level; below that Sol gets more for the money, and above it Sonnet 5.5 keeps climbing where Sol stops."
      legend={{ series, mark: "line" }}
      source={`${aaSource} The cost axis is logarithmic.`}
      table={indexTable(series)}
    >
      <LineChart
        series={series}
        points={Object.fromEntries(series.map((item) => [item.key, indexPoints(item.key)]))}
        x={{
          domain: [0.1, 10],
          ticks: [0.1, 0.3, 1, 3, 10],
          format: usdTick,
          title: "Cost per task",
          log: true,
        }}
        y={{ domain: [30, 60], ticks: [30, 40, 50, 60], format: String, title: "Intelligence Index" }}
        endLabels={{ "sonnet-5-5": "above-left", "gpt-6-sol": "above-left" }}
        describe={(item, point) => ({
          title: `${item.label}, ${point.name.toLowerCase()} effort`,
          rows: [
            { value: String(point.y), label: "Intelligence Index" },
            { value: usd(point.x), label: "per task" },
          ],
        })}
      />
    </ChartFigure>
  );
}

export function TokensPerTaskChart() {
  const tokens: [Series, number][] = [
    [sonnet55, 193_000],
    [sol, 31_000],
  ];
  const format = (value: number) => `~${Math.round(value / 1000)}K`;
  return (
    <ChartFigure
      title="Output tokens per task, at max effort"
      description="The same price per token, but Sonnet 5.5 writes about six times as many tokens to finish a task. That's most of the cost gap."
      source="Source: Artificial Analysis's launch analyses of Sonnet 5.5 and GPT-6 Sol. Approximate figures."
      table={{
        columns: ["Model", "Output tokens per task"],
        rows: tokens.map(([item, value]) => [item.label, format(value)]),
      }}
    >
      <BarChart
        series={tokens.map(([item]) => item)}
        max={200_000}
        format={format}
        labelWidth="6.5rem"
        groups={modelBars(tokens, format, "Output tokens per task, max effort")}
      />
    </ChartFigure>
  );
}
