from app.prediction.models.prediction_input import (
    PredictionInput,
)
from app.prediction.models.prediction_result import (
    PredictionResult,
)
from app.prediction.predictors.hybrid_predictor import (
    HybridPredictor,
)
from app.prediction.predictors.solar_predictor import (
    SolarPredictor,
)
from app.prediction.predictors.wind_predictor import (
    WindPredictor,
)


class PredictionService:
    """
    Renewable Energy Prediction Engine.

    Orchestrates the prediction workflow using
    injected predictor implementations.

    Predictor implementations can later be replaced
    by trained ML models without changing the API.
    """

    def __init__(
        self,
        solar_predictor: SolarPredictor,
        wind_predictor: WindPredictor,
        hybrid_predictor: HybridPredictor,
    ):
        self.solar_predictor = solar_predictor
        self.wind_predictor = wind_predictor
        self.hybrid_predictor = hybrid_predictor

    def predict(
        self,
        data: PredictionInput,
    ) -> PredictionResult:
        """
        Generate complete renewable prediction.
        """

        solar_prediction = (
            self.solar_predictor.predict(
                weather=data.weather,
                solar=data.solar,
            )
        )

        wind_prediction = (
            self.wind_predictor.predict(
                weather=data.weather,
            )
        )

        hybrid_prediction = (
            self.hybrid_predictor.predict(
                solar=solar_prediction,
                wind=wind_prediction,
            )
        )

        return PredictionResult(
            solar_prediction=solar_prediction,
            wind_prediction=wind_prediction,
            hybrid_prediction=hybrid_prediction,
        )