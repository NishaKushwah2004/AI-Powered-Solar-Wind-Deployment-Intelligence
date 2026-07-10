import {
  Globe,
  FolderKanban,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    icon: Globe,
    title: "GIS Mapping",
    description:
      "Visualize renewable energy sites using interactive GIS maps.",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Create and organize renewable energy deployment projects.",
  },
  {
    icon: MapPinned,
    title: "Site Management",
    description:
      "Store and manage candidate deployment locations.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Role-based authentication and authorization.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">

          <h2 className="text-4xl font-bold">

            Platform Features

          </h2>

          <p className="mt-4 text-slate-600">

            Everything required for renewable energy planning.

          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}