// Charts for content/blogs/chatgpt-pro-200-is-back-with-half-the-usage.mdx.
// Every number is from a source named under its chart, as of September 30, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import LineChart from "@/components/charts/line-chart";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const before: Series = { key: "before", label: "Until October 29", color: "var(--viz-previous)" };
const after: Series = { key: "after", label: "From October 30", color: "var(--viz-openai)" };
const claude: Series = { key: "claude", label: "Claude (Anthropic)", color: "var(--viz-anthropic)" };

/** OpenAI's consumer plans: monthly price, and usage as a multiple of Plus.
 *  Pro $500 didn't exist before DevDay, so it has no "before". */
const openai = [
  { plan: "Plus", price: 20, before: 1, after: 1 },
  { plan: "Pro $100", price: 100, before: 5, after: 5 },
  { plan: "Pro $200", price: 200, before: 20, after: 10 },
  { plan: "Pro $500", price: 500, before: null, after: 25 },
];

/** Anthropic's plans: monthly price, and usage as a multiple of Pro. */
const anthropic = [
  { plan: "Pro", price: 20, multiple: 1 },
  { plan: "Max 5x", price: 100, multiple: 5 },
  { plan: "Max 20x", price: 200, multiple: 20 },
];

const usd = (value: number) => `$${value}`;
const times = (value: number) => `${value}x`;
const percentage = (value: number) => `${Math.round(value * 100)}%`;

const openaiSource = (
  <>
    Sources: OpenAI&rsquo;s DevDay 2026 announcements and the OpenAI Help Center article on ChatGPT Pro tiers, as
    reported by The Next Web, Engadget and BGR.
  </>
);

export function AtAGlance() {
  return (
    <StatTiles
      title="ChatGPT Pro $200, before and after"
      tiles={[
        {
          label: "Codex and Work usage, vs. Plus",
          value: "20x → 10x",
          detail: "Halved for new subscribers now, everyone else on October 30",
          trend: "down",
        },
        {
          label: "What 1x of Plus usage costs",
          value: "$10 → $20",
          detail: "The same as on Plus itself: no bulk discount left",
          trend: "caution",
        },
        {
          label: "GPT-6 Pro messages a week",
          value: "200 → 100",
          detail: "In ChatGPT, on the same $200 plan",
          trend: "down",
        },
        {
          label: "Claude Max 20x, for comparison",
          value: "$10",
          detail: "Per 1x of Claude Pro, with limits raised twice this year",
          trend: "up",
          good: true,
        },
      ]}
      footer={
        <>
          Sign-ups for Pro $200 were paused from September 10 and reopen today, September 30, at the new rate.
          Existing subscribers keep the old quota until October 29 and get a one-time $2,500 usage credit that
          expires at the end of 2026. Sources: OpenAI, Anthropic.
        </>
      }
    />
  );
}

