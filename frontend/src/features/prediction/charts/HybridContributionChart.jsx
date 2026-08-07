import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#14b8a6",
  "#3b82f6",
];

export default function HybridContributionChart({
  prediction,
}) {
  if (!prediction) return null;

  const data = [
    {
      name: "Solar",
      value:
        prediction.hybrid_prediction
          .solar_contribution,
    },
    {
      name: "Wind",
      value:
        prediction.hybrid_prediction
          .wind_contribution,
    },
  ];

  return (
    <ResponsiveContainer
      width="100%"
      height={320}
    >
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}