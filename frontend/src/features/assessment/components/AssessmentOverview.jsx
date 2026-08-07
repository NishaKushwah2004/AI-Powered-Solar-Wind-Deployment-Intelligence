import {
  ExecutiveSummarySection,
  ScoreSection,
  EnvironmentalSection,
  SolarSection,
  WindSection,
  GISSection,
  RecommendationSection,
} from "../sections";

export default function AssessmentOverview({
  report,
}) {
  if (!report) return null;

  return (
    <div className="space-y-10">
      <ExecutiveSummarySection
        report={report}
      />

      <ScoreSection
        metrics={report.resource_metrics}
      />

      <EnvironmentalSection
        weather={
          report.environmental_summary
        }
      />

      <SolarSection
        assessment={
          report.solar_assessment
        }
      />

      <WindSection
        assessment={
          report.wind_assessment
        }
      />

      <GISSection
        gis={report.gis_summary}
      />

      <RecommendationSection
        report={report}
      />
    </div>
  );
}