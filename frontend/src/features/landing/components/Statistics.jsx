import StatCard from "./StatCard";

const STATS = [
  {
    value: "6",
    label: "Core Intelligence Engines",
    description:
      "Environmental, GIS, Assessment, Prediction, Analytics and Planning modules.",
  },

  {
    value: "8+",
    label: "Integrated Data Sources",
    description:
      "NASA POWER, OpenWeather, Sentinel, OpenStreetMap, Elevation APIs and more.",
  },

  {
    value: "4",
    label: "User Roles",
    description:
      "Administrator, GIS Analyst, Renewable Energy Planner and Project Manager.",
  },

  {
    value: "AI",
    label: "Decision Intelligence",
    description:
      "Machine learning driven solar, wind and hybrid deployment recommendations.",
  },
];

export default function Statistics() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Platform Overview
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Intelligent Renewable Energy Planning
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Built for renewable energy planners,
            GIS analysts, government agencies,
            utility providers and sustainability
            consultants to accelerate renewable
            energy deployment decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((item) => (
            <StatCard
              key={item.label}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}