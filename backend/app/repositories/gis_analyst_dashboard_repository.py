from sqlalchemy.orm import Session

from app.models.site import Site


class GISAnalystDashboardRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_sites(self) -> list[Site]:

        return (
            self.db
            .query(Site)
            .all()
        )

    def get_site(
        self,
        site_id: int,
    ) -> Site | None:

        return (
            self.db
            .query(Site)
            .filter(
                Site.id == site_id
            )
            .first()
        )