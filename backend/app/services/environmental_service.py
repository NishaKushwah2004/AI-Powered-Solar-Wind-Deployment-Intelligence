from app.environmental.clients.nasa_power_client import (
    NASAPowerClient,
)
from app.environmental.clients.weather_client import (
    WeatherClient,
)
from app.services.assessment_service import (
    AssessmentService,
)
from app.services.solar_service import (
    SolarService,
)
from app.services.wind_service import (
    WindService,
)
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository


class EnvironmentalService:

    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
        weather_client: WeatherClient,
        nasa_client: NASAPowerClient,
        solar_service: SolarService,
        wind_service: WindService,
        assessment_service: AssessmentService,
    ):

        self.site_repository = site_repository
        self.project_repository = project_repository

        self.weather_client = weather_client
        self.nasa_client = nasa_client

        self.solar_service = solar_service
        self.wind_service = wind_service

        self.assessment_service = assessment_service

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

        solar_metrics = (
            self.solar_service.calculate_solar_metrics(
                solar
            )
        )

        wind_metrics = (
            self.wind_service.calculate_wind_metrics(
                weather
            )
        )

        assessment = (
            self.assessment_service.generate_assessment(
                solar_metrics,
                wind_metrics,
            )
        )

        return {
            "weather": weather,
            "solar": solar,
            "solar_metrics": solar_metrics,
            "wind_metrics": wind_metrics,
            "assessment": assessment,
        }

    def get_site_environment(
        self,
        site_id: int,
    ):

        site = self.site_repository.get_by_id(site_id)

        if site is None:
            raise ValueError("Site not found.")

        return self.get_environmental_data(
            site.latitude,
            site.longitude,
        )

    def get_project_environment(
        self,
        project_id: int,
    ):

        project = self.project_repository.get_by_id(project_id)

        if project is None:
            raise ValueError("Project not found.")

        sites = self.site_repository.get_by_project(
            project_id
        )

        results = []

        for site in sites:

            results.append(
                {
                    "site_id": site.id,
                    "site_name": site.name,
                    "environment": self.get_environmental_data(
                        site.latitude,
                        site.longitude,
                    ),
                }
            )

        return {
            "project_id": project.id,
            "project_name": project.name,
            "sites": results,
        }