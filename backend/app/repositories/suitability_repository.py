from sqlalchemy.orm import Session

from app.models.site import Site


class SuitabilityRepository:
    """
    Repository responsible for retrieving the existing intelligence
    data required by the Site Suitability Engine.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_site(self, site_id: int) -> Site | None:
        return (
            self.db.query(Site)
            .filter(Site.id == site_id)
            .first()
        )

    def get_site_intelligence(self, site_id: int) -> dict:
        """
        Collect existing site information.

        Existing GIS / Environmental / Prediction / Assessment
        services should be used by the service layer rather than
        duplicating their calculations here.
        """

        site = self.get_site(site_id)

        if site is None:
            return {}

        return {
            "site": site,
        }