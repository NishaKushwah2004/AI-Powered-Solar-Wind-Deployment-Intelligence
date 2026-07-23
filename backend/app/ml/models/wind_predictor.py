from app.ml.schemas.prediction_result import PredictionResult


class WindPredictor:
    """
    Predicts wind energy potential.
    """

    MODEL_NAME = "Wind Predictor (Placeholder)"

    def predict(self, features: dict) -> PredictionResult:
        wind_speed = features.get("average_wind_speed", 0)

        prediction = wind_speed * 120

        confidence = 0.74

        return PredictionResult(
            prediction=prediction,
            confidence=confidence,
            model_name=self.MODEL_NAME,
        )