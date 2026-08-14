const SeasonalForecast = ({
  forecast,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Seasonal Generation Forecast
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-4">

        {forecast.map((item) => (
          <div
            key={item.season}
            className="rounded-lg border p-4"
          >

            <p className="text-sm text-gray-500">
              {item.season}
            </p>

            <p className="mt-2 text-xl font-bold">
              {item.generation_mwh.toLocaleString()}
              {" "}MWh
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {item.percentage_of_annual_generation}%
              {" "}of annual generation
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SeasonalForecast;