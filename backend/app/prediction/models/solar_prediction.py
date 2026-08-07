from pydantic import BaseModel, ConfigDict, Field


class SolarPrediction(BaseModel):
    """
    Solar prediction result.
    """

    model_config = ConfigDict(from_attributes=True)

    predicted_capacity_factor: float = Field(
        ...,
        ge=0,
        le=1,
    )

    predicted_energy_output: float = Field(
        ...,
        ge=0,
    )

    panel_efficiency: float = Field(
        ...,
        ge=0,
        le=1,
    )

    confidence: float = Field(
        ...,
        ge=0,
        le=1,
    )