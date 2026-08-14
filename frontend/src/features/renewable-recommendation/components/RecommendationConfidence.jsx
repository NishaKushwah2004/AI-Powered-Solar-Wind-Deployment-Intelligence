const RecommendationConfidence = ({
  confidence,
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <p className="text-sm text-gray-500">
        Recommendation Confidence
      </p>

      <p className="mt-2 text-xl font-semibold">
        {confidence}
      </p>

    </div>
  );
};

export default RecommendationConfidence;