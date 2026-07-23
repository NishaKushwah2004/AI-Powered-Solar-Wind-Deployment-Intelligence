from app.environmental.models.solar_result import SolarResult
from app.environmental.models.solar_metrics import SolarMetrics
from app.environmental.models.solar_assessment import (
    SolarAssessment,
    SeasonalForecast,
)


class SolarService:
    """
    Solar Potential Prediction Service.

    Responsible for calculating
    solar resource metrics from
    environmental data.
    """

    BASE_PANEL_EFFICIENCY = 0.20
    TEMPERATURE_COEFFICIENT = 0.004
    PERFORMANCE_RATIO = 0.80

    def calculate_solar_metrics(
        self,
        solar: SolarResult,
    ) -> SolarMetrics:

        if solar.ghi is None:
            return SolarMetrics()

        peak_sun_hours = solar.ghi / 1000

        capacity_factor = min(
            peak_sun_hours / 24,
            1,
        )

        annual_irradiance = (
            solar.ghi * 365
        )

        expected_energy_output = (
            annual_irradiance
            * self.PERFORMANCE_RATIO
        )

        return SolarMetrics(
            peak_sun_hours=peak_sun_hours,
            capacity_factor=capacity_factor,
            performance_ratio=self.PERFORMANCE_RATIO,
            annual_irradiance=annual_irradiance,
            expected_energy_output=expected_energy_output,
        )

    def predict_panel_efficiency(
        self,
        temperature: float,
    ) -> float:
        """
        Estimate PV panel efficiency based on temperature.
        """

        efficiency = (
            self.BASE_PANEL_EFFICIENCY
            * (
                1
                - (
                    temperature - 25
                )
                * self.TEMPERATURE_COEFFICIENT
            )
        )

        return round(
            max(efficiency, 0),
            4,
        )

    def seasonal_energy_forecast(
        self,
        annual_energy: float,
    ) -> SeasonalForecast:
        """
        Simple seasonal distribution of annual energy.
        """

        return SeasonalForecast(
            spring=round(
                annual_energy * 0.25,
                2,
            ),
            summer=round(
                annual_energy * 0.30,
                2,
            ),
            autumn=round(
                annual_energy * 0.23,
                2,
            ),
            winter=round(
                annual_energy * 0.22,
                2,
            ),
        )

    def analyze_shading(
        self,
        cloud_cover: float,
    ) -> float:
        """
        Estimate shading factor
        using cloud cover.
        """

        if cloud_cover is None:
            return 1.0

        shading_factor = (
            100 - cloud_cover
        ) / 100

        return round(
            max(shading_factor, 0),
            2,
        )

    def generate_solar_assessment(
        self,
        weather,
        solar,
    ) -> SolarAssessment:
        """
        Generate complete solar assessment.
        """

        metrics = self.calculate_solar_metrics(
            solar,
        )

        panel_efficiency = (
            self.predict_panel_efficiency(
                weather.temperature
            )
        )

        shading_factor = (
            self.analyze_shading(
                weather.cloud_cover
            )
        )

        seasonal_forecast = (
            self.seasonal_energy_forecast(
                metrics.expected_energy_output
            )
        )

        return SolarAssessment(
            metrics=metrics,
            panel_efficiency=panel_efficiency,
            shading_factor=shading_factor,
            seasonal_forecast=seasonal_forecast,
        )