from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.site import Site
from app.models.user import User


class DashboardRepository:

    def __init__(self, db: Session):
        self.db = db

    def count_projects(self) -> int:
        return self.db.query(Project).count()

    def count_sites(self) -> int:
        return self.db.query(Site).count()

    def count_users(self) -> int:
        return self.db.query(User).count()