import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CapacityFactorChart({
  prediction,
}) {
  if (!prediction) return null;

  const data = [
    {
      name: "Solar",
      value:
        prediction.solar_prediction
          .predicted_capacity_factor * 100,
    },
    {
      name: "Wind",
      value:
        prediction.wind_prediction
          .predicted_capacity_factor * 100,
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
          dataKey="value"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}