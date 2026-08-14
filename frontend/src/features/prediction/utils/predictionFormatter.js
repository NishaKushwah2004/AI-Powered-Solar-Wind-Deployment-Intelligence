export function formatEnergy(value) {
  if (value == null) return "-";

  return `${Number(value).toFixed(2)} kWh`;
}

export function formatPercentage(value) {
  if (value == null) return "-";

  return `${(Number(value) * 100).toFixed(1)}%`;
}

export function formatConfidence(value) {
  if (value == null) return "-";

  return `${(Number(value) * 100).toFixed(0)}%`;
}

export function formatNumber(value) {
  if (value == null) return "-";

  return Number(value).toFixed(2);
}