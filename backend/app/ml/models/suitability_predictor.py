from app.ml.schemas.prediction_result import PredictionResult


class SuitabilityPredictor:
    """
    Predicts overall site suitability.
    """

    MODEL_NAME = "Suitability Predictor (Placeholder)"

    def predict(self, features: dict) -> PredictionResult:
        solar_score = features.get("solar_capacity_factor", 0)
        wind_score = features.get("wind_capacity_factor", 0)

        prediction = ((solar_score + wind_score) / 2) * 100

        confidence = 0.80

        return PredictionResult(
            prediction=prediction,
            confidence=confidence,
            model_name=self.MODEL_NAME,
        )