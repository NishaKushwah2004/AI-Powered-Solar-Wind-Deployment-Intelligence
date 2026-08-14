import {
  Brain,
  Globe,
  Leaf,
  ShieldCheck,
  BarChart3,
  Cpu,
} from "lucide-react";

import WhyChooseCard from "./WhyChooseCard";

const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered Decision Intelligence",
    description:
      "Generate intelligent deployment recommendations using machine learning models, renewable resource analysis and environmental data.",
  },

  {
    icon: Globe,
    title: "Advanced GIS Analytics",
    description:
      "Leverage geospatial intelligence including terrain, land use, infrastructure proximity and accessibility to evaluate potential sites.",
  },

  {
    icon: Leaf,
    title: "Comprehensive Environmental Analysis",
    description:
      "Integrate weather, solar irradiance, wind resources, satellite imagery and terrain information for accurate renewable energy planning.",
  },

  {
    icon: BarChart3,
    title: "Data-Driven Site Assessment",
    description:
      "Produce suitability scores, confidence metrics, renewable resource reports and investment insights for every location.",
  },

  {
    icon: Cpu,
    title: "Unified Planning Platform",
    description:
      "Manage projects, monitor sites, analyze environmental conditions and generate renewable energy predictions from one platform.",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Protect platform access with JWT authentication, OAuth2 integration and role-based authorization for planners, analysts and administrators.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Built for Modern Renewable Energy Planning
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Our platform combines artificial intelligence,
            geospatial analytics and environmental intelligence
            into a single decision-support system, enabling
            organizations to identify optimal renewable energy
            deployment opportunities with greater confidence.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => (
            <WhyChooseCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}