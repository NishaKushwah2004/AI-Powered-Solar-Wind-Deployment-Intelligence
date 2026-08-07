import {
  Brain,
  CloudSun,
  Map,
  BarChart3,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

import CapabilityCard from "./CapabilityCard";

const CAPABILITIES = [
  {
    icon: CloudSun,
    title: "Environmental Intelligence",
    description:
      "Collect and analyze environmental conditions using weather, climate, terrain and satellite datasets to evaluate renewable energy resources.",

    features: [
      "NASA POWER",
      "Weather",
      "Satellite",
      "Terrain",
    ],
  },

  {
    icon: Map,
    title: "GIS Intelligence",
    description:
      "Perform spatial analysis with land use, road access, substations, transmission lines and elevation data.",

    features: [
      "OpenStreetMap",
      "Elevation",
      "Land Use",
      "Infrastructure",
    ],
  },

  {
    icon: Brain,
    title: "AI Prediction Engine",
    description:
      "Predict solar, wind and hybrid renewable energy generation using environmental and geographic intelligence.",

    features: [
      "Solar",
      "Wind",
      "Hybrid",
      "Machine Learning",
    ],
  },

  {
    icon: BarChart3,
    title: "Resource Assessment",
    description:
      "Generate deployment suitability reports with confidence scores, investment insights and renewable resource analysis.",

    features: [
      "Assessment",
      "Scoring",
      "Reports",
      "Analytics",
    ],
  },

  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Manage renewable energy projects, sites, geographic regions and deployment workflows from a unified platform.",

    features: [
      "Projects",
      "Sites",
      "Regions",
      "Planning",
    ],
  },

  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Enterprise-grade authentication with JWT, OAuth2 and role-based access control for planners and analysts.",

    features: [
      "JWT",
      "OAuth2",
      "RBAC",
      "Security",
    ],
  },
];

export default function Capabilities() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Platform Capabilities
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            Everything Needed for Renewable Energy Planning
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A unified intelligence platform that combines
            environmental analytics, GIS processing,
            renewable resource assessment and AI-powered
            prediction to support informed deployment
            decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <CapabilityCard
              key={capability.title}
              {...capability}
            />
          ))}
        </div>
      </div>
    </section>
  );
}