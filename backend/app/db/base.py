from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


# Import models so Alembic can detect them
from app.models.role import Role  # noqa: E402,F401
from app.models.user import User  # noqa: E402,F401