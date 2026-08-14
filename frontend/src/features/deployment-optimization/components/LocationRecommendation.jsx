const LocationRecommendation = ({
  recommendation,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Location Recommendation
      </h2>

      <div className="mt-4">

        <p className="text-sm text-gray-500">
          Site
        </p>

        <p className="font-semibold">
          Site #{recommendation.site_id}
        </p>

      </div>

      <div className="mt-3">

        <p className="text-sm text-gray-500">
          Deployment Score
        </p>

        <p className="text-xl font-bold">
          {recommendation.deployment_score}
        </p>

      </div>

      <p className="mt-4 text-sm text-gray-600">
        {recommendation.recommendation_reason}
      </p>

    </div>
  );
};

export default LocationRecommendation;