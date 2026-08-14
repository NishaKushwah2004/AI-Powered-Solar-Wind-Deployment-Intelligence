from __future__ import annotations

from fastapi import HTTPException

from app.environmental.clients.nasa_power_client import (
    NASAPowerClient,
)
from app.environmental.clients.weather_client import (
    WeatherClient,
)
from app.environmental.services.resource_assessment_service import (
    ResourceAssessmentService,
)
from app.gis.models import GISResult
from app.repositories.project_repository import (
    ProjectRepository,
)
from app.repositories.site_repository import (
    SiteRepository,
)
from app.services.gis_enrichment_service import (
    GISEnrichmentService,
)


class EnvironmentalService:
    """
    Environmental Intelligence Orchestrator.

    Responsible for:

        Weather data
            ↓
        NASA solar resource
            ↓
        GIS enrichment
            ↓
        Resource Assessment

    This service coordinates providers and services.
    It does not implement prediction algorithms itself.
    """

    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
        weather_client: WeatherClient,
        nasa_client: NASAPowerClient,
        resource_assessment_service: ResourceAssessmentService,
        gis_enrichment_service: GISEnrichmentService,
    ):

        self.site_repository = site_repository
        self.project_repository = project_repository

        self.weather_client = weather_client
        self.nasa_client = nasa_client

        self.resource_assessment_service = (
            resource_assessment_service
        )

        self.gis_enrichment_service = (
            gis_enrichment_service
        )

    # =========================================================
    # GIS
    # =========================================================

    def _build_gis_result(
        self,
        site,
    ) -> GISResult:
        """
        Build GIS information from stored site data.

        If enrichment data is unavailable, live GIS enrichment
        is attempted.
        """

        gis_fields = (
            "land_use",
            "elevation",
            "road_distance",
            "nearest_substation_distance",
            "nearest_transmission_line_distance",
            "existing_infrastructure",
            "water_body_distance",
            "protected_area_distance",
            "land_slope",
            "vegetation_index",
        )

        has_stored_gis = any(
            getattr(site, field, None) is not None
            for field in gis_fields
        )

        if has_stored_gis:

            return GISResult(
                land_use=site.land_use,
                elevation=site.elevation,
                road_distance=site.road_distance,
                nearest_substation_distance=(
                    site.nearest_substation_distance
                ),
                nearest_transmission_line_distance=(
                    site.nearest_transmission_line_distance
                ),
                existing_infrastructure=(
                    site.existing_infrastructure
                ),
                water_body_distance=(
                    site.water_body_distance
                ),
                protected_area_distance=(
                    site.protected_area_distance
                ),
                land_slope=site.land_slope,
                vegetation_index=site.vegetation_index,
                terrain_classification=None,
                infrastructure_score=0,
                gis_score=0,
                site_suitability="Unknown",
            )

        return self._enrich_gis(
            site.latitude,
            site.longitude,
        )

    def _enrich_gis(
        self,
        latitude: float,
        longitude: float,
    ) -> GISResult:

        try:
            return self.gis_enrichment_service.enrich_site(
                latitude,
                longitude,
            )

        except Exception:
            return GISResult(
                land_use=None,
                elevation=0,
                road_distance=None,
                nearest_substation_distance=None,
                nearest_transmission_line_distance=None,
                existing_infrastructure=None,
                water_body_distance=None,
                protected_area_distance=None,
                land_slope=0,
                vegetation_index=None,
                terrain_classification="Unknown",
                infrastructure_score=0,
                gis_score=0,
                site_suitability="Unknown",
            )

    # =========================================================
    # PROVIDER DATA
    # =========================================================

    def _get_environmental_inputs(
        self,
        latitude: float,
        longitude: float,
    ):

        weather = self.weather_client.get_weather(
            latitude,
            longitude,
        )

        solar = self.nasa_client.get_solar_resource(
            latitude,
            longitude,
        )

        gis = self._enrich_gis(
            latitude,
            longitude,
        )

        return weather, solar, gis

    # =========================================================
    # AD-HOC LOCATION
    # =========================================================

    def get_environmental_data(
        self,
        latitude: float,
        longitude: float,
    ):

        weather, solar, gis = (
            self._get_environmental_inputs(
                latitude,
                longitude,
            )
        )

        site = type(
            "Site",
            (),
            {
                "name": "Ad-hoc Location",
                "latitude": latitude,
                "longitude": longitude,
            },
        )()

        assessment = (
            self.resource_assessment_service.generate_report(
                site=site,
                weather=weather,
                solar=solar,
                gis=gis,
            )
        )

        return {
            "weather": weather,
            "solar": solar,
            "gis": gis,
            "assessment": assessment,
        }

    # =========================================================
    # SITE
    # =========================================================

    def get_site_environment(
        self,
        site_id: int,
    ):

        site = self.site_repository.get_by_id(
            site_id,
        )

        if site is None:
            raise HTTPException(
                status_code=404,
                detail="Site not found.",
            )

        weather = self.weather_client.get_weather(
            site.latitude,
            site.longitude,
        )

        solar = self.nasa_client.get_solar_resource(
            site.latitude,
            site.longitude,
        )

        gis = self._build_gis_result(site)

        report = (
            self.resource_assessment_service.generate_report(
                site=site,
                weather=weather,
                solar=solar,
                gis=gis,
            )
        )

        return {
            "site": site,
            "weather": weather,
            "solar": solar,
            "gis": gis,
            "assessment": report,
        }

    # =========================================================
    # PROJECT
    # =========================================================

    def get_project_environment(
        self,
        project_id: int,
    ):

        project = self.project_repository.get_by_id(
            project_id,
        )

        if project is None:
            raise HTTPException(
                status_code=404,
                detail="Project not found.",
            )

        sites = self.site_repository.get_by_project(
            project_id,
        )

        reports = []

        for site in sites:

            weather = self.weather_client.get_weather(
                site.latitude,
                site.longitude,
            )

            solar = self.nasa_client.get_solar_resource(
                site.latitude,
                site.longitude,
            )

            gis = self._build_gis_result(site)

            report = (
                self.resource_assessment_service.generate_report(
                    site=site,
                    weather=weather,
                    solar=solar,
                    gis=gis,
                )
            )

            reports.append(
                {
                    "site": site,
                    "weather": weather,
                    "solar": solar,
                    "gis": gis,
                    "assessment": report,
                }
            )

        return {
            "project_id": project.id,
            "project_name": project.name,
            "sites": reports,
        }