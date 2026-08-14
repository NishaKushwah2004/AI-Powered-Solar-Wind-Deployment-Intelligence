from sqlalchemy.orm import Session

from app.models.site import Site


class SiteScoringRepository:
    """
    Repository for Site Scoring.

    Existing GIS, Environmental, Assessment and Prediction
    repositories remain the source of their respective data.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_site(self, site_id: int) -> Site | None:
        return (
            self.db.query(Site)
            .filter(Site.id == site_id)
            .first()
        )