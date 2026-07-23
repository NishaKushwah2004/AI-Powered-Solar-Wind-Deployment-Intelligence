# app/environmental/models/solar_assessment.py

from pydantic import BaseModel

from app.environmental.models.solar_metrics import SolarMetrics


class SeasonalForecast(BaseModel):
    spring: float = 0.0
    summer: float = 0.0
    autumn: float = 0.0
    winter: float = 0.0


class SolarAssessment(BaseModel):
    metrics: SolarMetrics

    panel_efficiency: float

    shading_factor: float

    seasonal_forecast: SeasonalForecast