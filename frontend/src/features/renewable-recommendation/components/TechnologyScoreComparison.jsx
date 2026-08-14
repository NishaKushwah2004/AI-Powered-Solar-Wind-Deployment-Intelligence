const TechnologyScoreComparison = ({
  solar,
  wind,
  hybrid,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Solar
        </p>

        <p className="mt-2 text-3xl font-bold">
          {solar}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Wind
        </p>

        <p className="mt-2 text-3xl font-bold">
          {wind}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">
          Hybrid
        </p>

        <p className="mt-2 text-3xl font-bold">
          {hybrid}
        </p>
      </div>

    </div>
  );
};

export default TechnologyScoreComparison;