import { GISAssessmentCard } from "../components";

export default function GISSection({
  gis,
}) {
  if (!gis) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Geographic Intelligence Analysis
        </h2>

        <p className="mt-2 text-slate-500">
          Geographic suitability assessment
          based on terrain, accessibility,
          infrastructure and environmental
          constraints.
        </p>
      </div>

      <GISAssessmentCard
        gis={gis}
      />
    </section>
  );
}