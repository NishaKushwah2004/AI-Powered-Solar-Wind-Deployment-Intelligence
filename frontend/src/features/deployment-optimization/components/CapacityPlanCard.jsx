const CapacityPlanCard = ({
  capacityPlan,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Capacity Plan
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-3">

        <div>
          <p className="text-sm text-gray-500">
            Total Capacity
          </p>

          <p className="text-2xl font-bold">
            {capacityPlan.recommended_capacity_mw} MW
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Solar
          </p>

          <p className="text-2xl font-bold">
            {capacityPlan.solar_capacity_mw} MW
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Wind
          </p>

          <p className="text-2xl font-bold">
            {capacityPlan.wind_capacity_mw} MW
          </p>
        </div>

      </div>

      <p className="mt-4 text-sm text-gray-600">
        {capacityPlan.capacity_strategy}
      </p>

    </div>
  );
};

export default CapacityPlanCard;