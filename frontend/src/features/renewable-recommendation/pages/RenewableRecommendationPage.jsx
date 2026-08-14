import { useRenewableRecommendation } from "../hooks/useRenewableRecommendation";

import TechnologyRecommendationCard
  from "../components/TechnologyRecommendationCard";

import TechnologyScoreComparison
  from "../components/TechnologyScoreComparison";

import RecommendationConfidence
  from "../components/RecommendationConfidence";


const RenewableRecommendationPage = ({
  siteId,
  intelligence,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useRenewableRecommendation();


  const handleRecommendation = () => {

    mutate({
      siteId,
      intelligence,
    });

  };


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Renewable Energy Recommendation
        </h1>

        <p className="mt-1 text-gray-500">
          Determine the most suitable renewable
          technology for this site.
        </p>
      </div>


      <button
        type="button"
        onClick={handleRecommendation}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Analyzing..."
          : "Generate Recommendation"}
      </button>


      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to generate recommendation."}
        </div>
      )}


      {data && (
        <>

          <TechnologyRecommendationCard
            technology={
              data.recommended_technology
            }
            confidence={data.confidence}
            reason={
              data.recommendation_reason
            }
          />


          <TechnologyScoreComparison
            solar={data.solar.score}
            wind={data.wind.score}
            hybrid={data.hybrid_score}
          />


          <RecommendationConfidence
            confidence={data.confidence}
          />


          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Recommendation Analysis
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Overall Site Score
                </p>

                <p className="text-2xl font-bold">
                  {data.overall_site_score}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Deployment Feasible
                </p>

                <p className="text-2xl font-bold">
                  {data.deployment_feasible
                    ? "Yes"
                    : "No"}
                </p>
              </div>

            </div>

          </div>


          {data.strengths?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="font-semibold">
                Strengths
              </h2>

              <ul className="mt-3 list-disc pl-5">
                {data.strengths.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </div>
          )}


          {data.constraints?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="font-semibold">
                Constraints
              </h2>

              <ul className="mt-3 list-disc pl-5">
                {data.constraints.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>

            </div>
          )}

        </>
      )}

    </div>
  );
};

export default RenewableRecommendationPage;