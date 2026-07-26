from app.environmental.models.resource_assessment_report import (
    ResourceAssessmentReport,
)

from app.services.solar_service import SolarService
from app.services.wind_service import WindService


class ResourceAssessmentService:
    """
    Generates a renewable resource assessment report.
    """

    def __init__(
        self,
        solar_service: SolarService,
        wind_service: WindService,
    ):
        self.solar_service = solar_service
        self.wind_service = wind_service

    def generate_report(
        self,
        site,
        weather,
        solar,
    ) -> ResourceAssessmentReport:

        solar_assessment = (
            self.solar_service.generate_solar_assessment(
                weather,
                solar,
            )
        )

        wind_assessment = (
            self.wind_service.generate_wind_assessment(
                weather,
            )
        )

        if (
            solar_assessment.metrics.capacity_factor >= 0.20
            and
            wind_assessment.metrics.capacity_factor >= 0.35
        ):
            recommendation = (
                "Suitable for Hybrid Solar-Wind Deployment"
            )

        elif (
            solar_assessment.metrics.capacity_factor >= 0.20
        ):
            recommendation = (
                "Suitable for Solar Deployment"
            )

        elif (
            wind_assessment.metrics.capacity_factor >= 0.35
        ):
            recommendation = (
                "Suitable for Wind Deployment"
            )

        else:
            recommendation = (
                "Further Site Investigation Required"
            )

        return ResourceAssessmentReport(
            site_name=site.name,
            latitude=site.latitude,
            longitude=site.longitude,
            solar_assessment=solar_assessment,
            wind_assessment=wind_assessment,
            recommendation=recommendation,
        )