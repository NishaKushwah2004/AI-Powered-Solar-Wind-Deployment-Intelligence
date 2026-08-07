export function getDominantSource(
  solar,
  wind
) {
  if (!solar || !wind) return "-";

  return solar.predicted_energy_output >=
    wind.predicted_energy_output
    ? "Solar"
    : "Wind";
}

export function getPredictionStatus(
  confidence
) {
  if (confidence >= 0.9)
    return "Excellent";

  if (confidence >= 0.75)
    return "Good";

  if (confidence >= 0.6)
    return "Moderate";

  return "Low";
}

export function isHybridRecommended(
  configuration
) {
  return configuration
    ?.toLowerCase()
    .includes("hybrid");
}