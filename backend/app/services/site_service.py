from fastapi import HTTPException, status

from app.models.site import Site
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository
from app.schemas.site import SiteCreate, SiteUpdate
from app.services.base_service import BaseService
from app.services.gis_enrichment_service import (
    GISEnrichmentService,
)


class SiteService(BaseService[SiteRepository]):
    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
    ):
        super().__init__(site_repository)

        self.project_repository = project_repository
        self.gis_enrichment_service = (
            GISEnrichmentService()
        )

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

        gis_data = (
            self.gis_enrichment_service.enrich_site(
                site_data.latitude,
                site_data.longitude,
            )
        )

        site = Site(
            name=site_data.name,
            description=site_data.description,

            latitude=site_data.latitude,
            longitude=site_data.longitude,

            region=site_data.region,
            land_area=site_data.land_area,

            elevation=gis_data.elevation,

            land_use=gis_data.land_use,

            existing_infrastructure=(
                gis_data.existing_infrastructure
            ),

            road_distance=(
                gis_data.road_distance
            ),

            nearest_substation_distance=(
                gis_data.nearest_substation_distance
            ),

            nearest_transmission_line_distance=(
                gis_data.nearest_transmission_line_distance
            ),

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

        if site_data.region is not None:
            site.region = site_data.region

        if site_data.land_area is not None:
            site.land_area = site_data.land_area

        if site_data.elevation is not None:
            site.elevation = site_data.elevation

        if site_data.existing_infrastructure is not None:
            site.existing_infrastructure = (
                site_data.existing_infrastructure
            )

        if site_data.land_use is not None:
            site.land_use = site_data.land_use

        if site_data.road_distance is not None:
            site.road_distance = site_data.road_distance

        if site_data.nearest_substation_distance is not None:
            site.nearest_substation_distance = (
                site_data.nearest_substation_distance
            )

        if site_data.nearest_transmission_line_distance is not None:
            site.nearest_transmission_line_distance = (
                site_data.nearest_transmission_line_distance
            )

        return self.repository.update(site)

    def delete_site(self, site_id: int):
        site = self.get_site_by_id(site_id)

        self.repository.delete(site)

        return {
            "message": "Site deleted successfully"
        }