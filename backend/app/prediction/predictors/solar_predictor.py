from app.environmental.models.solar_result import SolarResult
from app.environmental.models.weather_result import WeatherResult
from app.prediction.models.solar_prediction import SolarPrediction
from app.services.solar_service import SolarService


class SolarPredictor:
    """
    Solar prediction adapter.

    This class delegates all solar prediction logic to
    SolarService, ensuring there is a single source of
    truth for solar calculations.

    In future, this adapter can be replaced with an
    ML model (Random Forest, XGBoost, TensorFlow, etc.)
    without changing the PredictionService API.
    """

    def __init__(
        self,
        solar_service: SolarService,
    ):
        self.solar_service = solar_service

    def predict(
        self,
        weather: WeatherResult,
        solar: SolarResult,
    ) -> SolarPrediction:
        """
        Generate a solar prediction using SolarService.
        """

        assessment = (
            self.solar_service.generate_solar_assessment(
                weather,
                solar,
            )
        )

        confidence = 0.95

        if weather.cloud_cover is not None:
            confidence -= min(
                weather.cloud_cover / 100 * 0.05,
                0.05,
            )

        if solar.ghi is None:
            confidence -= 0.15

        confidence = max(
            round(confidence, 2),
            0.70,
        )

        return SolarPrediction(
            predicted_capacity_factor=assessment.metrics.capacity_factor,
            predicted_energy_output=assessment.metrics.expected_energy_output,
            panel_efficiency=assessment.panel_efficiency,
            confidence=confidence,
        )