from pydantic import BaseModel, ConfigDict, Field


class HybridPrediction(BaseModel):
    """
    Hybrid renewable prediction.
    """

    model_config = ConfigDict(from_attributes=True)

    solar_contribution: float = Field(
        ...,
        ge=0,
        le=100,
    )

    wind_contribution: float = Field(
        ...,
        ge=0,
        le=100,
    )

    total_expected_energy: float = Field(
        ...,
        ge=0,
    )

    recommended_configuration: str

    confidence: float = Field(
        ...,
        ge=0,
        le=1,
    )