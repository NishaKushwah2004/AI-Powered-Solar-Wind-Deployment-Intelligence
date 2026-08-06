from pydantic import BaseModel, ConfigDict, Field


class GISResult(BaseModel):
    """
    Result returned after GIS enrichment.

    Includes:
    - Raw GIS attributes collected from providers
    - Derived suitability metrics used by the
      Environmental Intelligence Engine
    """

    model_config = ConfigDict(from_attributes=True)

    # --------------------------------------------------
    # Raw GIS Data
    # --------------------------------------------------

    land_use: str | None = None

    elevation: float | None = None

    road_distance: float | None = None

    nearest_substation_distance: float | None = None

    nearest_transmission_line_distance: float | None = None

    existing_infrastructure: str | None = None

    water_body_distance: float | None = None

    protected_area_distance: float | None = None

    land_slope: float | None = Field(
        default=None,
        description="Terrain slope in degrees.",
    )

    vegetation_index: float | None = Field(
        default=None,
        description="NDVI vegetation index from Sentinel.",
    )

    # --------------------------------------------------
    # Derived GIS Intelligence
    # --------------------------------------------------

    terrain_classification: str | None = Field(
        default=None,
        description="Flat / Moderate / Steep terrain classification.",
    )

    infrastructure_score: float | None = Field(
        default=None,
        ge=0,
        le=100,
        description="Infrastructure accessibility score (0-100).",
    )

    gis_score: float | None = Field(
        default=None,
        ge=0,
        le=100,
        description="Overall GIS suitability score (0-100).",
    )

    site_suitability: str | None = Field(
        default=None,
        description="Overall geographic suitability classification.",
        examples=[
            "Excellent",
            "Good",
            "Moderate",
            "Poor",
        ],
    )