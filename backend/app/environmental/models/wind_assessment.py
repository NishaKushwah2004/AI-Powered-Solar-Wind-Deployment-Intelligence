from pydantic import BaseModel

from app.environmental.models.wind_metrics import WindMetrics


class SeasonalWindForecast(BaseModel):
    spring: float = 0.0
    summer: float = 0.0
    autumn: float = 0.0
    winter: float = 0.0


class WindAssessment(BaseModel):
    metrics: WindMetrics

    turbulence_intensity: float

    turbine_suitability: str

    seasonal_forecast: SeasonalWindForecast