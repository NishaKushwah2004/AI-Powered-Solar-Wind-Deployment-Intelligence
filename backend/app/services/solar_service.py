from app.environmental.models.solar_result import SolarResult
from app.environmental.models.solar_metrics import SolarMetrics


class SolarService:
    """
    Solar Potential Prediction Service.

    Responsible for calculating
    solar resource metrics from
    environmental data.
    """

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

        performance_ratio = 0.80

        annual_irradiance = (
            solar.ghi * 365
        )

        expected_energy_output = (
            annual_irradiance
            * performance_ratio
        )

        return SolarMetrics(
            peak_sun_hours=peak_sun_hours,
            capacity_factor=capacity_factor,
            performance_ratio=performance_ratio,
            annual_irradiance=annual_irradiance,
            expected_energy_output=expected_energy_output,
        )