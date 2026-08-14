import ModuleCard from "./ModuleCard";

const MODULES = [
  {
    title: "Dashboard",
    available: true,
  },
  {
    title: "Projects",
    available: true,
  },
  {
    title: "Sites",
    available: true,
  },
  {
    title: "GIS",
    available: true,
  },
  {
    title: "Profile",
    available: true,
  },
  {
    title: "Solar Intelligence",
    available: false,
  },
  {
    title: "Wind Intelligence",
    available: false,
  },
  {
    title: "Analytics",
    available: false,
  },
  {
    title: "Reports",
    available: false,
  },
];

export default function Modules() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <h2 className="text-4xl font-bold">

            Platform Modules

          </h2>

          <p className="mt-4 text-slate-600">

            Current Milestone 1 implementation status.

          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {MODULES.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
            />
          ))}

        </div>

      </div>

    </section>
  );
}