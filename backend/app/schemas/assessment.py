from __future__ import annotations

from pydantic import BaseModel


class AssessmentResponse(BaseModel):

    latitude: float
    longitude: float

    solar_generation_mw: float
    wind_generation_mw: float
    total_generation_mw: float

    recommended_resource: str

    suitability_score: float

    assessment: str

    model_version: str
    data_source: str