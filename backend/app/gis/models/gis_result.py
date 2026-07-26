from pydantic import BaseModel, ConfigDict


class GISResult(BaseModel):
    """
    Result returned after GIS enrichment.
    """

    model_config = ConfigDict(from_attributes=True)

    land_use: str | None = None

    elevation: float | None = None

    road_distance: float | None = None

    nearest_substation_distance: float | None = None

    nearest_transmission_line_distance: float | None = None

    existing_infrastructure: str | None = None