const SuitabilityRecommendation = ({
  recommendation,
  deploymentFeasible,
  strengths,
  constraints,
}) => {
  return (
    <div className="space-y-6">

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Deployment Recommendation
        </h2>

        <p className="mt-3 text-gray-600">
          {recommendation}
        </p>

        <div className="mt-4">
          <span className="text-sm font-medium">
            Deployment Feasible:
          </span>

          <span className="ml-2">
            {deploymentFeasible
              ? "Yes"
              : "No"}
          </span>
        </div>
      </div>

      {strengths?.length > 0 && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold">
            Strengths
          </h3>

          <ul className="mt-3 list-disc pl-5">
            {strengths.map(
              (strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {constraints?.length > 0 && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold">
            Constraints
          </h3>

          <ul className="mt-3 list-disc pl-5">
            {constraints.map(
              (constraint, index) => (
                <li key={index}>
                  {constraint}
                </li>
              )
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default SuitabilityRecommendation;