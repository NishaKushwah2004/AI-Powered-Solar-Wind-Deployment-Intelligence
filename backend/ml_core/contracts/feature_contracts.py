"""
Authoritative ML feature contracts.

These contracts are shared conceptually between:
    - offline training
    - preprocessing
    - model inference
    - backend prediction

IMPORTANT:
The current datasets are reference/synthetic datasets.
They must be replaced/retrained with authorized observed data later.
"""

from typing import Final


# ---------------------------------------------------------------------------
# Schema versions
# ---------------------------------------------------------------------------

SOLAR_SCHEMA_VERSION: Final[str] = "1.0"
WIND_SCHEMA_VERSION: Final[str] = "1.0"


# ---------------------------------------------------------------------------
# Solar model
# ---------------------------------------------------------------------------

SOLAR_FEATURES: Final[list[str]] = [
    "latitude",
    "longitude",
    "ghi",
    "dni",
    "dhi",
    "gti",
    "temperature_c",
    "humidity_pct",
    "cloud_cover_pct",
    "pressure_hpa",
    "wind_speed_m_s",
    "elevation_m",
]

SOLAR_TARGET: Final[str] = "solar_generation_mw"


SOLAR_UNITS: Final[dict[str, str]] = {
    "latitude": "degree",
    "longitude": "degree",
    "ghi": "W/m2",
    "dni": "W/m2",
    "dhi": "W/m2",
    "gti": "W/m2",
    "temperature_c": "degree_C",
    "humidity_pct": "percent",
    "cloud_cover_pct": "percent",
    "pressure_hpa": "hPa",
    "wind_speed_m_s": "m/s",
    "elevation_m": "m",
    "solar_generation_mw": "MW",
}


# ---------------------------------------------------------------------------
# Wind model
# ---------------------------------------------------------------------------

WIND_FEATURES: Final[list[str]] = [
    "latitude",
    "longitude",
    "wind_speed_m_s",
    "air_density_kg_m3",
    "temperature_c",
    "humidity_pct",
    "pressure_hpa",
    "elevation_m",
]

WIND_TARGET: Final[str] = "wind_generation_mw"


WIND_UNITS: Final[dict[str, str]] = {
    "latitude": "degree",
    "longitude": "degree",
    "wind_speed_m_s": "m/s",
    "air_density_kg_m3": "kg/m3",
    "temperature_c": "degree_C",
    "humidity_pct": "percent",
    "pressure_hpa": "hPa",
    "elevation_m": "m",
    "wind_generation_mw": "MW",
}


# ---------------------------------------------------------------------------
# Default values
# ---------------------------------------------------------------------------

DEFAULTS: Final[dict[str, float]] = {
    "temperature_c": 25.0,
    "humidity_pct": 50.0,
    "cloud_cover_pct": 50.0,
    "pressure_hpa": 1013.25,
    "wind_speed_m_s": 5.0,
    "air_density_kg_m3": 1.225,
    "elevation_m": 0.0,
}


# ---------------------------------------------------------------------------
# Valid feature ranges
# ---------------------------------------------------------------------------

FEATURE_RANGES: Final[dict[str, tuple[float, float]]] = {
    "latitude": (-90.0, 90.0),
    "longitude": (-180.0, 180.0),
    "ghi": (0.0, 1500.0),
    "dni": (0.0, 1500.0),
    "dhi": (0.0, 1000.0),
    "gti": (0.0, 1500.0),
    "temperature_c": (-60.0, 60.0),
    "humidity_pct": (0.0, 100.0),
    "cloud_cover_pct": (0.0, 100.0),
    "pressure_hpa": (300.0, 1100.0),
    "wind_speed_m_s": (0.0, 80.0),
    "air_density_kg_m3": (0.5, 1.5),
    "elevation_m": (-500.0, 10000.0),
}


TARGET_RANGES: Final[dict[str, tuple[float, float]]] = {
    "solar_generation_mw": (0.0, 1000.0),
    "wind_generation_mw": (0.0, 1000.0),
}


# ---------------------------------------------------------------------------
# Contract helpers
# ---------------------------------------------------------------------------

def get_features(domain: str) -> list[str]:
    """Return the authoritative feature list for a domain."""

    domain = domain.lower().strip()

    if domain == "solar":
        return SOLAR_FEATURES.copy()

    if domain == "wind":
        return WIND_FEATURES.copy()

    raise ValueError(
        f"Unsupported ML domain '{domain}'. "
        "Expected 'solar' or 'wind'."
    )


def get_target(domain: str) -> str:
    """Return the authoritative target for a domain."""

    domain = domain.lower().strip()

    if domain == "solar":
        return SOLAR_TARGET

    if domain == "wind":
        return WIND_TARGET

    raise ValueError(
        f"Unsupported ML domain '{domain}'. "
        "Expected 'solar' or 'wind'."
    )


def get_schema_version(domain: str) -> str:
    """Return the schema version for a domain."""

    domain = domain.lower().strip()

    if domain == "solar":
        return SOLAR_SCHEMA_VERSION

    if domain == "wind":
        return WIND_SCHEMA_VERSION

    raise ValueError(
        f"Unsupported ML domain '{domain}'. "
        "Expected 'solar' or 'wind'."
    )


def get_units(domain: str) -> dict[str, str]:
    """Return feature and target units for a domain."""

    domain = domain.lower().strip()

    if domain == "solar":
        return SOLAR_UNITS.copy()

    if domain == "wind":
        return WIND_UNITS.copy()

    raise ValueError(
        f"Unsupported ML domain '{domain}'. "
        "Expected 'solar' or 'wind'."
    )


def validate_domain(domain: str) -> None:
    """Validate supported ML domain."""

    if domain.lower().strip() not in {"solar", "wind"}:
        raise ValueError(
            f"Unsupported ML domain '{domain}'. "
            "Expected 'solar' or 'wind'."
        )