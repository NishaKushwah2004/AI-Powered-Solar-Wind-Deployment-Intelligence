import Card from "@/components/ui/Card";

export default function OverallScoreChart({
  score = 0,
}) {
  const radius = 75;

  const circumference =
    2 * Math.PI * radius;

  const progress =
    circumference -
    (score / 100) * circumference;

  return (
    <Card>
      <Card.Body>

        <h3 className="mb-6 text-lg font-semibold">
          Overall Deployment Score
        </h3>

        <div className="flex justify-center">

          <svg
            width="220"
            height="220"
            className="-rotate-90"
          >

            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
            />

            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#14B8A6"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
            />

            <text
              x="110"
              y="120"
              textAnchor="middle"
              className="rotate-90 origin-center"
              fontSize="34"
              fontWeight="700"
              fill="#0F172A"
            >
              {score}
            </text>

          </svg>

        </div>

      </Card.Body>
    </Card>
  );
}