from fastapi import HTTPException, status

from app.models.site import Site
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository
from app.schemas.site import SiteCreate, SiteUpdate
from app.services.base_service import BaseService


class SiteService(BaseService[SiteRepository]):
    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
    ):
        super().__init__(site_repository)
        self.project_repository = project_repository

    def get_all_sites(self):
        return self.repository.get_all()

    def get_site_by_id(self, site_id: int):
        site = self.repository.get_by_id(site_id)

        if site is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Site not found",
            )

        return site

    def get_sites_by_project(self, project_id: int):
        project = self.project_repository.get_by_id(project_id)

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        return self.repository.get_by_project(project_id)

    def create_site(self, site_data: SiteCreate):
        project = self.project_repository.get_by_id(
            site_data.project_id
        )

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        site = Site(
            name=site_data.name,
            description=site_data.description,
            latitude=site_data.latitude,
            longitude=site_data.longitude,
            project_id=site_data.project_id,
        )

        return self.repository.create(site)

    def update_site(
        self,
        site_id: int,
        site_data: SiteUpdate,
    ):
        site = self.get_site_by_id(site_id)

        if (
            site_data.project_id is not None
            and site_data.project_id != site.project_id
        ):
            project = self.project_repository.get_by_id(
                site_data.project_id
            )

            if project is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Project not found",
                )

            site.project_id = site_data.project_id

        if site_data.name is not None:
            site.name = site_data.name

        if site_data.description is not None:
            site.description = site_data.description

        if site_data.latitude is not None:
            site.latitude = site_data.latitude

        if site_data.longitude is not None:
            site.longitude = site_data.longitude

        return self.repository.update(site)

    def delete_site(self, site_id: int):
        site = self.get_site_by_id(site_id)

        self.repository.delete(site)

        return {
            "message": "Site deleted successfully"
        }