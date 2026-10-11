// Charts for content/blogs/claude-haiku-5-5-review.mdx. Every number is from
// a source named under its chart, as of October 11, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import LineChart from "@/components/charts/line-chart";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const haiku45: Series = { key: "haiku-4-5", label: "Haiku 4.5", color: "var(--viz-previous)" };
const haiku55: Series = { key: "haiku-5-5", label: "Haiku 5.5", color: "var(--viz-haiku-5-5)" };
const luna: Series = { key: "gpt-6-luna", label: "GPT-6 Luna", color: "var(--viz-gpt-6-luna)" };
const sonnet55: Series = { key: "sonnet-5-5", label: "Sonnet 5.5", color: "var(--viz-sonnet-5-5)" };
const opus55: Series = { key: "opus-5-5", label: "Opus 5.5", color: "var(--viz-opus-5-5)" };
const oldPrice: Series = { key: "old-price", label: "Previous price", color: "var(--viz-previous)" };

/** Artificial Analysis Intelligence Index: cost to run one task, and the
 *  score, at each effort level from low to max. Artificial Analysis only
 *  publishes GPT-6 Luna at max, and doesn't yet apply Haiku 5.5's higher
 *  price for prompts over 100K tokens. */
const index: Record<string, { effort: string; cost: number; score: number }[]> = {
  "haiku-5-5": [
    { effort: "Low", cost: 0.02, score: 29 },
    { effort: "Medium", cost: 0.05, score: 34 },
    { effort: "High", cost: 0.08, score: 38 },
    { effort: "Xhigh", cost: 0.12, score: 41 },
    { effort: "Max", cost: 0.21, score: 43 },
  ],
  "sonnet-5-5": [
    { effort: "Low", cost: 0.35, score: 36 },
    { effort: "Medium", cost: 0.48, score: 41 },
    { effort: "High", cost: 0.88, score: 47 },
    { effort: "Xhigh", cost: 2.01, score: 52 },
    { effort: "Max", cost: 5.46, score: 56 },
  ],
  "gpt-6-luna": [{ effort: "Max", cost: 0.07, score: 38 }],
};

/** Dollars to the cent, or to a tenth of a cent when that's what's left. */
const usd = (value: number) =>
  Number.isInteger(Math.round(value * 1000) / 10) ? `$${value.toFixed(2)}` : `$${value.toFixed(3)}`;
const usdTick = (value: number) => `$${value}`;
const percentage = (value: number) => `${value}%`;

const aaSource = "Source: Artificial Analysis, as of October 11, 2026.";

export function AtAGlance() {
  return (
    <StatTiles
      title="Haiku 5.5 at a glance"
      tiles={[
        {
          label: "API price, input / output",
          value: "$0.10 / $0.50",
          detail: "Per million tokens, for prompts up to 100K. 90% below Haiku 4.5",
          trend: "down",
          good: true,
        },
        {
          label: "Intelligence Index, max effort",
          value: "43",
          detail: "26 points above Haiku 4.5, and ahead of GPT-6 Luna's 38",
          trend: "up",
          good: true,
        },
        {
          label: "Cost per task, xhigh effort",
          value: "$0.12",
          detail: "The same score as Sonnet 5.5 at medium (41), for a quarter of its $0.48",
          trend: "down",
          good: true,
        },
        {
          label: "Price over 100K prompt tokens",
          value: "5x",
          detail: "$0.50 / $2.50, on the whole request, cache reads included",
          trend: "caution",
        },
      ]}
      footer={
        <>
          Released October 7, 2026 as <code>claude-haiku-5-5</code>, with a 1M-token context window and up to 128K
          tokens of output. Index score and cost per task from Artificial Analysis, which doesn&apos;t yet apply the
          100K price step; prices from Anthropic.
        </>
      }
    />
  );
}

