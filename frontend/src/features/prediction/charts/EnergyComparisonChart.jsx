import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function EnergyComparisonChart({
  prediction,
}) {
  if (!prediction) return null;

  const data = [
    {
      name: "Solar",
      energy:
        prediction.solar_prediction
          .predicted_energy_output,
    },
    {
      name: "Wind",
      energy:
        prediction.wind_prediction
          .predicted_energy_output,
    },
    {
      name: "Hybrid",
      energy:
        prediction.hybrid_prediction
          .total_expected_energy,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="energy"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}