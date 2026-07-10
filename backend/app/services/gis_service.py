from sqlalchemy.orm import Session

from app.gis.coordinates import bounding_box, center_point
from app.gis.geojson import (
    project_sites_to_feature_collection,
    site_to_feature,
    sites_to_feature_collection,
)
from app.models.site import Site
from app.repositories.site_repository import SiteRepository
from app.repositories.project_repository import ProjectRepository
from app.schemas.geojson import Feature, FeatureCollection
from app.gis.constants import DEFAULT_CRS
from app.services.base_service import BaseService


class GISService(BaseService[SiteRepository]):

    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
    ):
        super().__init__(site_repository)
        self.project_repository = project_repository

    def get_all_sites_geojson(self) -> FeatureCollection:
        sites = self.repository.get_all()
        return sites_to_feature_collection(sites)

    def get_site_geojson(self, site_id: int) -> Feature:
        site = self.repository.get_by_id(site_id)

        if site is None:
            raise ValueError("Site not found.")

        return site_to_feature(site)

    def get_project_geojson(
        self,
        project_id: int,
    ) -> FeatureCollection:

        project = self.project_repository.get_by_id(project_id)

        if project is None:
            raise ValueError("Project not found.")

        return project_sites_to_feature_collection(project)

    def get_bounding_box(self):
        sites = self.repository.get_all()

        if not sites:
            return None

        coords = [
            (site.latitude, site.longitude)
            for site in sites
        ]

        min_lat, min_lon, max_lat, max_lon = bounding_box(coords)

        return {
            "min_latitude": min_lat,
            "min_longitude": min_lon,
            "max_latitude": max_lat,
            "max_longitude": max_lon,
        }

    def get_map_summary(self):
        sites = self.repository.get_all()

        if not sites:
            return {
                "total_sites": 0,
                "center": None,
                "bounding_box": None,
            }

        coords = [
            (site.latitude, site.longitude)
            for site in sites
        ]

        center = center_point(coords)

        bbox = bounding_box(coords)

        return {
            "total_sites": len(sites),
            "center": {
                "latitude": center[0],
                "longitude": center[1],
            },
            "bounding_box": {
                "min_latitude": bbox[0],
                "min_longitude": bbox[1],
                "max_latitude": bbox[2],
                "max_longitude": bbox[3],
            },
        }
    
    def get_map_config(self):
        """
        Default configuration for map frontends.
        """

        return {
            "default_center": [20.5937, 78.9629],  # India
            "default_zoom": 5,
            "min_zoom": 3,
            "max_zoom": 18,
            "tile_provider": "OpenStreetMap",
            "crs": DEFAULT_CRS,
        }