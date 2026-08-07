from pydantic import BaseModel, ConfigDict, Field


class WindFeatures(BaseModel):
    """
    Engineered features for wind prediction.
    """

    model_config = ConfigDict(from_attributes=True)

    wind_speed: float = Field(..., ge=0)

    wind_direction: float = Field(..., ge=0, le=360)

    pressure: float = Field(..., ge=0)

    temperature: float

    humidity: float = Field(..., ge=0, le=100)

    elevation: float = Field(..., ge=0)

    land_slope: float = Field(..., ge=0)

    vegetation_index: float = Field(..., ge=0, le=1)