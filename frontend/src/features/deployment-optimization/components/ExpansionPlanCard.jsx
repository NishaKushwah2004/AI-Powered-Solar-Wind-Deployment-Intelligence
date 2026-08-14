const ExpansionPlanCard = ({
  expansionPlan,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Expansion Planning
      </h2>

      <div className="mt-4">

        <p className="text-sm text-gray-500">
          Expansion Recommended
        </p>

        <p className="text-xl font-bold">
          {expansionPlan.expansion_recommended
            ? "Yes"
            : "No"}
        </p>

      </div>

      <div className="mt-3">

        <p className="text-sm text-gray-500">
          Priority
        </p>

        <p className="font-semibold">
          {expansionPlan.expansion_priority}
        </p>

      </div>

      <p className="mt-4 text-sm text-gray-600">
        {expansionPlan.expansion_reason}
      </p>

    </div>
  );
};

export default ExpansionPlanCard;