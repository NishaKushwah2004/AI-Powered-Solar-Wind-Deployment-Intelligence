const RevenueForecastCard = ({
  revenue,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Revenue Forecast
      </h2>

      <p className="mt-4 text-sm text-gray-500">
        Estimated Annual Revenue
      </p>

      <p className="mt-2 text-3xl font-bold">
        ₹
        {revenue.estimated_annual_revenue.toLocaleString()}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        Electricity price:
        {" "}
        ₹{revenue.electricity_price_per_mwh.toLocaleString()}
        {" "} / MWh
      </p>

    </div>
  );
};

export default RevenueForecastCard;