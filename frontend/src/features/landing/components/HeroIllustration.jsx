import {
  Sun,
  Wind,
  Map,
  Brain,
  CloudSun,
  Satellite,
} from "lucide-react";

export default function HeroIllustration() {
  const items = [
    {
      icon: Sun,
      label: "Solar AI",
    },
    {
      icon: Wind,
      label: "Wind AI",
    },
    {
      icon: Map,
      label: "GIS",
    },
    {
      icon: CloudSun,
      label: "Weather",
    },
    {
      icon: Satellite,
      label: "Satellite",
    },
    {
      icon: Brain,
      label: "ML Models",
    },
  ];

  return (
    <div className="relative flex h-130 items-center justify-center">
      <div className="absolute h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid grid-cols-2 gap-5">
        {items.map(
          (
            {
              icon: Icon,
              label,
            },
            index
          ) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Icon
                className="mb-4 text-primary"
                size={34}
              />

              <h3 className="font-semibold">
                {label}
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}