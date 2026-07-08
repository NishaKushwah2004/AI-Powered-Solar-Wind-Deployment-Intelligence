from sqlalchemy.orm import Session

from app.models.site import Site
from app.repositories.base_repository import BaseRepository


class SiteRepository(BaseRepository[Site]):
    def __init__(self, db: Session):
        super().__init__(db)

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
    ):
        return (
            self.db.query(Site)
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_id(self, site_id: int):
        return (
            self.db.query(Site)
            .filter(Site.id == site_id)
            .first()
        )

    def get_by_project(self, project_id: int):
        return (
            self.db.query(Site)
            .filter(Site.project_id == project_id)
            .order_by(Site.created_at.desc())
            .all()
        )

    def create(self, site: Site):
        self.db.add(site)
        self.db.commit()
        self.db.refresh(site)
        return site

    def update(self, site: Site):
        self.db.commit()
        self.db.refresh(site)
        return site

    def delete(self, site: Site):
        self.db.delete(site)
        self.db.commit()