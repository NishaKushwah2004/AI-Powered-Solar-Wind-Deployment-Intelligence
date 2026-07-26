from app.environmental.models.weather_result import (
    WeatherResult,
)
from app.environmental.models.wind_metrics import (
    WindMetrics,
)
from app.environmental.models.wind_assessment import (
    WindAssessment,
    SeasonalWindForecast,
)


class WindService:
    """
    Wind Potential Prediction Engine.
    """

    AIR_DENSITY = 1.225

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

    def calculate_turbulence_intensity(
        self,
        wind_speed: float,
    ) -> float:
        """
        Estimate turbulence intensity.
        """

        if wind_speed <= 0:
            return 0.0

        turbulence = min(
            0.10 + (wind_speed / 100),
            0.30,
        )

        return round(
            turbulence,
            2,
        )

    def assess_turbine_suitability(
        self,
        wind_speed: float,
    ) -> str:
        """
        Recommend turbine suitability based on average wind speed.
        """

        if wind_speed >= 8:
            return "Highly Suitable"

        if wind_speed >= 6:
            return "Suitable"

        if wind_speed >= 4:
            return "Moderately Suitable"

        return "Not Suitable"

    def seasonal_wind_forecast(
        self,
        annual_energy: float,
    ) -> SeasonalWindForecast:
        """
        Seasonal distribution of annual wind energy.
        """

        return SeasonalWindForecast(
            spring=round(
                annual_energy * 0.24,
                2,
            ),
            summer=round(
                annual_energy * 0.21,
                2,
            ),
            autumn=round(
                annual_energy * 0.27,
                2,
            ),
            winter=round(
                annual_energy * 0.28,
                2,
            ),
        )

    def generate_wind_assessment(
        self,
        weather: WeatherResult,
    ) -> WindAssessment:
        """
        Generate complete wind assessment.
        """

        metrics = self.calculate_wind_metrics(
            weather,
        )

        turbulence = (
            self.calculate_turbulence_intensity(
                metrics.average_wind_speed
            )
        )

        turbine = (
            self.assess_turbine_suitability(
                metrics.average_wind_speed
            )
        )

        forecast = (
            self.seasonal_wind_forecast(
                metrics.expected_annual_energy
            )
        )

        return WindAssessment(
            metrics=metrics,
            turbulence_intensity=turbulence,
            turbine_suitability=turbine,
            seasonal_forecast=forecast,
        )