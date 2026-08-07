import { Copy, MapPin } from "lucide-react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import {
  formatCoordinates,
  formatDate,
  formatScore,
} from "../utils/assessmentFormatter";

import {
  getEnergySourceIcon,
} from "../utils/assessmentHelpers";

import SuitabilityBadge from "./SuitabilityBadge";

export default function ExecutiveSummary({
  report,
}) {
  if (!report) return null;

  const metrics = report.resource_metrics;

  const coordinates = `${report.latitude}, ${report.longitude}`;

  function copyCoordinates() {
    navigator.clipboard.writeText(coordinates);
  }

  return (
    <Card>
      <Card.Body>
        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Renewable Resource Assessment
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                {report.site_name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-slate-500">
                <MapPin size={18} />

                <span>
                  {formatCoordinates(
                    report.latitude,
                    report.longitude
                  )}
                </span>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyCoordinates}
                >
                  <Copy size={15} />
                </Button>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                Generated on {formatDate()}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <SuitabilityBadge
                score={metrics?.overall_score}
              />

              <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {getEnergySourceIcon(
                  metrics?.recommended_energy_source
                )}{" "}
                {metrics?.recommended_energy_source}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-500">
              Overall Deployment Score
            </p>

            <h2 className="mt-3 text-6xl font-bold text-primary">
              {formatScore(
                metrics?.overall_score
              )}
            </h2>

            <p className="mt-2 text-slate-500">
              out of 100
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}