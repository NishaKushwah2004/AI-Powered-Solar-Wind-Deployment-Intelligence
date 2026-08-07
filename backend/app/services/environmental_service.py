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
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository
from app.services.gis_enrichment_service import (
    GISEnrichmentService,
)

class EnvironmentalService:
    """
    Environmental Intelligence Engine.

    Coordinates environmental data collection,
    GIS enrichment and renewable resource
    assessment.
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

    def get_environmental_data(
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

        gis = self.gis_enrichment_service.enrich_site(
            latitude,
            longitude,
        )

        assessment = (
            self.resource_assessment_service.generate_report(
                site=type(
                    "Site",
                    (),
                    {
                        "name": "Ad-hoc Location",
                        "latitude": latitude,
                        "longitude": longitude,
                    },
                )(),
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

        gis = self.gis_enrichment_service.enrich_site(
            site.latitude,
            site.longitude,
        )

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

            gis = (
                self.gis_enrichment_service.enrich_site(
                    site.latitude,
                    site.longitude,
                )
            )

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