export function PriceChart() {
  const prices: { series: Series; label: string; input: number; output: number; note?: string }[] = [
    { series: sonnet55, label: "Sonnet 5.5", input: 2, output: 10 },
    { series: haiku45, label: "Haiku 4.5", input: 1, output: 5 },
    { series: haiku55, label: "Haiku 5.5, prompt over 100K", input: 0.5, output: 2.5, note: "half of Haiku 4.5" },
    { series: haiku55, label: "Haiku 5.5, prompt up to 100K", input: 0.1, output: 0.5, note: "90% less" },
    { series: luna, label: "GPT-6 Luna, up to 272K", input: 0.1, output: 0.5 },
  ];
  const series = [sonnet55, haiku45, haiku55, luna];

  return (
    <ChartFigure
      title="A tenth of Haiku 4.5's price, until the prompt passes 100K tokens"
      description="API price per million output tokens. Input costs a fifth of output on every row, so the picture is the same for input."
      legend={{ series, mark: "bar" }}
      source="Source: Anthropic and OpenAI API pricing, as of October 11, 2026. Standard rates; batch processing halves all of them."
      table={{
        columns: ["Model", "Input per 1M tokens", "Output per 1M tokens"],
        rows: prices.map((price) => [price.label, usd(price.input), usd(price.output)]),
      }}
    >
      <BarChart
        series={series}
        max={10}
        format={usd}
        labelWidth="11rem"
        labelRoom="9.5rem"
        groups={prices.map((price) => ({
          label: price.label,
          bars: [
            {
              series: price.series.key,
              value: price.output,
              note: price.note,
              tip: {
                title: price.label,
                rows: [
                  { value: usd(price.output), label: "output per 1M tokens", color: price.series.color },
                  { value: usd(price.input), label: "input per 1M tokens" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function BenchmarksChart() {
  const series = [haiku45, haiku55, luna, sonnet55];
  const benchmarks = [
    { label: "OSWorld 2.1 (offline)", scores: [15.7, 72.4, 48.9, 83.9] },
    { label: "Terminal-Bench 4.0", scores: [0, 39.2, 16.4, 70.6] },
    { label: "FrontierCode 1.1", scores: [null, 46.4, 42.4, 52.1] },
    { label: "Chartography", scores: [6.4, 46.4, 29.1, 61.6] },
    { label: "Humanity's Last Exam", scores: [10.2, 45.9, null, 56.9] },
  ];

  return (
    <ChartFigure
      title="A different class of model from Haiku 4.5"
      description="Anthropic's launch results. Haiku 5.5 beats GPT-6 Luna on every test both were run on, and sits below Sonnet 5.5 on all of them."
      legend={{ series, mark: "bar" }}
      source="Source: Anthropic's Haiku 5.5 launch post. Chartography and Humanity's Last Exam are without tools; Sonnet 5.5's FrontierCode score is at xhigh effort. Anthropic didn't report Haiku 4.5 on FrontierCode or Luna on Humanity's Last Exam."
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

export function EffortLadderChart() {
  const series = [sonnet55, haiku55, luna];
  return (
    <ChartFigure
      title="Haiku 5.5 at xhigh matches Sonnet 5.5 at medium, for a quarter of the cost"
      description="Intelligence Index score against the cost of one task. Each dot is an effort level, from low on the left to max on the right, so higher and further left is better value. Sonnet 5.5 keeps climbing long after Haiku 5.5 stops."
      legend={{ series, mark: "line" }}
      source={`${aaSource} The cost axis is logarithmic. Haiku 5.5's costs don't yet include its higher price for prompts over 100K tokens, and GPT-6 Luna is only published at max effort.`}
      table={{
        columns: ["Model", "Effort", "Cost per task", "Index score"],
        rows: series.flatMap((item) =>
          index[item.key].map(({ effort, cost, score }) => [item.label, effort, usd(cost), score])
        ),
      }}
    >
      <LineChart
        series={series}
        points={Object.fromEntries(
          series.map((item) => [
            item.key,
            index[item.key].map(({ effort, cost, score }) => ({ x: cost, y: score, name: effort })),
          ])
        )}
        x={{
          domain: [0.01, 10],
          ticks: [0.01, 0.03, 0.1, 0.3, 1, 3, 10],
          format: usdTick,
          title: "Cost per task",
          log: true,
        }}
        y={{ domain: [20, 60], ticks: [20, 30, 40, 50, 60], format: String, title: "Intelligence Index" }}
        endLabels={{ "sonnet-5-5": "above-left", "haiku-5-5": "above", "gpt-6-luna": "above-left" }}
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

/** The illustrative agent task from the Sonnet 5.5 review: 2M cached tokens
 *  read across the loop, 100K fresh input tokens, 50K output tokens. */
export function AgentTaskChart() {
  const task = { cache: 2, input: 0.1, output: 0.05 };
  const rates = [
    { series: opus55, label: "Opus 5.5", cache: 0.2, input: 4, output: 20 },
    { series: oldPrice, label: "Sonnet 5.5, before Oct 7", cache: 0.2, input: 2, output: 10 },
    { series: sonnet55, label: "Sonnet 5.5, now", cache: 0.1, input: 2, output: 10 },
    { series: haiku55, label: "Haiku 5.5, prompts over 100K", cache: 0.05, input: 0.5, output: 2.5 },
    { series: haiku55, label: "Haiku 5.5, prompts up to 100K", cache: 0.01, input: 0.1, output: 0.5 },
  ].map((rate) => {
    const parts = { cache: task.cache * rate.cache, input: task.input * rate.input, output: task.output * rate.output };
    return { ...rate, parts, total: parts.cache + parts.input + parts.output };
  });
  const opus = rates[0].total;
  const share = (total: number) => `${Math.round((total / opus) * 100)}% of Opus`;

  return (
    <ChartFigure
      title="One agent task, priced on each model"
      description="An illustrative agent loop that reads 2M cached tokens, sends 100K fresh input tokens and writes 50K output tokens. Halving Sonnet's cache price makes it exactly half of Opus here. Haiku 5.5 is cheaper again by a wide margin, even above its 100K line."
      source="An illustrative example priced at Anthropic's API rates, not a benchmark. It assumes every model needs the same tokens to finish, and leaves out cache writes. Sonnet 5.5's cache reads fell from $0.20 to $0.10 per million tokens on October 7."
      table={{
        columns: ["Scenario", "Cache reads", "Fresh input", "Output", "Total"],
        rows: rates.map((rate) => [
          rate.label,
          usd(rate.parts.cache),
          usd(rate.parts.input),
          usd(rate.parts.output),
          usd(rate.total),
        ]),
      }}
    >
      <BarChart
        series={[opus55, oldPrice, sonnet55, haiku55]}
        max={2}
        format={usd}
        labelWidth="11rem"
        labelRoom="8.5rem"
        groups={rates.map((rate, position) => ({
          label: rate.label,
          bars: [
            {
              series: rate.series.key,
              value: rate.total,
              note: position === 0 ? undefined : share(rate.total),
              tip: {
                title: rate.label,
                rows: [
                  { value: usd(rate.total), label: "total", color: rate.series.color },
                  { value: usd(rate.parts.cache), label: "cache reads" },
                  { value: usd(rate.parts.input), label: "fresh input" },
                  { value: usd(rate.parts.output), label: "output" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}
