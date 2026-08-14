const OptimizationSummary = ({
  technology,
  score,
  hybridRecommended,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        Recommended Deployment
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {technology}
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Optimization Score
          </p>

          <p className="text-2xl font-bold">
            {score}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Hybrid Recommended
          </p>

          <p className="text-2xl font-bold">
            {hybridRecommended
              ? "Yes"
              : "No"}
          </p>
        </div>

      </div>

    </div>
  );
};

export default OptimizationSummary;