from sqlalchemy import ForeignKey, String, Text, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base_model import TimestampMixin

from typing import TYPE_CHECKING, List

if TYPE_CHECKING:
    from app.models.user import User

if TYPE_CHECKING:
    from app.models.site import Site


class Project(Base, TimestampMixin):
    __tablename__ = "projects"

    __table_args__ = (
        Index("idx_project_region", "region"),
        Index("idx_project_created_by", "created_by"),
    )

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

    region: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    sites: Mapped[List["Site"]] = relationship(
        back_populates="project",
        cascade="all, delete-orphan",
    )

    created_by: Mapped[int] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    owner: Mapped["User"] = relationship(
        back_populates="projects",
        lazy="select",
    )