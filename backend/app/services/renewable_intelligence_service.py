from app.services.environmental_service import EnvironmentalService
from app.ml.services.prediction_service import PredictionService


class RenewableIntelligenceService:
    """
    Coordinates environmental analysis and AI predictions.
    """

    def __init__(
        self,
        environmental_service: EnvironmentalService,
        prediction_service: PredictionService,
    ):
        self.environmental_service = environmental_service
        self.prediction_service = prediction_service

    def analyze_site(
        self,
        site_id: int,
    ):
        environment = self.environmental_service.get_site_environment(
            site_id
        )

        predictions = self.prediction_service.predict(
            weather=environment["weather"],
            solar=environment["solar"],
            solar_metrics=environment["solar_metrics"],
            wind_metrics=environment["wind_metrics"],
        )

        return {
            "environment": environment,
            "predictions": predictions,
        }