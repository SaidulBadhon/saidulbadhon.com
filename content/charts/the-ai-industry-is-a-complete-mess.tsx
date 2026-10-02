// Charts for content/blogs/the-ai-industry-is-a-complete-mess.mdx.
// Every number is from a source named under its chart, as of October 2, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const billions = (value: number) => `$${Math.round(value)}B`;
const count = (value: number) => Math.round(value).toLocaleString("en-US");
const days = (value: number) => `${value} days`;

export function AtAGlance() {
  return (
    <StatTiles
      title="AI in 2026: better models, messier industry"
      tiles={[
        {
          label: "Vulnerabilities found by Claude Mythos",
          value: "10,000+",
          detail: "High or critical, across Project Glasswing partners, in about a month",
          trend: "up",
          good: true,
        },
        {
          label: "Events in the Hugging Face intrusion",
          value: "17,000+",
          detail: "Run end to end by OpenAI agents that got out of a test sandbox",
          trend: "caution",
        },
        {
          label: "Big Tech capex, 2026",
          value: "~$730B",
          detail: "Amazon, Alphabet, Microsoft and Meta guidance. Nearly triple 2024",
          trend: "up",
        },
        {
          label: "OpenAI’s projected cash burn, 2026",
          value: "$25B",
          detail: "Rising to $85B in 2028, by its own forecast",
          trend: "caution",
        },
      ]}
      footer={
        <>
          Sources: Anthropic&rsquo;s Project Glasswing update (May 22), Hugging Face&rsquo;s incident report (July 16),
          company guidance from Q2 2026 earnings, and OpenAI&rsquo;s projections as reported by The Information in
          February.
        </>
      }
    />
  );
}

type Kind = "agents" | "money" | "product";

const kinds: Record<Kind, { label: string; color: string }> = {
  agents: { label: "Agents and security", color: "var(--viz-agents)" },
  money: { label: "Money", color: "var(--viz-money)" },
  product: { label: "Product and capacity", color: "var(--viz-product)" },
};

const events: { date: string; kind: Kind; text: string }[] = [
  {
    date: "Apr 7",
    kind: "agents",
    text: "Anthropic announces Claude Mythos Preview, which finds zero-days in every major OS and browser, and keeps it from general release.",
  },
  {
    date: "May 11–12",
    kind: "agents",
    text: "More than 2,000 malicious packages flood RubyGems. New sign-ups are switched off for four days.",
  },
  { date: "May 28", kind: "money", text: "Anthropic raises $65 billion at a $965 billion valuation." },
  {
    date: "Jun 18",
    kind: "agents",
    text: "An OpenAI agent gets into Australia's Medicare statistics portal. Nobody notices for 54 days.",
  },
  {
    date: "Jul 9–13",
    kind: "agents",
    text: "OpenAI agents running a cyber evaluation break into Hugging Face. OpenAI later confirms they were its models.",
  },
  {
    date: "Jul 30",
    kind: "money",
    text: "Amazon raises its 2026 capex to $220 billion and says it still won't have enough capacity.",
  },
  { date: "Sep 3", kind: "product", text: "GPT-6 Astra launches. ChatGPT goes down the same morning." },
  {
    date: "Sep 10",
    kind: "product",
    text: "OpenAI pauses ChatGPT Pro $200 sign-ups over Astra demand, and emails Services Australia's public mailbox about the breach.",
  },
  {
    date: "Sep 12",
    kind: "agents",
    text: "Researchers trace the RubyGems attack to OpenAI agents. OpenAI says they were doing “benign tasks.”",
  },
  {
    date: "Sep 24",
    kind: "agents",
    text: "Australia's prime minister goes public: the agent “didn't accept ‘no’ for an answer.”",
  },
  {
    date: "Sep 28",
    kind: "agents",
    text: "The UK AI Security Institute says GPT-6 Astra ran unsanctioned supply-chain attacks in testing. The WSJ reports GPT-6.1 Astra is shelved.",
  },
  {
    date: "Sep 28",
    kind: "money",
    text: "Anthropic's IPO filing shows an $8 billion operating loss for 2025, on $4.6 billion of revenue.",
  },
  {
    date: "Sep 29",
    kind: "product",
    text: "DevDay: GPT-6.1 Sol launches, Pro $200 is cut in half, and the live agent demo stalls on stage.",
  },
  { date: "Sep 29", kind: "money", text: "OpenAI is reported to be raising at a $1.4 trillion valuation." },
];

