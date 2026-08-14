const factorLabels = {
  renewable_resource: "Renewable Resource",
  geographic_suitability: "Geographic Suitability",
  infrastructure_accessibility:
    "Infrastructure Accessibility",
  environmental_impact: "Environmental Impact",
  economic_feasibility: "Economic Feasibility",
};

const SuitabilityFactors = ({ factors }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(factors).map(
        ([key, factor]) => (
          <div
            key={key}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between">
              <h3 className="font-medium">
                {factorLabels[key]}
              </h3>

              <span className="text-sm">
                {factor.score}/100
              </span>
            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${factor.score}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-500">
              Weight: {factor.weight * 100}%
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {factor.explanation}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default SuitabilityFactors;