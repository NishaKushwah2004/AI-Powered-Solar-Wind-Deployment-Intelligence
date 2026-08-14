import { useInvestmentRecommendation } from "../hooks/useInvestmentRecommendation";

import InvestmentRecommendationCard
  from "../components/InvestmentRecommendationCard";

import FinancialMetricsCard
  from "../components/FinancialMetricsCard";

import InvestmentRiskCard
  from "../components/InvestmentRiskCard";

import InvestmentSummary
  from "../components/InvestmentSummary";


const InvestmentRecommendationPage = ({
  siteId,
  intelligence,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useInvestmentRecommendation();


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
          Investment Recommendation
        </h1>

        <p className="mt-1 text-gray-500">
          Evaluate project feasibility, financial
          performance and investment risk.
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
          : "Evaluate Investment"}
      </button>


      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to evaluate investment."}
        </div>
      )}


      {data && (
        <>

          <InvestmentRecommendationCard
            recommendation={
              data.recommendation
            }
            priority={
              data.investment_priority
            }
            reason={
              data.recommendation_reason
            }
          />


          <InvestmentSummary
            investmentScore={
              data.investment_score
            }
            feasibility={
              data.feasibility_status
            }
            generation={
              data.expected_generation_mwh
            }
            revenue={
              data.expected_annual_revenue
            }
          />


          <FinancialMetricsCard
            metrics={
              data.financial_metrics
            }
          />


          <InvestmentRiskCard
            risk={
              data.risk_assessment
            }
          />


          {data.strengths?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Investment Strengths
              </h2>

              <ul className="mt-3 list-disc pl-5 text-gray-600">

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


          {data.concerns?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Investment Concerns
              </h2>

              <ul className="mt-3 list-disc pl-5 text-gray-600">

                {data.concerns.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            </div>
          )}


          {data.assumptions?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Financial Assumptions
              </h2>

              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">

                {data.assumptions.map(
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

export default InvestmentRecommendationPage;