// Charts for content/blogs/jutsu-compliance-ai-drafts-a-person-signs.mdx.
// Jutsu Inc. numbers: a real workspace set up on Jutsu's staging environment on October 17, 2026
// (walkthrough: https://www.youtube.com/watch?v=306cqZcS9D4). Catalog counts: Jutsu's compliance
// catalog, counted from its code on October 18, 2026.
import BarChart from "@/components/charts/bar-chart";
import ChartFigure from "@/components/charts/chart-figure";
import StatTiles from "@/components/charts/stat-tiles";

const workspaceSource = (
  <>
    Source: the Jutsu Inc. workspace in <a href="https://jutsu.ai">Jutsu</a>, set up October 17, 2026, as recorded in
    the <a href="https://www.youtube.com/watch?v=306cqZcS9D4">walkthrough video</a>.
  </>
);

export function AtAGlance() {
  return (
    <StatTiles
      title="Jutsu's Compliance module, on a brand-new company"
      tiles={[
        {
          label: "Setup questions",
          value: "13",
          detail: "One per screen; company name and website come from the workspace",
          trend: "flat",
        },
        {
          label: "Time to build the program",
          value: "Under 4 min",
          detail: "SOC 2 and ISO 27001 together, every step finished",
          trend: "down",
          good: true,
        },
        {
          label: "Drafts waiting for a person",
          value: "32 + 86 + 25",
          detail: "Policies, recurring evidence tasks and company records",
          trend: "flat",
        },
        {
          label: "Readiness on day one",
          value: "0% → 2%",
          detail: "After one policy, one task and one record. It only counts finished work",
          trend: "up",
          good: true,
        },
      ]}
      footer={<>Nothing was published, assigned or accepted until a person did it. {workspaceSource}</>}
    />
  );
}

const built = [
  { label: "Controls", value: 141 },
  { label: "Recurring evidence tasks", value: 86 },
  { label: "Policy drafts", value: 32 },
  { label: "Company records to keep", value: 25 },
  { label: "Suggested risks", value: 12 },
  { label: "Suggested vendors", value: 7 },
];

export function SetupChart() {
  const series = [{ key: "built", label: "Built by setup", color: "var(--viz-jutsu)" }];
  return (
    <ChartFigure
      title="13 answers became a whole program"
      description="What setup built for Jutsu Inc. after picking SOC 2 and ISO 27001, all of it as drafts or suggestions. The 141 controls cover 61 SOC 2 requirements and 118 ISO 27001 requirements, because one control can count for both."
      source={workspaceSource}
      table={{ columns: ["What setup built", "Count"], rows: built.map(({ label, value }) => [label, value]) }}
    >
      <BarChart
        series={series}
        max={150}
        format={(value) => String(value)}
        labelWidth="11rem"
        labelRoom="3rem"
        groups={built.map(({ label, value }) => ({ label, bars: [{ series: "built", value }] }))}
      />
    </ChartFigure>
  );
}

export function ScoreTiles() {
  return (
    <StatTiles
      title="How Jutsu Inc.'s 2% was counted: the average of four parts"
      tiles={[
        { label: "Policies", value: "3%", detail: "1 of 32 published and up to date", trend: "up", good: true },
        { label: "Evidence", value: "1%", detail: "1 of 86 tasks done for this period", trend: "up", good: true },
        { label: "Documents", value: "4%", detail: "1 of 25 company records current", trend: "up", good: true },
        { label: "People", value: "0%", detail: "0 of 1 people have finished their steps", trend: "flat" },
      ]}
      footer={
        <>
          (3 + 1 + 4 + 0) ÷ 4 = 2%. It counts work your team has finished, not audit results, and leaves out anything
          marked not relevant. {workspaceSource}
        </>
      }
    />
  );
}

const frameworks = [
  { name: "HIPAA", requirements: 157 },
  { name: "ISO 27001", requirements: 118 },
  { name: "PCI DSS", requirements: 70 },
  { name: "ISO 42001", requirements: 65 },
  { name: "SOC 2", requirements: 61 },
  { name: "GDPR", requirements: 56 },
  { name: "CIS Controls (IG1)", requirements: 56 },
  { name: "CCPA/CPRA", requirements: 38 },
  { name: "ISO 9001", requirements: 36 },
  { name: "NIST CSF", requirements: 22 },
  { name: "NIS2", requirements: 22 },
  { name: "Cyber Essentials", requirements: 15 },
  { name: "Essential Eight", requirements: 8 },
];

export function FrameworksChart() {
  const series = [{ key: "requirements", label: "Requirements", color: "var(--viz-jutsu)" }];
  return (
    <ChartFigure
      title="13 frameworks, 724 requirements, 184 shared controls"
      description="Requirements per framework in Jutsu's compliance catalog. Every paid plan includes all 13, and the controls behind them are shared, so a second framework can reuse work already done for the first."
      source={<>Source: Jutsu's compliance catalog, counted from its code on October 18, 2026.</>}
      table={{
        columns: ["Framework", "Requirements"],
        rows: frameworks.map(({ name, requirements }) => [name, requirements]),
      }}
    >
      <BarChart
        series={series}
        max={160}
        format={(value) => String(value)}
        labelWidth="10rem"
        labelRoom="3rem"
        groups={frameworks.map(({ name, requirements }) => ({
          label: name,
          bars: [{ series: "requirements", value: requirements }],
        }))}
      />
    </ChartFigure>
  );
}
