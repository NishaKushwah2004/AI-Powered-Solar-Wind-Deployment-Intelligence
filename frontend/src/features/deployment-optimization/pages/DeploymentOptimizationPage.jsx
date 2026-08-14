import { useDeploymentOptimization } from "../hooks/useDeploymentOptimization";

import OptimizationSummary
  from "../components/OptimizationSummary";

import CapacityPlanCard
  from "../components/CapacityPlanCard";

import LocationRecommendation
  from "../components/LocationRecommendation";

import ExpansionPlanCard
  from "../components/ExpansionPlanCard";


const DeploymentOptimizationPage = ({
  siteId,
  intelligence,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useDeploymentOptimization();


  const handleOptimize = () => {

    mutate({
      siteId,
      intelligence,
    });

  };


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Deployment Optimization
        </h1>

        <p className="mt-1 text-gray-500">
          Optimize renewable technology,
          capacity and deployment planning.
        </p>

      </div>


      <button
        type="button"
        onClick={handleOptimize}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Optimizing..."
          : "Optimize Deployment"}
      </button>


      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to optimize deployment."}
        </div>
      )}


      {data && (
        <>

          <OptimizationSummary
            technology={data.technology}
            score={data.optimization_score}
            hybridRecommended={
              data.hybrid_recommended
            }
          />


          <CapacityPlanCard
            capacityPlan={
              data.capacity_plan
            }
          />


          <LocationRecommendation
            recommendation={
              data.location_recommendation
            }
          />


          <ExpansionPlanCard
            expansionPlan={
              data.expansion_plan
            }
          />


          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Optimization Decision
            </h2>

            <p className="mt-3 text-gray-600">
              {data.optimization_reason}
            </p>

          </div>

        </>
      )}

    </div>
  );
};

export default DeploymentOptimizationPage;