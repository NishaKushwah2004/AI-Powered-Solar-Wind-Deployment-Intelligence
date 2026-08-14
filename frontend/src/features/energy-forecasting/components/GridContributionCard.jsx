const GridContributionCard = ({
  contribution,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Grid Contribution
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">

        <div>
          <p className="text-sm text-gray-500">
            Grid Contribution
          </p>

          <p className="text-2xl font-bold">
            {contribution.estimated_grid_contribution_mwh.toLocaleString()}
            {" "}MWh
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Contribution Percentage
          </p>

          <p className="text-2xl font-bold">
            {contribution.grid_contribution_percentage}%
          </p>
        </div>

      </div>

    </div>
  );
};

export default GridContributionCard;