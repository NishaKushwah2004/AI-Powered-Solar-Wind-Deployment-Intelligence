from pydantic import BaseModel, ConfigDict

from app.prediction.models.hybrid_prediction import (
    HybridPrediction,
)
from app.prediction.models.solar_prediction import (
    SolarPrediction,
)
from app.prediction.models.wind_prediction import (
    WindPrediction,
)


class PredictionResult(BaseModel):
    """
    Complete renewable prediction result.
    """

    model_config = ConfigDict(from_attributes=True)

    solar_prediction: SolarPrediction

    wind_prediction: WindPrediction

    hybrid_prediction: HybridPrediction