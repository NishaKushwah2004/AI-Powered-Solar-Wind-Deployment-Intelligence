import {
  ResourceRadarChart,
  ScoreBreakdownChart,
  SolarVsWindChart,
} from "../charts";

export default function ScoreSection({
  metrics,
}) {
  if (!metrics) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Resource Score Analysis
        </h2>

        <p className="mt-2 text-slate-500">
          Weighted renewable resource
          assessment across environmental,
          geographic and infrastructure
          factors.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ScoreBreakdownChart
          metrics={metrics}
        />

        <SolarVsWindChart
          metrics={metrics}
        />
      </div>

      <ResourceRadarChart
        metrics={metrics}
      />
    </section>
  );
}