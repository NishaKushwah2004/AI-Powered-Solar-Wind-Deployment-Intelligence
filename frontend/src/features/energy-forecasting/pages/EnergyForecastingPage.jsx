import { useEnergyForecasting } from "../hooks/useEnergyForecasting";

import ForecastSummary
  from "../components/ForecastSummary";

import MonthlyForecastTable
  from "../components/MonthlyForecastTable";

import SeasonalForecast
  from "../components/SeasonalForecast";

import LongTermForecast
  from "../components/LongTermForecast";

import GridContributionCard
  from "../components/GridContributionCard";

import RevenueForecastCard
  from "../components/RevenueForecastCard";


const EnergyForecastingPage = ({
  siteId,
  intelligence,
}) => {

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useEnergyForecasting();


  const handleForecast = () => {

    mutate({
      siteId,
      intelligence,
    });

  };


  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-2xl font-bold">
          Energy Forecasting
        </h1>

        <p className="mt-1 text-gray-500">
          Forecast renewable energy production,
          seasonal generation, grid contribution
          and revenue.
        </p>

      </div>


      <button
        type="button"
        onClick={handleForecast}
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending
          ? "Forecasting..."
          : "Generate Forecast"}
      </button>


      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error?.response?.data?.detail ||
            "Unable to generate energy forecast."}
        </div>
      )}


      {data && (
        <>

          <ForecastSummary
            technology={data.technology}
            annualGeneration={
              data.annual_generation_mwh
            }
            capacity={data.capacity_mw}
            capacityFactor={
              data.capacity_factor
            }
          />


          <MonthlyForecastTable
            forecast={
              data.monthly_forecast
            }
          />


          <SeasonalForecast
            forecast={
              data.seasonal_forecast
            }
          />


          <div className="grid gap-6 md:grid-cols-2">

            <GridContributionCard
              contribution={
                data.grid_contribution
              }
            />

            <RevenueForecastCard
              revenue={
                data.revenue_forecast
              }
            />

          </div>


          <LongTermForecast
            forecast={
              data.long_term_forecast
            }
          />


          {data.forecasting_assumptions?.length > 0 && (
            <div className="rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold">
                Forecasting Assumptions
              </h2>

              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">

                {data.forecasting_assumptions.map(
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

export default EnergyForecastingPage;