export function buildPredictionMetrics(
  prediction
) {
  if (!prediction) return [];

  return [
    {
      label: "Solar Output",
      value:
        prediction.solar_prediction
          ?.predicted_energy_output,
      unit: "kWh",
    },

    {
      label: "Wind Output",
      value:
        prediction.wind_prediction
          ?.predicted_energy_output,
      unit: "kWh",
    },

    {
      label: "Hybrid Output",
      value:
        prediction.hybrid_prediction
          ?.total_expected_energy,
      unit: "kWh",
    },

    {
      label: "Confidence",
      value:
        prediction.hybrid_prediction
          ?.confidence,
      unit: "%",
    },
  ];
}