import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function ConfidenceChart({
  prediction,
}) {
  if (!prediction) return null;

  const data = [
    {
      subject: "Solar",
      value:
        prediction.solar_prediction
          .confidence * 100,
    },
    {
      subject: "Wind",
      value:
        prediction.wind_prediction
          .confidence * 100,
    },
    {
      subject: "Hybrid",
      value:
        prediction.hybrid_prediction
          .confidence * 100,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <RadarChart data={data}>
        <PolarGrid />

        <PolarAngleAxis
          dataKey="subject"
        />

        <PolarRadiusAxis />

        <Radar
          dataKey="value"
          fill="#14b8a6"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}