from typing import Optional

from app.schemas.base import BaseSchema
from pydantic import Field


class SiteBase(BaseSchema):
    """
    Common fields shared by all site schemas.
    """

    name: str = Field(
        min_length=3,
        max_length=150,
    )
    description: Optional[str] = None
    latitude: float = Field(
        ge=-90,
        le=90,
        description="Latitude must be between -90 and 90",
    )

    longitude: float = Field(
        ge=-180,
        le=180,
        description="Longitude must be between -180 and 180",
    )
    project_id: int


class SiteCreate(SiteBase):
    """
    Schema used when creating a site.
    """
    pass


class SiteUpdate(BaseSchema):
    """
    Schema used when updating a site.
    """

    name: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[float] = Field(
        default=None,
        ge=-90,
        le=90,
    )

    longitude: Optional[float] = Field(
        default=None,
        ge=-180,
        le=180,
    )
    project_id: Optional[int] = None


class SiteResponse(SiteBase):
    """
    Schema returned by the API.
    """

    id: int