export function PricePerUsageChart() {
  const series = [before, after];
  return (
    <ChartFigure
      title="Every ChatGPT plan now costs the same per unit of usage"
      description="What each plan charges for one Plus-worth of Codex and ChatGPT Work usage: the monthly price divided by its multiple of Plus. Lower is better value."
      legend={{ series, mark: "bar" }}
      source={openaiSource}
      table={{
        columns: ["Plan", "Price a month", "Usage before", "Usage after", "Per 1x before", "Per 1x after"],
        rows: openai.map(({ plan, price, before, after }) => [
          plan,
          usd(price),
          before === null ? "didn't exist" : times(before),
          times(after),
          before === null ? "–" : usd(price / before),
          usd(price / after),
        ]),
      }}
    >
      <BarChart
        series={series}
        max={25}
        format={usd}
        labelWidth="6rem"
        labelRoom="9rem"
        groups={openai.map(({ plan, price, before: old, after: now }) => ({
          label: plan,
          bars: [
            // Pro $500 is new, so it only has an "after" bar.
            ...(old === null
              ? []
              : [
                  {
                    series: "before",
                    value: price / old,
                    tip: {
                      title: `${plan}, until October 29`,
                      rows: [
                        { value: usd(price / old), label: "per 1x of Plus", color: before.color },
                        { value: times(old), label: "Plus usage" },
                      ],
                    },
                  },
                ]),
            {
              series: "after",
              value: price / now,
              note: old !== null && price / now > price / old ? "doubled" : undefined,
              tip: {
                title: `${plan}, from October 30`,
                rows: [
                  { value: usd(price / now), label: "per 1x of Plus", color: after.color },
                  { value: times(now), label: "Plus usage" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function PlanLadderChart() {
  // Until October 29, ChatGPT's plans sat exactly on Claude's line, so only
  // the new lineup is drawn; the old one is in the description and table.
  const openaiAfter: Series = { key: "openai-after", label: "ChatGPT, from October 30", color: after.color };
  const series = [openaiAfter, claude];
  const points = {
    "openai-after": openai.map((row) => ({ x: row.price, y: row.after, name: row.plan })),
    claude: anthropic.map((row) => ({ x: row.price, y: row.multiple, name: row.plan })),
  };

  return (
    <ChartFigure
      title="A straight line means no discount for paying more"
      description="Monthly price against usage, as a multiple of each company's $20 plan. ChatGPT's plans now sit on one straight line: $500 buys exactly 25 times what $20 does. Claude's $200 plan still bends upward, exactly as ChatGPT's did until October 29."
      legend={{ series, mark: "line" }}
      source={
        <>
          {openaiSource} Anthropic&rsquo;s tiers are from its Max plan help article. Each company measures against
          its own $20 plan, so a multiple on one isn&rsquo;t the same amount of work as on the other.
        </>
      }
      table={{
        columns: ["Plans", "Plan", "Price a month", "Usage vs. the $20 plan"],
        rows: [
          ...openai
            .filter((row) => row.before !== null)
            .map((row) => ["ChatGPT, until October 29", row.plan, usd(row.price), times(row.before as number)]),
          ...series.flatMap((item) =>
            points[item.key as keyof typeof points].map((point) => [item.label, point.name, usd(point.x), times(point.y)])
          ),
        ],
      }}
    >
      <LineChart
        series={series}
        points={points}
        x={{ domain: [0, 520], ticks: [0, 100, 200, 300, 400, 500], format: usd, title: "Price a month" }}
        y={{ domain: [0, 26], ticks: [0, 5, 10, 15, 20, 25], format: times, title: "Usage, as a multiple of the $20 plan" }}
        endLabels={{ "openai-after": "left", claude: "right" }}
        describe={(item, point) => ({
          title: `${point.name}, ${item.label}`,
          rows: [
            { value: times(point.y), label: "the $20 plan's usage" },
            { value: usd(point.x / point.y), label: "per 1x" },
          ],
        })}
      />
    </ChartFigure>
  );
}

export function TwoHundredDollarsChart() {
  const series = [before, after, claude];
  const rows = [
    { label: "ChatGPT Pro $200", sublabel: "until October 29", series: "before", value: 20 },
    { label: "ChatGPT Pro $200", sublabel: "from October 30", series: "after", value: 10 },
    { label: "Claude Max 20x", sublabel: "today", series: "claude", value: 20 },
  ];
  return (
    <ChartFigure
      title="What $200 a month buys"
      description="Usage as a multiple of each company's own $20 plan."
      legend={{ series, mark: "bar" }}
      source={
        <>
          {openaiSource} Claude: Anthropic&rsquo;s Max plan help article. The two companies&rsquo; $20 plans
          aren&rsquo;t the same size, so compare the direction of travel, not the exact amounts.
        </>
      }
      table={{
        columns: ["Plan", "When", "Usage vs. the $20 plan"],
        rows: rows.map((row) => [row.label, row.sublabel, times(row.value)]),
      }}
    >
      <BarChart
        series={series}
        max={20}
        format={times}
        labelWidth="9rem"
        labelRoom="5rem"
        groups={rows.map((row) => ({
          label: `${row.label}, ${row.sublabel}`,
          bars: [{ series: row.series, value: row.value, note: row.series === "after" ? "−50%" : undefined }],
        }))}
      />
    </ChartFigure>
  );
}

export function ModelAllowanceChart() {
  const series = [{ key: "tokens", label: "Tokens you get", color: "var(--viz-openai)" }];
  // The allowance is worth half as many API dollars. Tokens you can buy with
  // it = half the budget ÷ (new price ÷ old price).
  const models = [
    { model: "GPT-6 Sol", detail: "$2 / $10, down from GPT-5.6 Sol's $4 / $20", share: 1 },
    { model: "GPT-6 Luna, output", detail: "$0.50, down from $1.20", share: 0.5 * (1.2 / 0.5) },
    { model: "GPT-6 Luna, input", detail: "$0.10, down from $0.20", share: 1 },
    { model: "GPT-6 Astra", detail: "$10 / $50, unchanged", share: 0.5 },
    { model: "GPT-5.6 Sol", detail: "$4 / $20, still on sale", share: 0.5 },
  ];
  return (
    <ChartFigure
      title="The cut only hides where OpenAI also cut the API price"
      description="How many tokens the new Pro $200 allowance buys, compared with the old one, for each model. 100% means no change. The model most people paid $200 for, GPT-6 Astra, gets half."
      source={
        <>
          My arithmetic from OpenAI&rsquo;s stated rule (half the API-dollar value of the old plan) and its API
          prices per million tokens, before and after the September 22 price cuts. OpenAI hasn&rsquo;t published the
          dollar amount itself, only the ratio.
        </>
      }
      table={{
        columns: ["Model", "API price per 1M tokens", "Tokens vs. the old Pro $200"],
        rows: models.map(({ model, detail, share }) => [model, detail, percentage(share)]),
      }}
    >
      <BarChart
        series={series}
        max={1.3}
        format={percentage}
        labelWidth="9rem"
        labelRoom="4rem"
        groups={models.map(({ model, detail, share }) => ({
          label: model,
          bars: [
            {
              series: "tokens",
              value: share,
              tip: {
                title: model,
                rows: [
                  { value: percentage(share), label: "of the old allowance's tokens", color: series[0].color },
                  { value: detail, label: "per 1M tokens" },
                ],
              },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}
