from app.environmental.models.solar_result import SolarResult
from app.environmental.models.solar_metrics import SolarMetrics
from app.environmental.models.solar_assessment import (
    SolarAssessment,
    SeasonalForecast,
)


class SolarService:
    """
    Solar Potential Prediction Service.

    Calculates solar resource metrics using
    environmental conditions.
    """

    BASE_PANEL_EFFICIENCY = 0.20
    TEMPERATURE_COEFFICIENT = 0.004
    BASE_PERFORMANCE_RATIO = 0.80

    def calculate_solar_metrics(
        self,
        solar: SolarResult,
    ) -> SolarMetrics:

        if solar.ghi is None:
            return SolarMetrics()

        peak_sun_hours = solar.ghi / 1000

        # Capacity factor (typical utility-scale solar range)
        capacity_factor = min(
            peak_sun_hours / 8,
            1.0,
        )

        annual_irradiance = (
            solar.ghi * 365
        )

        expected_energy_output = (
            annual_irradiance
            * self.BASE_PERFORMANCE_RATIO
        )

        return SolarMetrics(
            peak_sun_hours=round(
                peak_sun_hours,
                2,
            ),
            capacity_factor=round(
                capacity_factor,
                3,
            ),
            performance_ratio=self.BASE_PERFORMANCE_RATIO,
            annual_irradiance=round(
                annual_irradiance,
                2,
            ),
            expected_energy_output=round(
                expected_energy_output,
                2,
            ),
        )

    def predict_panel_efficiency(
        self,
        temperature: float,
        cloud_cover: float | None = None,
    ) -> float:
        """
        Estimate PV panel efficiency using
        temperature and cloud cover.
        """

        if temperature is None:
            temperature = 25

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

        if cloud_cover is not None:
            efficiency *= (
                1 - (cloud_cover / 100) * 0.05
            )

        return round(
            max(efficiency, 0),
            4,
        )

    def seasonal_energy_forecast(
        self,
        annual_energy: float,
        latitude: float | None = None,
    ) -> SeasonalForecast:
        """
        Estimate seasonal energy production.

        Northern hemisphere receives
        higher summer generation.
        """

        if latitude is None or latitude >= 0:

            spring = 0.27
            summer = 0.35
            autumn = 0.23
            winter = 0.15

        else:

            spring = 0.23
            summer = 0.15
            autumn = 0.27
            winter = 0.35

        return SeasonalForecast(
            spring=round(
                annual_energy * spring,
                2,
            ),
            summer=round(
                annual_energy * summer,
                2,
            ),
            autumn=round(
                annual_energy * autumn,
                2,
            ),
            winter=round(
                annual_energy * winter,
                2,
            ),
        )

    def analyze_shading(
        self,
        cloud_cover: float,
    ) -> float:
        """
        Estimate shading factor from cloud cover.
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

        shading_factor = self.analyze_shading(
            weather.cloud_cover,
        )

        panel_efficiency = (
            self.predict_panel_efficiency(
                weather.temperature,
                weather.cloud_cover,
            )
        )

        # Adjust expected energy after shading losses
        metrics.expected_energy_output = round(
            metrics.expected_energy_output
            * shading_factor,
            2,
        )

        seasonal_forecast = (
            self.seasonal_energy_forecast(
                metrics.expected_energy_output,
            )
        )

        return SolarAssessment(
            metrics=metrics,
            panel_efficiency=panel_efficiency,
            shading_factor=shading_factor,
            seasonal_forecast=seasonal_forecast,
        )