from pydantic import BaseModel


class WindMetrics(BaseModel):
    """
    Wind resource assessment metrics.
    """

    average_wind_speed: float | None = None

    wind_power_density: float | None = None

    capacity_factor: float | None = None

    expected_annual_energy: float | None = None

    suitability_score: float | None = None