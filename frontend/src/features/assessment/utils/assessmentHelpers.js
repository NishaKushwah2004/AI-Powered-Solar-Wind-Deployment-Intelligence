export function getSuitabilityColor(score) {
  if (score >= 90) {
    return "text-emerald-600";
  }

  if (score >= 75) {
    return "text-green-600";
  }

  if (score >= 60) {
    return "text-yellow-600";
  }

  if (score >= 40) {
    return "text-orange-600";
  }

  return "text-red-600";
}

export function getSuitabilityVariant(score) {
  if (score >= 90) {
    return "success";
  }

  if (score >= 75) {
    return "success";
  }

  if (score >= 60) {
    return "warning";
  }

  if (score >= 40) {
    return "warning";
  }

  return "danger";
}

export function getSuitabilityLabel(score) {
  if (score >= 90) {
    return "Excellent";
  }

  if (score >= 75) {
    return "Highly Suitable";
  }

  if (score >= 60) {
    return "Suitable";
  }

  if (score >= 40) {
    return "Moderately Suitable";
  }

  return "Unsuitable";
}

export function getConfidenceColor(confidence) {
  if (confidence >= 0.9) {
    return "text-emerald-600";
  }

  if (confidence >= 0.75) {
    return "text-blue-600";
  }

  if (confidence >= 0.6) {
    return "text-yellow-600";
  }

  return "text-red-600";
}

export function getConfidenceLabel(confidence) {
  if (confidence >= 0.9) {
    return "Very High";
  }

  if (confidence >= 0.75) {
    return "High";
  }

  if (confidence >= 0.6) {
    return "Medium";
  }

  return "Low";
}

export function getEnergySourceIcon(source) {
  switch (source) {
    case "Solar":
      return "☀️";

    case "Wind":
      return "🌬️";

    case "Hybrid":
      return "⚡";

    default:
      return "📍";
  }
}

export function getRiskLevel(score) {
  if (score >= 85) {
    return "Low";
  }

  if (score >= 70) {
    return "Moderate";
  }

  if (score >= 50) {
    return "Medium";
  }

  return "High";
}

export function getScoreProgress(score) {
  return Math.min(Math.max(score ?? 0, 0), 100);
}

export function isExcellentSite(score) {
  return score >= 90;
}

export function isHybridRecommended(metrics) {
  return (
    metrics?.recommended_energy_source ===
    "Hybrid"
  );
}