/** Six months of AI news, sorted into three kinds of mess. */
export function MessTimeline() {
  return (
    <figure className="viz not-prose my-10 rounded-2xl border border-gray-200 bg-(--viz-surface) p-5 sm:p-7 dark:border-white/10">
      <figcaption>
        <p className="leading-snug font-semibold tracking-tight text-balance text-(--viz-ink)">
          Six months of AI news, in one list
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-(--viz-ink-2)">
          Only events with a source I could check. Every one of them happened in 2026.
        </p>
      </figcaption>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-(--viz-ink-2)">
        {Object.values(kinds).map((kind) => (
          <li key={kind.label} className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: kind.color }} />
            {kind.label}
          </li>
        ))}
      </ul>
      <ol className="mt-6 border-l border-(--viz-axis)">
        {events.map((event) => (
          <li key={event.date + event.text} className="relative grid gap-x-4 pb-4 pl-5 last:pb-0 sm:grid-cols-[5rem_1fr]">
            <span
              aria-hidden
              className="absolute top-1.5 -left-[5px] size-2.5 rounded-full"
              style={{ background: kinds[event.kind].color }}
            />
            <p className="text-xs font-semibold text-(--viz-ink) tabular-nums sm:pt-px">{event.date}</p>
            <p className="text-sm leading-relaxed text-(--viz-ink-2)">
              <span className="sr-only">{kinds[event.kind].label}: </span>
              {event.text}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-6 border-t border-(--viz-grid) pt-4 text-xs leading-relaxed text-(--viz-muted)">
        Sources: Anthropic, Hugging Face, The Register, Simon Willison, ABC News, Fortune, TechCrunch, BleepingComputer,
        Futurism, Reuters, Bloomberg and the WSJ, each linked where it comes up in the post.
      </p>
    </figure>
  );
}

export function DisclosureGapChart() {
  const series: Series[] = [
    { key: "actual", label: "The Medicare portal breach", color: "var(--viz-agents)" },
    { key: "law", label: "Reporting deadlines in US state law", color: "var(--viz-context)" },
  ];
  const rows = [
    { label: "Breach to OpenAI finding it", series: "actual", value: 54, dates: "June 18 to August 11" },
    { label: "Finding it to telling Australia", series: "actual", value: 30, dates: "August 11 to September 10" },
    { label: "Telling Australia to the public", series: "actual", value: 14, dates: "September 10 to 24" },
    { label: "California SB 53", series: "law", value: 15, dates: "From discovery of a critical safety incident" },
    { label: "New York RAISE Act", series: "law", value: 3, dates: "72 hours, from January 1, 2027" },
  ];
  return (
    <ChartFigure
      title="98 days from breach to headline"
      description="How long each step took after an OpenAI agent got into Australia's Medicare statistics portal, next to the deadlines two US state laws set for a frontier lab to report a critical safety incident. Neither law covers this case. They're here for scale."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Sources: ABC News (dates, from the Australian government and OpenAI); Wiley on New York&rsquo;s RAISE Act and
          California&rsquo;s SB 53. Both laws require reporting to the state, not to whoever was breached. Day
          counts are my arithmetic.
        </>
      }
      table={{
        columns: ["Step", "Days", "When"],
        rows: rows.map((row) => [row.label, row.value, row.dates]),
      }}
    >
      <BarChart
        series={series}
        max={60}
        format={days}
        labelWidth="11rem"
        labelRoom="4.5rem"
        groups={rows.map((row) => ({
          label: row.label,
          bars: [{ series: row.series, value: row.value, label: row.value === 3 ? "3 days (72 hours)" : undefined }],
        }))}
      />
    </ChartFigure>
  );
}

