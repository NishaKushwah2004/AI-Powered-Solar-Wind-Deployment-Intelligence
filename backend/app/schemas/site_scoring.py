from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class SuitabilityCategory(str, Enum):
    EXCELLENT = "Excellent"
    HIGHLY_SUITABLE = "Highly Suitable"
    MODERATELY_SUITABLE = "Moderately Suitable"
    LOW_SUITABILITY = "Low Suitability"
    UNSUITABLE = "Unsuitable"


class ScoreComponent(BaseModel):
    score: float = Field(..., ge=0, le=100)
    weight: float = Field(..., ge=0, le=1)
    weighted_score: float = Field(..., ge=0, le=100)


class SiteScoringResponse(BaseModel):
    site_id: int

    solar_suitability_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    wind_suitability_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    infrastructure_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    investment_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    overall_deployment_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    category: SuitabilityCategory

    renewable_resource: ScoreComponent
    geographic_suitability: ScoreComponent
    infrastructure_accessibility: ScoreComponent
    environmental_impact: ScoreComponent
    economic_feasibility: ScoreComponent

    ranking_position: Optional[int] = None