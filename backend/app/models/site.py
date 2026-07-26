from typing import TYPE_CHECKING

from sqlalchemy import Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base_model import TimestampMixin

if TYPE_CHECKING:
    from app.models.project import Project


class Site(Base, TimestampMixin):
    __tablename__ = "sites"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ----------------------------
    # Geographic Coordinates
    # ----------------------------

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    # ----------------------------
    # Site Information
    # ----------------------------

    region: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    land_area: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    elevation: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    existing_infrastructure: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    # ----------------------------
    # GIS Enrichment (Milestone 1)
    # ----------------------------

    land_use: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True,
    )

    road_distance: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    nearest_substation_distance: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    nearest_transmission_line_distance: Mapped[
        float | None
    ] = mapped_column(
        Float,
        nullable=True,
    )

    project_id: Mapped[int] = mapped_column(
        ForeignKey("projects.id"),
        nullable=False,
    )

    project: Mapped["Project"] = relationship(
        back_populates="sites",
    )