export function GlasswingChart() {
  const series: Series[] = [
    { key: "ai", label: "Done by the AI", color: "var(--viz-anthropic)" },
    { key: "people", label: "Done by people", color: "var(--viz-context)" },
  ];
  const HIGH_OR_CRITICAL = 6_202;
  const stages = [
    { label: "Vulnerabilities found", series: "ai", value: 23_019 },
    { label: "High or critical (estimated)", series: "ai", value: HIGH_OR_CRITICAL },
    { label: "Disclosed to maintainers", series: "people", value: 530 },
    { label: "Patched", series: "people", value: 75 },
  ];
  const share = (value: number) => `${((value / HIGH_OR_CRITICAL) * 100).toFixed(1)}% of the high or critical`;
  return (
    <ChartFigure
      title="The AI finds bugs faster than people can fix them"
      description="What Claude Mythos Preview found when Anthropic pointed it at more than 1,000 open-source projects, and how many of those bugs had been disclosed and patched by May 22, about six weeks in. Of the 1,752 findings people had checked by then, 90.6% were real."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Source: Anthropic&rsquo;s Project Glasswing update, May 22, 2026. Across all of Glasswing&rsquo;s partners, not
          just open source, Mythos found more than 10,000 high- or critical-severity vulnerabilities in its first month.
        </>
      }
      table={{
        columns: ["Stage", "Count"],
        rows: stages.map((stage) => [stage.label, count(stage.value)]),
      }}
    >
      <BarChart
        series={series}
        max={23_019}
        format={count}
        labelWidth="11rem"
        labelRoom="11rem"
        groups={stages.map((stage) => ({
          label: stage.label,
          bars: [
            {
              series: stage.series,
              value: stage.value,
              note: stage.series === "people" ? share(stage.value) : undefined,
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

// Big Tech capital expenditure. 2024 and 2025 are Epoch AI's totals for
// Microsoft, Amazon, Alphabet, Meta and Oracle (cash capex plus finance-lease
// assets, calendar years). 2026 is the midpoint of each company's guidance
// after Q2 earnings, without Oracle, whose fiscal year runs to May.
const guidance2026 = [
  { company: "Amazon", low: 220, high: 220 },
  { company: "Alphabet", low: 195, high: 205 },
  { company: "Microsoft", low: 175, high: 175 },
  { company: "Meta", low: 130, high: 145 },
];
const total2026 = guidance2026.reduce((sum, row) => sum + (row.low + row.high) / 2, 0);

export function CapexChart() {
  const series: Series[] = [
    { key: "actual", label: "Actual, five companies", color: "var(--viz-previous)" },
    { key: "guidance", label: "2026 guidance, four companies", color: "var(--viz-money)" },
  ];
  const years = [
    { year: "2024", series: "actual", value: 260.4 },
    { year: "2025", series: "actual", value: 448.2 },
    { year: "2026", series: "guidance", value: total2026 },
  ];
  const range = (row: (typeof guidance2026)[number]) =>
    row.low === row.high ? `about $${row.low}B` : `$${row.low}–${row.high}B`;
  return (
    <ChartFigure
      title="Big Tech's AI spending nearly tripled in two years"
      description="Capital expenditure, mostly data centers and the chips inside them. 2026 is what Amazon, Alphabet, Microsoft and Meta told investors they'd spend after their July earnings, before Oracle and before anything they add in the second half."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Sources: Epoch AI for 2024 and 2025 (Microsoft, Amazon, Alphabet, Meta and Oracle). 2026 is the midpoint of
          company guidance: Amazon ~$220B (Fortune), Alphabet $195&ndash;205B, Microsoft ~$175B for the calendar year,
          Meta $130&ndash;145B (its Q2 8-K). Oracle alone spent $55.7B in its fiscal year to May 2026.
        </>
      }
      table={{
        columns: ["Year or company", "Capex"],
        rows: [
          ...years.map((row) => [row.year, billions(row.value)]),
          ...guidance2026.map((row) => [`2026: ${row.company}`, range(row)]),
        ],
      }}
    >
      <BarChart
        series={series}
        max={760}
        format={billions}
        labelWidth="3.5rem"
        labelRoom="4rem"
        groups={years.map((row) => ({
          label: row.year,
          bars: [
            {
              series: row.series,
              value: row.value,
              label: row.series === "guidance" ? `~$${Math.round(row.value / 10) * 10}B` : undefined,
              tip:
                row.series === "guidance"
                  ? {
                      title: "2026 guidance",
                      rows: [
                        { value: billions(row.value), label: "four companies", color: series[1].color },
                        ...guidance2026.map((company) => ({ value: range(company), label: company.company })),
                      ],
                    }
                  : undefined,
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function RevenueVsLossChart() {
  const series: Series[] = [
    { key: "revenue", label: "Revenue", color: "var(--viz-good)" },
    { key: "loss", label: "Operating loss", color: "var(--viz-caution)" },
  ];
  const labs = [
    { lab: "OpenAI", revenue: 13.07, loss: 20.92 },
    { lab: "Anthropic", revenue: 4.6, loss: 8.06 },
  ];
  const format = (value: number) => `$${value.toFixed(1)}B`;
  return (
    <ChartFigure
      title="In 2025, both leading labs lost more than they made"
      description="Revenue and operating loss for 2025, before the one-off accounting charges that make both companies' net losses look even bigger. Both are growing very fast. Neither is close to paying for itself yet."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Sources: OpenAI&rsquo;s audited 2025 financials, as reported by Ed Zitron, who says the Financial Times
          independently verified them (OpenAI hasn&rsquo;t published them). Anthropic&rsquo;s IPO filing, as reported by
          Reuters on September 28, 2026.
        </>
      }
      table={{
        columns: ["Lab", "2025 revenue", "2025 operating loss"],
        rows: labs.map((row) => [row.lab, format(row.revenue), format(row.loss)]),
      }}
    >
      <BarChart
        series={series}
        max={22}
        format={format}
        labelWidth="5.5rem"
        labelRoom="3.5rem"
        groups={labs.map((row) => ({
          label: row.lab,
          bars: [
            { series: "revenue", value: row.revenue },
            { series: "loss", value: row.loss },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function OpenAIBurnChart() {
  const series: Series[] = [{ key: "burn", label: "Projected cash burn", color: "var(--viz-money)" }];
  const years = [
    { year: "2026", burn: 25 },
    { year: "2027", burn: 57 },
    { year: "2028", burn: 85 },
    { year: "2029", burn: 51 },
  ];
  const total = years.reduce((sum, row) => sum + row.burn, 0);
  return (
    <ChartFigure
      title="OpenAI's own plan: burn $218 billion, then turn a profit"
      description="The cash OpenAI expects to burn each year, from projections it shared with investors in February. The plan has it turning cash-positive in 2030, with $39 billion. The forecast was revised up by about $111 billion from the previous one."
      source={
        <>
          Source: The Information, February 2026, as reported by The Decoder. These are OpenAI&rsquo;s projections, not
          results, and they predate the Astra launch and the Pro $200 changes. The four-year total is my arithmetic.
        </>
      }
      table={{
        columns: ["Year", "Projected cash burn"],
        rows: [...years.map((row) => [row.year, billions(row.burn)]), ["2026–2029", billions(total)]],
      }}
    >
      <BarChart
        series={series}
        max={90}
        format={billions}
        labelWidth="3.5rem"
        labelRoom="3.5rem"
        groups={years.map((row) => ({
          label: row.year,
          bars: [{ series: "burn", value: row.burn }],
        }))}
      />
    </ChartFigure>
  );
}
