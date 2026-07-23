from app.ml.features.feature_engineering import (
    FeatureEngineering,
)

from app.ml.models.solar_predictor import (
    SolarPredictor,
)

from app.ml.models.wind_predictor import (
    WindPredictor,
)

from app.ml.models.suitability_predictor import (
    SuitabilityPredictor,
)


class PredictionService:
    """
    Coordinates renewable energy prediction models.
    """

    def __init__(
        self,
        feature_engineering: FeatureEngineering,
        solar_predictor: SolarPredictor,
        wind_predictor: WindPredictor,
        suitability_predictor: SuitabilityPredictor,
    ):
        self.feature_engineering = feature_engineering
        self.solar_predictor = solar_predictor
        self.wind_predictor = wind_predictor
        self.suitability_predictor = suitability_predictor

    def predict(
        self,
        weather,
        solar,
        solar_metrics,
        wind_metrics,
    ):

        features = self.feature_engineering.create_feature_vector(
            weather=weather,
            solar=solar,
            solar_metrics=solar_metrics,
            wind_metrics=wind_metrics,
        )

        solar_prediction = self.solar_predictor.predict(
            features
        )

        wind_prediction = self.wind_predictor.predict(
            features
        )

        suitability_prediction = (
            self.suitability_predictor.predict(
                features
            )
        )

        return {
            "solar_prediction": solar_prediction,
            "wind_prediction": wind_prediction,
            "suitability_prediction": suitability_prediction,
        }