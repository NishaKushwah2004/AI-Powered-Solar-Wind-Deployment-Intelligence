from app.environmental.models.weather_result import WeatherResult
from app.environmental.models.solar_result import SolarResult

from app.environmental.models.solar_metrics import SolarMetrics
from app.environmental.models.wind_metrics import WindMetrics


class FeatureEngineering:
    """
    Creates feature vectors for renewable energy prediction models.
    """

    def create_feature_vector(
        self,
        weather: WeatherResult,
        solar: SolarResult,
        solar_metrics: SolarMetrics,
        wind_metrics: WindMetrics,
    ) -> dict:

        return {
            # Weather Features
            "temperature": weather.temperature,
            "humidity": weather.humidity,
            "rainfall": weather.rainfall,
            "wind_speed": weather.wind_speed,
            "wind_direction": weather.wind_direction,
            "pressure": weather.pressure,
            "cloud_cover": weather.cloud_cover,

            # Solar Resource Features
            "ghi": solar.ghi,
            "dni": solar.dni,
            "dhi": solar.dhi,
            "solar_irradiance": solar.solar_irradiance,

            # Solar Metrics
            "annual_irradiance": solar_metrics.annual_irradiance,
            "peak_sun_hours": solar_metrics.peak_sun_hours,
            "expected_energy_output": solar_metrics.expected_energy_output,
            "solar_capacity_factor": solar_metrics.capacity_factor,
            "performance_ratio": solar_metrics.performance_ratio,

            # Wind Metrics
            "average_wind_speed": wind_metrics.average_wind_speed,
            "wind_power_density": wind_metrics.wind_power_density,
            "wind_capacity_factor": wind_metrics.capacity_factor,
            "expected_annual_energy": wind_metrics.expected_annual_energy,
            "wind_suitability_score": wind_metrics.suitability_score,
        }