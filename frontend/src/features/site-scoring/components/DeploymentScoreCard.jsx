const DeploymentScoreCard = ({
  score,
  category,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        Overall Deployment Score
      </p>

      <div className="mt-3 flex items-center gap-4">

        <span className="text-4xl font-bold">
          {score}
        </span>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
          {category}
        </span>

      </div>

      <div className="mt-4 h-3 rounded-full bg-gray-200">

        <div
          className="h-3 rounded-full bg-blue-600"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
};

export default DeploymentScoreCard;