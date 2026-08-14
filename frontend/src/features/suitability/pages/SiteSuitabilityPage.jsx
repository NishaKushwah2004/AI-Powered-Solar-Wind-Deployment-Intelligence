import { useSiteSuitability } from "../hooks/useSiteSuitability";

import SuitabilityScore from "../components/SuitabilityScore";
import SuitabilityFactors from "../components/SuitabilityFactors";
import SuitabilityRecommendation from "../components/SuitabilityRecommendation";

const SiteSuitabilityPage = ({
  siteId,
  intelligence,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useSiteSuitability();

  const handleEvaluate = () => {
    mutate({
      siteId,
      intelligence,
    });
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Site Suitability Intelligence
        </h1>

        <p className="mt-1 text-gray-500">
          Evaluate the suitability of this site
          for renewable energy deployment.
        </p>
      </div>

      <button
        type="button"
        onClick={handleEvaluate}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Evaluating..."
          : "Evaluate Site"}
      </button>

      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to evaluate site."}
        </div>
      )}

      {data && (
        <>
          <SuitabilityScore
            score={data.overall_score}
            category={data.category}
          />

          <SuitabilityFactors
            factors={{
              renewable_resource:
                data.renewable_resource,

              geographic_suitability:
                data.geographic_suitability,

              infrastructure_accessibility:
                data.infrastructure_accessibility,

              environmental_impact:
                data.environmental_impact,

              economic_feasibility:
                data.economic_feasibility,
            }}
          />

          <SuitabilityRecommendation
            recommendation={
              data.recommendation
            }
            deploymentFeasible={
              data.deployment_feasible
            }
            strengths={data.strengths}
            constraints={data.constraints}
          />
        </>
      )}

    </div>
  );
};

export default SiteSuitabilityPage;