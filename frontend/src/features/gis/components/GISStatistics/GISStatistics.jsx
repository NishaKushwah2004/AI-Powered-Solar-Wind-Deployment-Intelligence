import StatisticCard from "./StatisticCard";

export default function GISStatistics({
  summary,
}) {
  if (!summary) return null;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <StatisticCard
        title="Total Sites"
        value={summary.total_sites ?? 0}
      />

      <StatisticCard
        title="Center Latitude"
        value={
          summary.center?.latitude != null
            ? summary.center.latitude.toFixed(4)
            : "-"
        }
      />

      <StatisticCard
        title="Center Longitude"
        value={
          summary.center?.longitude != null
            ? summary.center.longitude.toFixed(4)
            : "-"
        }
      />
    </div>
  );
}