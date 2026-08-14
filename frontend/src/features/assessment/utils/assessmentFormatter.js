export function formatPercentage(value, digits = 2) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(digits)}%`;
}

export function formatScore(value, digits = 1) {
  if (value === null || value === undefined) {
    return "-";
  }

  return Number(value).toFixed(digits);
}

export function formatEnergy(value, unit = "kWh") {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toLocaleString()} ${unit}`;
}

export function formatDistance(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} km`;
}

export function formatElevation(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(1)} m`;
}

export function formatCoordinates(latitude, longitude) {
  if (
    latitude === null ||
    latitude === undefined ||
    longitude === null ||
    longitude === undefined
  ) {
    return "-";
  }

  return `${Number(latitude).toFixed(5)}, ${Number(longitude).toFixed(5)}`;
}

export function formatTemperature(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(1)}°C`;
}

export function formatWindSpeed(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} m/s`;
}

export function formatIrradiance(value) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${Number(value).toFixed(2)} W/m²`;
}

export function formatDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}