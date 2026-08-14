import { useSiteScoring } from "../hooks/useSiteScoring";

import DeploymentScoreCard
  from "../components/DeploymentScoreCard";

import ScoreBreakdown
  from "../components/ScoreBreakdown";



const SiteScoringPage = ({
  siteId,
  suitabilityData,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useSiteScoring();


  const handleCalculate = () => {

    mutate({
      siteId,
      suitabilityData,
    });

  };


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Site Scoring
        </h1>

        <p className="mt-1 text-gray-500">
          Deployment suitability scoring and
          factor analysis.
        </p>
      </div>


      <button
        type="button"
        onClick={handleCalculate}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Calculating..."
          : "Calculate Score"}
      </button>


      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to calculate site score."}
        </div>
      )}


      {data && (
        <>

          <DeploymentScoreCard
            score={
              data.overall_deployment_score
            }
            category={data.category}
          />


          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Technology Suitability
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Solar Suitability
                </p>

                <p className="text-2xl font-bold">
                  {data.solar_suitability_score}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Wind Suitability
                </p>

                <p className="text-2xl font-bold">
                  {data.wind_suitability_score}
                </p>
              </div>

            </div>

          </div>


          <ScoreBreakdown
            scoring={data}
          />


          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold">
              Investment & Infrastructure
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Infrastructure Score
                </p>

                <p className="text-2xl font-bold">
                  {data.infrastructure_score}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Investment Score
                </p>

                <p className="text-2xl font-bold">
                  {data.investment_score}
                </p>
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
};

export default SiteScoringPage;