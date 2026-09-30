// Charts for content/blogs/gpt-6-1-sol-is-a-really-good-model-i-will-never-use.mdx.
// Every number is from a source named under its chart, as of October 1, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const sol: Series = { key: "sol", label: "GPT-6.1 Sol", color: "var(--viz-gpt-6-sol)" };
const sonnet: Series = { key: "sonnet", label: "Claude Sonnet 5.5", color: "var(--viz-sonnet-5-5)" };
const opus: Series = { key: "opus", label: "Claude Opus 5.5", color: "var(--viz-opus-5-5)" };
const astra: Series = { key: "astra", label: "GPT-6 Astra", color: "var(--viz-gpt-6-astra)" };

/** API prices per million tokens, at standard context length. */
const prices = [
  { series: sol, input: 2, cached: 0.1, cacheWrite: 2.5, output: 10 },
  { series: sonnet, input: 2, cached: 0.2, cacheWrite: 2.5, output: 10 },
  { series: opus, input: 4, cached: 0.2, cacheWrite: 5, output: 20 },
  { series: astra, input: 10, cached: 1, cacheWrite: 12.5, output: 50 },
];

// One illustrative agent turn: the model reads 200K tokens of codebase and
// conversation and writes 20K. "Cached" means 180K of the 200K are cache reads
// and the other 20K are fresh input.
const INPUT = 200_000;
const OUTPUT = 20_000;
const CACHED_SHARE = 0.9;

function turnCost({ input, cached, output }: (typeof prices)[number], withCache: boolean) {
  const cachedTokens = withCache ? INPUT * CACHED_SHARE : 0;
  return ((INPUT - cachedTokens) * input + cachedTokens * cached + OUTPUT * output) / 1_000_000;
}

const usd = (value: number) => `$${value.toFixed(2)}`;
const count = (value: number) => Math.round(value).toLocaleString("en-US");

const priceSource = (
  <>
    Sources: OpenAI&rsquo;s GPT-6.1 Sol model page and launch post, as reported by The Next Web and Developers Digest;
    Anthropic&rsquo;s published Claude 5.5 prices. The agent turn is my own arithmetic from those list prices.
  </>
);

export function AtAGlance() {
  return (
    <StatTiles
      title="GPT-6.1 Sol: on paper vs. in practice"
      tiles={[
        {
          label: "API price per 1M tokens",
          value: "$2 / $10",
          detail: "Input / output, with cached input at $0.10",
          trend: "down",
          good: true,
        },
        {
          label: "Versus GPT-6 Astra",
          value: "1/5",
          detail: "The token price, for close to Astra-level agentic work",
          trend: "down",
          good: true,
        },
        {
          label: "ChatGPT Pro $200, Codex usage",
          value: "20x → 10x",
          detail: "Plus usage, halved on the same day Sol launched",
          trend: "down",
        },
        {
          label: "“Selected model is at capacity”",
          value: "Since Sep 8",
          detail: "Open issues on the Codex repo, even with quota left",
          trend: "caution",
        },
      ]}
      footer={
        <>
          GPT-6.1 Sol launched at DevDay on September 29, 2026, in the API, Codex and ChatGPT Work for Plus, Pro,
          Business, Enterprise and Edu. It isn&rsquo;t in regular ChatGPT yet. Sources: OpenAI, The Next Web,
          Engadget, and issues #43738 and #47237 on github.com/openai/codex.
        </>
      }
    />
  );
}

export function AgentTurnChart() {
  const series = prices.map((row) => row.series);
  const scenarios = [
    { label: "No caching", withCache: false },
    { label: "90% cached", withCache: true },
  ];
  return (
    <ChartFigure
      title="On the price sheet, Sol is the cheapest serious model there is"
      description="What one agent turn costs at list API prices: the model reads 200K tokens of code and conversation and writes 20K. In real agent loops, most of that input is cache reads, so the second group is the one that matters."
      legend={{ series, mark: "bar" }}
      source={priceSource}
      table={{
        columns: ["Model", "Input / cached / output per 1M", "No caching", "90% cached"],
        rows: prices.map((row) => [
          row.series.label,
          `$${row.input} / $${row.cached} / $${row.output}`,
          usd(turnCost(row, false)),
          usd(turnCost(row, true)),
        ]),
      }}
    >
      <BarChart
        series={series}
        max={3}
        format={usd}
        labelWidth="6.5rem"
        labelRoom="4rem"
        groups={scenarios.map(({ label, withCache }) => ({
          label,
          bars: prices.map((row) => ({ series: row.series.key, value: turnCost(row, withCache) })),
        }))}
      />
    </ChartFigure>
  );
}

