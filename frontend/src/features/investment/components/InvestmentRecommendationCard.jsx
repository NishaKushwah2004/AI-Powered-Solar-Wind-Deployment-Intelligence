const InvestmentRecommendationCard = ({
  recommendation,
  priority,
  reason,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        Investment Recommendation
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {recommendation}
      </h2>

      <p className="mt-3 text-sm text-gray-500">
        Priority:{" "}
        <span className="font-medium text-gray-900">
          {priority}
        </span>
      </p>

      <p className="mt-4 text-gray-600">
        {reason}
      </p>

    </div>
  );
};

export default InvestmentRecommendationCard;