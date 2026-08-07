from app.environmental.models.weather_result import WeatherResult
from app.prediction.models.wind_prediction import WindPrediction
from app.services.wind_service import WindService


class WindPredictor:
    """
    Wind prediction adapter.

    This class delegates all wind prediction logic to
    WindService, ensuring there is a single source of
    truth for wind calculations.

    In future, this adapter can be replaced with an
    ML model (Random Forest, XGBoost, TensorFlow, etc.)
    without changing the PredictionService API.
    """

    def __init__(
        self,
        wind_service: WindService,
    ):
        self.wind_service = wind_service

    def predict(
        self,
        weather: WeatherResult,
    ) -> WindPrediction:
        """
        Generate a wind prediction using WindService.
        """

        assessment = (
            self.wind_service.generate_wind_assessment(
                weather,
            )
        )

        confidence = 0.94

        if weather.wind_speed is None:
            confidence -= 0.15

        if weather.pressure is None:
            confidence -= 0.05

        if weather.humidity is None:
            confidence -= 0.05

        confidence = max(
            round(confidence, 2),
            0.70,
        )

        return WindPrediction(
            predicted_capacity_factor=assessment.metrics.capacity_factor,
            predicted_energy_output=assessment.metrics.expected_annual_energy,
            wind_power_density=assessment.metrics.wind_power_density,
            confidence=confidence,
        )