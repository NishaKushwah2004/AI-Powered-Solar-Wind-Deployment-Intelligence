from app.ml.schemas.prediction_result import PredictionResult


class SolarPredictor:
    """
    Predicts solar energy potential.
    """

    MODEL_NAME = "Solar Predictor (Placeholder)"

    def predict(self, features: dict) -> PredictionResult:
        peak_sun_hours = features.get("peak_sun_hours", 0)

        prediction = peak_sun_hours * 100

        confidence = 0.75

        return PredictionResult(
            prediction=prediction,
            confidence=confidence,
            model_name=self.MODEL_NAME,
        )