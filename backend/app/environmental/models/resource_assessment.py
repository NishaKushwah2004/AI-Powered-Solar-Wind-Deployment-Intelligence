from pydantic import BaseModel, Field


class ResourceAssessment(BaseModel):
    """
    Combined renewable resource assessment metrics.
    """

    solar_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    wind_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    renewable_resource_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Combined renewable resource score",
    )

    geographic_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    infrastructure_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    environmental_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    economic_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    overall_score: float = Field(
        ...,
        ge=0,
        le=100,
    )

    solar_potential: str

    wind_potential: str

    recommended_energy_source: str

    confidence_score: float = Field(
        ...,
        ge=0,
        le=1,
    )