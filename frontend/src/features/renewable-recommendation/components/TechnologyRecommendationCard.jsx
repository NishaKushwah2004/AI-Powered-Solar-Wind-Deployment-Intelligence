const TechnologyRecommendationCard = ({
  technology,
  confidence,
  reason,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        Recommended Technology
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {technology}
      </h2>

      <p className="mt-3 text-sm text-gray-500">
        Confidence:{" "}
        <span className="font-medium text-gray-900">
          {confidence}
        </span>
      </p>

      <p className="mt-4 text-gray-600">
        {reason}
      </p>

    </div>
  );
};

export default TechnologyRecommendationCard;