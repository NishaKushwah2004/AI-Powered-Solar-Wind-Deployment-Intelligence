from pydantic import BaseModel


class SolarMetrics(BaseModel):
    annual_irradiance: float | None = None

    peak_sun_hours: float | None = None

    expected_energy_output: float | None = None

    capacity_factor: float | None = None

    performance_ratio: float | None = None