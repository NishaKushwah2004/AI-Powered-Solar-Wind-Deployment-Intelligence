import Card from "@/components/ui/Card";

export default function EnergyComparisonTable({
  prediction,
}) {
  if (!prediction) return null;

  const rows = [
    {
      source: "Solar",
      energy:
        prediction.solar_prediction
          .predicted_energy_output,
      cf:
        prediction.solar_prediction
          .predicted_capacity_factor,
      confidence:
        prediction.solar_prediction
          .confidence,
    },
    {
      source: "Wind",
      energy:
        prediction.wind_prediction
          .predicted_energy_output,
      cf:
        prediction.wind_prediction
          .predicted_capacity_factor,
      confidence:
        prediction.wind_prediction
          .confidence,
    },
  ];

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          Energy Comparison
        </h2>
      </Card.Header>

      <Card.Body>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">
                Source
              </th>

              <th className="text-left">
                Energy
              </th>

              <th className="text-left">
                Capacity
              </th>

              <th className="text-left">
                Confidence
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.source}
                className="border-b"
              >
                <td className="py-3">
                  {row.source}
                </td>

                <td>
                  {row.energy.toFixed(2)} kWh
                </td>

                <td>
                  {(row.cf * 100).toFixed(
                    1
                  )}
                  %
                </td>

                <td>
                  {(row.confidence * 100).toFixed(
                    0
                  )}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}