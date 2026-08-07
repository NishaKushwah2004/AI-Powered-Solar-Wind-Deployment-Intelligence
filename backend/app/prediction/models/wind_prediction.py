from pydantic import BaseModel, ConfigDict, Field


class WindPrediction(BaseModel):
    """
    Wind prediction result.
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

    wind_power_density: float = Field(
        ...,
        ge=0,
    )

    confidence: float = Field(
        ...,
        ge=0,
        le=1,
    )