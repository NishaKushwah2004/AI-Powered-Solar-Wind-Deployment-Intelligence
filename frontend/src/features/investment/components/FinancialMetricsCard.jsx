const FinancialMetricsCard = ({
  metrics,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Financial Metrics
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            CAPEX
          </p>

          <p className="mt-1 text-xl font-bold">
            ₹{metrics.capex.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Annual OPEX
          </p>

          <p className="mt-1 text-xl font-bold">
            ₹{metrics.annual_opex.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Annual Revenue
          </p>

          <p className="mt-1 text-xl font-bold">
            ₹{metrics.annual_revenue.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Net Cash Flow
          </p>

          <p className="mt-1 text-xl font-bold">
            ₹{metrics.annual_net_cash_flow.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            ROI
          </p>

          <p className="mt-1 text-xl font-bold">
            {metrics.roi_percentage.toFixed(2)}%
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Payback Period
          </p>

          <p className="mt-1 text-xl font-bold">
            {metrics.payback_period_years !== null
              ? `${metrics.payback_period_years} years`
              : "N/A"}
          </p>
        </div>

      </div>

    </div>
  );
};

export default FinancialMetricsCard;