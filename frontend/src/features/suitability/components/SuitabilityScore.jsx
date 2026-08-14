const SuitabilityScore = ({
  score,
  category,
}) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">
        Overall Suitability
      </p>

      <div className="mt-2 flex items-center gap-4">
        <span className="text-4xl font-bold">
          {score}
        </span>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {category}
        </span>
      </div>
    </div>
  );
};

export default SuitabilityScore;