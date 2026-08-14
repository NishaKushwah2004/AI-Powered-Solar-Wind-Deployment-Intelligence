const InvestmentSummary = ({
  investmentScore,
  feasibility,
  generation,
  revenue,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Investment Score
        </p>

        <p className="mt-2 text-3xl font-bold">
          {investmentScore}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Feasibility
        </p>

        <p className="mt-2 text-xl font-bold">
          {feasibility}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Expected Generation
        </p>

        <p className="mt-2 text-xl font-bold">
          {generation.toLocaleString()} MWh
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Annual Revenue
        </p>

        <p className="mt-2 text-xl font-bold">
          ₹{revenue.toLocaleString()}
        </p>
      </div>

    </div>
  );
};

export default InvestmentSummary;