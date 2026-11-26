// Charts for content/blogs/how-to-monitor-aws-without-a-soc-team.mdx.
// Every number is from a source named under its chart, as of November 26, 2026.
// The 4.2 analysts and the $542,556 are my arithmetic, shown in the chart's table.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import StatTiles from "@/components/charts/stat-tiles";
import type { Series } from "@/components/charts/utils";

const attacker: Series = { key: "attacker", label: "Attacker", color: "var(--viz-caution)" };
const aws: Series = { key: "aws", label: "AWS, automatic", color: "var(--viz-product)" };

/** Minutes after a credential leaks or is stolen. */
const clock = [
  {
    step: "AWS quarantines a key leaked on GitHub",
    series: "aws",
    minutes: 10 / 60,
    label: "10 seconds",
    source: "Unit 42, one test, December 2025",
  },
  {
    step: "Leaked key first used",
    series: "attacker",
    minutes: 5,
    label: "5 minutes",
    source: "Unit 42, October 2023",
  },
  {
    step: "CloudTrail delivers the event",
    series: "aws",
    minutes: 5,
    label: "about 5 minutes",
    source: "AWS CloudTrail User Guide: an average, not a guarantee",
  },
  {
    step: "Leaked key used, on average",
    series: "attacker",
    minutes: 6.6,
    label: "6.6 minutes",
    source: "Clutch Security, December 2024",
  },
  {
    step: "Attacker code running in Lambda",
    series: "attacker",
    minutes: 8,
    label: "8 minutes",
    source: "Sysdig, incident of November 28, 2025",
  },
];

const inHouse: Series = { key: "in-house", label: "4.2 analysts, wages only", color: "var(--viz-previous)" };
const jutsu: Series = { key: "jutsu", label: "Jutsu Startup plan", color: "var(--viz-jutsu)" };
const guardDuty: Series = { key: "guardduty", label: "GuardDuty, AWS's own example", color: "var(--viz-money)" };

const HOURS_IN_A_WEEK = 168;
const FULL_TIME_WEEK = 40;
const MEDIAN_WAGE = 129_180; // BLS, information security analysts, May 2025
const ANALYSTS = HOURS_IN_A_WEEK / FULL_TIME_WEEK; // 4.2
const SEAT_WAGES = ANALYSTS * MEDIAN_WAGE; // 542,556

/** A year of each, in US dollars. */
const yearly = [
  { what: "One analyst seat, 24/7", series: "in-house", value: SEAT_WAGES, how: "4.2 analysts x $129,180" },
  { what: "Jutsu Startup", series: "jutsu", value: 3_588, how: "$299 a month, billed yearly" },
  { what: "GuardDuty", series: "guardduty", value: 160 * 12, how: "40 million CloudTrail events a month x $4.00 per million" },
];

const usd = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

export function AtAGlance() {
  return (
    <StatTiles
      title="Monitoring an AWS account, in four numbers"
      tiles={[
        {
          label: "Leaked key to first use",
          value: "5 min",
          detail: "Unit 42, keys exposed on public GitHub",
          trend: "caution",
        },
        {
          label: "CloudTrail delivery",
          value: "~5 min",
          detail: "AWS's stated average, not a guarantee",
          trend: "flat",
        },
        {
          label: "People to fill one 24/7 seat",
          value: "4.2",
          detail: "168 hours in a week, 40 in a working one",
          trend: "caution",
        },
        {
          label: "GuardDuty, after 30 free days",
          value: "$4.00",
          detail: "Per million CloudTrail management events, US East",
          trend: "up",
          good: true,
        },
      ]}
      footer={
        <>
          Sources: Unit 42, the AWS CloudTrail User Guide and the Amazon GuardDuty pricing page, read on November 26,
          2026. The 4.2 is arithmetic.
        </>
      }
    />
  );
}

export function AttackClockChart() {
  const series = [attacker, aws];
  return (
    <ChartFigure
      title="The attacker's clock and AWS's clock"
      description="Minutes after a credential leaks or is stolen. AWS reacts to a GitHub leak in seconds, but the log you'd build an alert on arrives at about the same moment the attacker starts work."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Sources: Unit 42 (October 2023 and September 2026), Clutch Security (December 2024), Sysdig (February 2026)
          and the AWS CloudTrail User Guide.
        </>
      }
      table={{
        columns: ["Step", "Who", "Time", "Source"],
        rows: clock.map((row) => [
          row.step,
          row.series === "aws" ? aws.label : attacker.label,
          row.label,
          row.source,
        ]),
      }}
    >
      <BarChart
        series={series}
        max={10}
        format={(value) => `${value} min`}
        labelWidth="13rem"
        labelRoom="9rem"
        groups={clock.map((row) => ({
          label: row.step,
          bars: [
            {
              series: row.series,
              value: row.minutes,
              label: row.label,
              tip: { title: row.step, rows: [{ value: row.label, label: row.source }] },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}

export function SeatCostChart() {
  const series = [inHouse, jutsu, guardDuty];
  return (
    <ChartFigure
      title="One 24/7 seat costs more than most startups' whole cloud bill"
      description="A year of each, in US dollars. The first bar is wages only: no benefits, holidays, tools or manager. The other two are software, and software is not a team."
      legend={{ series, mark: "bar" }}
      source={
        <>
          Sources: US Bureau of Labor Statistics (median wage, May 2025), the Amazon GuardDuty pricing page (its own
          40-million-event example) and Jutsu&rsquo;s pricing page, read on November 26, 2026. The 4.2 analysts is 168
          hours divided by a 40-hour week.
        </>
      }
      table={{
        columns: ["What", "A year", "How it's worked out"],
        rows: yearly.map((row) => [row.what, usd(row.value), row.how]),
      }}
    >
      <BarChart
        series={series}
        max={SEAT_WAGES}
        format={usd}
        labelWidth="11rem"
        labelRoom="7rem"
        groups={yearly.map((row) => ({
          label: row.what,
          bars: [
            {
              series: row.series,
              value: row.value,
              tip: { title: row.what, rows: [{ value: usd(row.value), label: row.how }] },
            },
          ],
        }))}
      />
    </ChartFigure>
  );
}
