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

    PERFORMANCE_COEFFICIENT = 0.42

    HOURS_PER_YEAR = 8760

    CUT_IN_SPEED = 3.0
    RATED_SPEED = 12.0
    CUT_OUT_SPEED = 25.0

    def calculate_capacity_factor(
        self,
        wind_speed: float,
    ) -> float:
        """
        Estimate turbine capacity factor using
        a simplified wind turbine power curve.
        """

        if wind_speed < self.CUT_IN_SPEED:
            return 0.0

        if wind_speed < self.RATED_SPEED:
            return round(
                (wind_speed - self.CUT_IN_SPEED)
                / (self.RATED_SPEED - self.CUT_IN_SPEED),
                3,
            )

        if wind_speed <= self.CUT_OUT_SPEED:
            return 1.0

        return 0.0

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

        capacity_factor = self.calculate_capacity_factor(
            wind_speed
        )

        expected_annual_energy = (
            wind_power_density
            * self.HOURS_PER_YEAR
            * capacity_factor
            * self.PERFORMANCE_COEFFICIENT
        )

        suitability_score = min(
            capacity_factor * 100,
            100,
        )

        return WindMetrics(
            average_wind_speed=wind_speed,
            wind_power_density=round(
                wind_power_density,
                2,
            ),
            capacity_factor=capacity_factor,
            expected_annual_energy=round(
                expected_annual_energy,
                2,
            ),
            suitability_score=round(
                suitability_score,
                2,
            ),
        )

    def calculate_turbulence_intensity(
        self,
        wind_speed: float,
    ) -> float:
        """
        Estimate turbulence intensity based on
        average wind speed.
        """

        if wind_speed <= 0:
            return 0.0

        if wind_speed < 4:
            return 0.18

        if wind_speed < 8:
            return 0.14

        return 0.10

    def assess_turbine_suitability(
        self,
        wind_speed: float,
    ) -> str:

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
        Seasonal wind generation distribution.
        """

        return SeasonalWindForecast(
            spring=round(
                annual_energy * 0.25,
                2,
            ),
            summer=round(
                annual_energy * 0.20,
                2,
            ),
            autumn=round(
                annual_energy * 0.28,
                2,
            ),
            winter=round(
                annual_energy * 0.27,
                2,
            ),
        )

    def generate_wind_assessment(
        self,
        weather: WeatherResult,
    ) -> WindAssessment:

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