from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.site import Site


class ProjectManagerDashboardRepository:

    def __init__(self, db: Session):

        self.db = db


    def get_projects(self) -> list[Project]:

        return (
            self.db
            .query(Project)
            .all()
        )


    def get_sites(self) -> list[Site]:

        return (
            self.db
            .query(Site)
            .all()
        )