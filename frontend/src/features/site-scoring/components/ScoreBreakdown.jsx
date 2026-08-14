const labels = {
  renewable_resource:
    "Renewable Resource Availability",

  geographic_suitability:
    "Geographic Suitability",

  infrastructure_accessibility:
    "Infrastructure Accessibility",

  environmental_impact:
    "Environmental Impact",

  economic_feasibility:
    "Economic Feasibility",
};


const ScoreBreakdown = ({ scoring }) => {

  const factors = [
    "renewable_resource",
    "geographic_suitability",
    "infrastructure_accessibility",
    "environmental_impact",
    "economic_feasibility",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">

      {factors.map((factor) => {

        const item = scoring[factor];

        return (
          <div
            key={factor}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >

            <div className="flex justify-between">

              <h3 className="font-medium">
                {labels[factor]}
              </h3>

              <span className="font-semibold">
                {item.score}
              </span>

            </div>

            <div className="mt-3 h-2 rounded-full bg-gray-200">

              <div
                className="h-2 rounded-full bg-blue-500"
                style={{
                  width: `${item.score}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-sm text-gray-500">

              <span>
                Weight: {item.weight * 100}%
              </span>

              <span>
                Contribution: {item.weighted_score}
              </span>

            </div>

          </div>
        );
      })}

    </div>
  );
};

export default ScoreBreakdown;