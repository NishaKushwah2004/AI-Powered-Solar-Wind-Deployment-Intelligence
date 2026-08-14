from sqlalchemy.orm import Session

from app.models.site import Site


class PlannerDashboardRepository:

    def __init__(self, db: Session):

        self.db = db


    def get_sites(self) -> list[Site]:

        return (
            self.db
            .query(Site)
            .all()
        )