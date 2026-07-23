from app.environmental.models.weather_result import (
    WeatherResult,
)
from app.environmental.models.wind_metrics import (
    WindMetrics,
)


class WindService:
    """
    Wind Resource Estimation Service.

    Calculates wind resource metrics
    using weather data.
    """

    AIR_DENSITY = 1.225  # kg/m³

    PERFORMANCE_COEFFICIENT = 0.40

    HOURS_PER_YEAR = 8760

    def calculate_wind_metrics(
        self,
        weather: WeatherResult,
    ) -> WindMetrics:

        if weather.wind_speed is None:

            return WindMetrics()

        wind_speed = weather.wind_speed

        wind_power_density = (
            0.5
            * self.AIR_DENSITY
            * (wind_speed ** 3)
        )

        capacity_factor = min(
            wind_speed / 12,
            1,
        )

        expected_annual_energy = (
            wind_power_density
            * self.HOURS_PER_YEAR
            * self.PERFORMANCE_COEFFICIENT
        )

        suitability_score = min(
            (wind_speed / 15) * 100,
            100,
        )

        return WindMetrics(
            average_wind_speed=wind_speed,
            wind_power_density=wind_power_density,
            capacity_factor=capacity_factor,
            expected_annual_energy=expected_annual_energy,
            suitability_score=suitability_score,
        )