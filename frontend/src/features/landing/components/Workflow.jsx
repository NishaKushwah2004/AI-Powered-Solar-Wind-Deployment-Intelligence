import {
  FolderKanban,
  MapPinned,
  CloudSun,
  Map,
  Brain,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import WorkflowStep from "./WorkflowStep";

const WORKFLOW = [
  {
    step: 1,
    icon: FolderKanban,
    title: "Create Project",
    description:
      "Organize renewable energy planning by creating projects and defining regions for analysis.",
  },

  {
    step: 2,
    icon: MapPinned,
    title: "Register Sites",
    description:
      "Add potential deployment locations with geographic coordinates and site information.",
  },

  {
    step: 3,
    icon: CloudSun,
    title: "Environmental Analysis",
    description:
      "Collect weather, climate and satellite datasets including solar irradiance, wind speed and terrain.",
  },

  {
    step: 4,
    icon: Map,
    title: "GIS Intelligence",
    description:
      "Analyze roads, substations, transmission lines, land use, elevation and accessibility.",
  },

  {
    step: 5,
    icon: Brain,
    title: "AI Prediction",
    description:
      "Predict solar, wind and hybrid renewable energy generation using environmental intelligence.",
  },

  {
    step: 6,
    icon: BarChart3,
    title: "Resource Assessment",
    description:
      "Generate suitability scores, confidence metrics and deployment feasibility reports.",
  },

  {
    step: 7,
    icon: CheckCircle2,
    title: "Deployment Decision",
    description:
      "Recommend optimal renewable energy deployment strategies for planners and decision makers.",
  },
];

export default function Workflow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900">
            From Site Registration to AI-Powered Decisions
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Follow a streamlined renewable energy planning workflow that
            combines environmental analytics, GIS intelligence and AI-powered
            prediction to identify the best deployment locations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {WORKFLOW.map((item) => (
            <WorkflowStep
              key={item.step}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}