export function TurnsPerBudgetChart() {
  const series = [{ key: "turns", label: "Agent turns", color: "var(--viz-openai)" }];
  const budget = 200;
  const rows = prices.map((row) => ({ ...row, turns: budget / turnCost(row, true) }));
  return (
    <ChartFigure
      title="What $200 buys on the API, if you can actually spend it"
      description="The same 90%-cached agent turn as above, and how many of them $200 of API spend pays for at list price. This is the number that makes Sol look like a steal."
      source={
        <>
          My arithmetic from list API prices at standard context length. Prompts over 272K input tokens cost 2x input
          and 1.5x output on GPT-6.1 Sol, so very long contexts buy fewer turns than this.
        </>
      }
      table={{
        columns: ["Model", "Cost per cached turn", "Turns for $200"],
        rows: rows.map((row) => [row.series.label, usd(turnCost(row, true)), count(row.turns)]),
      }}
    >
      <BarChart
        series={series}
        max={800}
        format={count}
        labelWidth="8.5rem"
        labelRoom="3.5rem"
        groups={rows.map((row) => ({
          label: row.series.label,
          bars: [
            {
              series: "turns",
              value: row.turns,
              tip: {
                title: row.series.label,
                rows: [
                  { value: count(row.turns), label: "agent turns for $200", color: series[0].color },
                  { value: usd(turnCost(row, true)), label: "per turn" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function CostPerTaskChart() {
  const tasks = [
    { series: sol, cost: 5.47 },
    { series: opus, cost: 23.21 },
    { series: astra, cost: 23.8 },
  ];
  return (
    <ChartFigure
      title="Same benchmark, about a quarter of the bill"
      description="Average cost per task on Terminal-Bench Science 0.1, a long-running scientific research benchmark. Astra scored highest (68.1%); Sol more than doubled GPT-6 Sol's score."
      source={
        <>
          Source: OpenAI&rsquo;s GPT-6.1 Sol launch post, as reported by The Next Web and Developers Digest. These are
          OpenAI&rsquo;s own numbers, not an independent evaluation.
        </>
      }
      table={{
        columns: ["Model", "Average cost per task"],
        rows: tasks.map((task) => [task.series.label, usd(task.cost)]),
      }}
    >
      <BarChart
        series={tasks.map((task) => task.series)}
        max={25}
        format={usd}
        labelWidth="8.5rem"
        labelRoom="4rem"
        groups={tasks.map((task) => ({
          label: task.series.label,
          bars: [{ series: task.series.key, value: task.cost }],
        }))}
      />
    </ChartFigure>
  );
}

export function ThroughputChart() {
  const series = [{ key: "turns", label: "Agent turns a minute", color: "var(--viz-openai)" }];
  // GPT-6.1 Sol's standard API rate limits, in tokens a minute.
  const tiers = [
    { tier: "Tier 1", rpm: 500, tpm: 500_000 },
    { tier: "Tier 2", rpm: 5_000, tpm: 1_000_000 },
    { tier: "Tier 3", rpm: 5_000, tpm: 2_000_000 },
    { tier: "Tier 4", rpm: 10_000, tpm: 4_000_000 },
    { tier: "Tier 5", rpm: 15_000, tpm: 40_000_000 },
  ];
  const turns = (tpm: number) => tpm / INPUT;
  const format = (value: number) => (value < 10 ? value.toFixed(1) : count(value));
  return (
    <ChartFigure
      title="Cheap per token is not the same as cheap to run"
      description="How many 200K-token agent turns a minute each API tier lets through on GPT-6.1 Sol, counting input tokens only. A new account can run two or three. Tier 5 can run 200. Same model, same price, an 80x difference in what you can actually do with it."
      source={
        <>
          Source: OpenAI&rsquo;s GPT-6.1 Sol model page, standard rate limits. Tiers unlock with your spending history on
          the API, not with a subscription. The turns are my arithmetic: tokens a minute divided by 200K.
        </>
      }
      table={{
        columns: ["Tier", "Requests a minute", "Tokens a minute", "200K-token turns a minute"],
        rows: tiers.map((row) => [row.tier, count(row.rpm), count(row.tpm), format(turns(row.tpm))]),
      }}
    >
      <BarChart
        series={series}
        max={200}
        format={format}
        labelWidth="4.5rem"
        labelRoom="3rem"
        groups={tiers.map((row) => ({
          label: row.tier,
          bars: [
            {
              series: "turns",
              value: turns(row.tpm),
              tip: {
                title: `GPT-6.1 Sol, ${row.tier}`,
                rows: [
                  { value: format(turns(row.tpm)), label: "200K-token turns a minute", color: series[0].color },
                  { value: count(row.tpm), label: "tokens a minute" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function PlanMessagesChart() {
  const series = [
    { key: "low", label: "Low end of the range", color: "var(--viz-previous)" },
    { key: "high", label: "High end of the range", color: "var(--viz-openai)" },
  ];
  // Codex messages per five-hour window on Plus, from OpenAI's Codex pricing page.
  const models = [
    { model: "GPT-6 Astra", low: 5, high: 45 },
    { model: "GPT-6 Sol", low: 15, high: 150 },
    { model: "GPT-6.1 Sol", low: 15, high: 160 },
  ];
  return (
    <ChartFigure
      title="On a $20 plan, the cheap model is still a rationed one"
      description="Codex messages per five-hour window on ChatGPT Plus. The range is that wide because a message that reads your whole repository costs more than one that fixes a typo. GPT-6.1 Sol at a fifth of Astra's price gets you three to three and a half times Astra's messages, not five."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Source: OpenAI&rsquo;s Codex pricing page, as summarised by Developers Digest. Plus also has a weekly cap on
          top. Pro plans have no five-hour window, only weekly allowances, and Pro $200 is now 10x Plus instead of 20x.
        </>
      }
      table={{
        columns: ["Model", "Messages per 5 hours on Plus"],
        rows: models.map((row) => [row.model, `${row.low}–${row.high}`]),
      }}
    >
      <BarChart
        series={series}
        max={160}
        format={count}
        labelWidth="7rem"
        labelRoom="3rem"
        groups={models.map((row) => ({
          label: row.model,
          bars: [
            { series: "low", value: row.low },
            { series: "high", value: row.high },
          ],
        }))}
      />
    </ChartFigure>
  );
}

/** Price per token is only the first of three things that decide what a model
 *  actually costs you to use. */
export function PriceVsCapacityDiagram() {
  const steps = [
    {
      label: "Price per token",
      detail: "What the launch post and the pricing page tell you.",
      example: "$2 / $10",
      tone: "good",
    },
    {
      label: "Tokens you're allowed",
      detail: "Your plan's allowance, or your API tier's tokens a minute.",
      example: "10x Plus, or 0.5M–40M a minute",
      tone: "caution",
    },
    {
      label: "Tokens you actually get",
      detail: "Whether the model is up and has room when you send them.",
      example: "“at capacity”",
      tone: "caution",
    },
    {
      label: "What the work costs you",
      detail: "Money, plus the hours you spend waiting, retrying or switching.",
      example: "The only number that matters",
      tone: "neutral",
    },
  ] as const;
  const toneColor = { good: "var(--viz-good)", caution: "var(--viz-caution)", neutral: "var(--viz-ink)" };

  return (
    <figure className="viz not-prose my-10 rounded-2xl border border-gray-200 bg-(--viz-surface) p-5 sm:p-7 dark:border-white/10">
      <figcaption>
        <p className="leading-snug font-semibold tracking-tight text-balance text-(--viz-ink)">
          The price is only the first step
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-(--viz-ink-2)">
          Benchmarks and pricing pages describe the first box. Heavy users live in the other three.
        </p>
      </figcaption>
      <ol className="mt-6 grid gap-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className="relative rounded-xl border border-(--viz-grid) p-4"
            style={{ borderTop: `3px solid ${toneColor[step.tone]}` }}
          >
            <p className="text-xs font-medium text-(--viz-muted)">
              {index === 0 ? "Start" : index === steps.length - 1 ? "Result" : "Then"}
            </p>
            <p className="mt-1 text-sm font-semibold text-(--viz-ink)">{step.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-(--viz-ink-2)">{step.detail}</p>
            <p className="mt-3 text-xs font-semibold tabular-nums" style={{ color: toneColor[step.tone] }}>
              {step.example}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

