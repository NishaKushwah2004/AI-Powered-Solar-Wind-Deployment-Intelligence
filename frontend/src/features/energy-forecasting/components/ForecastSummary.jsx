const ForecastSummary = ({
  technology,
  annualGeneration,
  capacity,
  capacityFactor,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Technology
        </p>

        <p className="mt-2 text-xl font-bold">
          {technology}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Annual Generation
        </p>

        <p className="mt-2 text-xl font-bold">
          {annualGeneration.toLocaleString()} MWh
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Capacity
        </p>

        <p className="mt-2 text-xl font-bold">
          {capacity} MW
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Capacity Factor
        </p>

        <p className="mt-2 text-xl font-bold">
          {(capacityFactor * 100).toFixed(2)}%
        </p>
      </div>

    </div>
  );
};

export default ForecastSummary;