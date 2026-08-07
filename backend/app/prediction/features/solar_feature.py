from pydantic import BaseModel, ConfigDict, Field


class SolarFeatures(BaseModel):
    """
    Engineered features for solar prediction.
    """

    model_config = ConfigDict(from_attributes=True)

    ghi: float = Field(..., ge=0)

    dni: float = Field(..., ge=0)

    dhi: float = Field(..., ge=0)

    peak_sun_hours: float = Field(..., ge=0)

    temperature: float

    cloud_cover: float = Field(..., ge=0, le=100)

    humidity: float = Field(..., ge=0, le=100)

    elevation: float = Field(..., ge=0)

    vegetation_index: float = Field(..., ge=0, le=1)

    land_slope: float = Field(..., ge=0)