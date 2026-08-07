from pydantic import BaseModel, ConfigDict

from app.environmental.models.weather_result import WeatherResult
from app.environmental.models.solar_result import SolarResult
from app.gis.models.gis_result import GISResult


class PredictionInput(BaseModel):
    """
    Common input for renewable energy prediction.
    """

    model_config = ConfigDict(from_attributes=True)

    latitude: float

    longitude: float

    weather: WeatherResult

    solar: SolarResult

    gis: GISResult | None = None