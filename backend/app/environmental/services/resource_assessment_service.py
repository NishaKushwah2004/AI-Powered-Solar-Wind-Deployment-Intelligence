from app.environmental.models.resource_assessment_report import (
    ResourceAssessmentReport,
)
from app.environmental.models.resource_assessment import (
    ResourceAssessment,
)

from app.services.solar_service import SolarService
from app.services.wind_service import WindService


class ResourceAssessmentService:
    """
    Generates a comprehensive renewable resource assessment report.

    Uses weighted scoring inspired by the project specification:
        Renewable Resource      : 35%
        Geographic Suitability  : 25%
        Infrastructure          : 15%
        Environmental           : 15%
        Economic Feasibility    : 10%
    """

    def __init__(
        self,
        solar_service: SolarService,
        wind_service: WindService,
    ):
        self.solar_service = solar_service
        self.wind_service = wind_service

    # ---------------------------------------------------------
    # Helper methods
    # ---------------------------------------------------------

    def _renewable_score(
        self,
        solar_cf: float,
        wind_cf: float,
    ) -> float:
        return (
            ((solar_cf * 100) + (wind_cf * 100))
            / 2
        )

    def _environmental_score(
        self,
        weather,
    ) -> float:

        score = 100.0

        if weather.cloud_cover is not None:
            score -= weather.cloud_cover * 0.3

        if weather.rainfall is not None:
            score -= min(weather.rainfall * 0.2, 20)

        return max(score, 0)

    def _economic_score(
        self,
        infrastructure_score: float,
        geographic_score: float,
    ) -> float:
        """
        Estimate economic feasibility from
        infrastructure accessibility and
        geographic suitability.
        """

        return round(
            (
                infrastructure_score * 0.7
                + geographic_score * 0.3
            ),
            2,
        )

    def _classify_score(
        self,
        score: float,
    ) -> str:

        if score >= 80:
            return "Excellent"

        if score >= 60:
            return "High"

        if score >= 40:
            return "Moderate"

        return "Low"


    def _energy_source(
        self,
        solar_cf: float,
        wind_cf: float,
    ) -> str:

        if (
            solar_cf >= 0.20
            and wind_cf >= 0.35
        ):
            return "Hybrid"

        if solar_cf >= wind_cf:
            return "Solar"

        return "Wind"

    def _overall_score(
        self,
        renewable: float,
        geographic: float,
        infrastructure: float,
        environmental: float,
        economic: float,
    ) -> float:

        return round(
            (
                renewable * 0.35
                + geographic * 0.25
                + infrastructure * 0.15
                + environmental * 0.15
                + economic * 0.10
            ),
            2,
        )

    def _recommendation(
        self,
        overall_score: float,
    ) -> str:

        if overall_score >= 90:
            return (
                "Excellent Site for Hybrid Solar-Wind Deployment"
            )

        if overall_score >= 80:
            return (
                "Highly Suitable for Hybrid Solar-Wind Deployment"
            )

        if overall_score >= 65:
            return (
                "Suitable for Renewable Energy Development"
            )

        if overall_score >= 50:
            return (
                "Moderately Suitable - Detailed Feasibility Study Recommended"
            )

        return "Further Site Investigation Required"

    def _confidence_score(
        self,
        weather,
        solar,
        gis,
    ) -> float:
        """
        Estimate confidence based on the availability
        of environmental and GIS data.
        """

        confidence = 1.0

        if weather.cloud_cover is None:
            confidence -= 0.05

        if gis is None:
            confidence -= 0.10

        if solar.ghi is None:
            confidence -= 0.15

        return round(
            max(confidence, 0.70),
            2,
        )

    # ---------------------------------------------------------
    # Main report generation
    # ---------------------------------------------------------

    def generate_report(
        self,
        site,
        weather,
        solar,
        gis=None,
        resource_metrics=None,
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

        renewable_score = self._renewable_score(
            solar_assessment.metrics.capacity_factor,
            wind_assessment.metrics.capacity_factor,
        )

        if gis is not None:

            geographic_score = (
                gis.gis_score
                if gis.gis_score is not None
                else 60.0
            )

            infrastructure_score = (
                gis.infrastructure_score
                if gis.infrastructure_score is not None
                else 60.0
            )

        else:

            geographic_score = 60.0
            infrastructure_score = 60.0

        environmental_score = self._environmental_score(
            weather,
        )

        economic_score = self._economic_score(
            infrastructure_score,
            geographic_score,
        )

        overall_score = self._overall_score(
            renewable_score,
            geographic_score,
            infrastructure_score,
            environmental_score,
            economic_score,
        )

        recommendation = self._recommendation(
            overall_score,
        )

        confidence = self._confidence_score(
            weather,
            solar,
            gis,
        )

        resource_metrics = ResourceAssessment(
            solar_score=round(
                solar_assessment.metrics.capacity_factor * 100,
                2,
            ),
            wind_score=round(
                wind_assessment.metrics.capacity_factor * 100,
                2,
            ),
            renewable_resource_score=round(
                renewable_score,
                2,
            ),
            geographic_score=round(
                geographic_score,
                2,
            ),
            infrastructure_score=round(
                infrastructure_score,
                2,
            ),
            environmental_score=round(
                environmental_score,
                2,
            ),
            economic_score=round(
                economic_score,
                2,
            ),
            overall_score=overall_score,
            solar_potential=self._classify_score(
                solar_assessment.metrics.capacity_factor * 100,
            ),
            wind_potential=self._classify_score(
                wind_assessment.metrics.capacity_factor * 100,
            ),
            recommended_energy_source=self._energy_source(
                solar_assessment.metrics.capacity_factor,
                wind_assessment.metrics.capacity_factor,
            ),
            confidence_score=round(
                confidence,
                2,
            ),                      
        )

        return ResourceAssessmentReport(
            site_name=site.name,
            latitude=site.latitude,
            longitude=site.longitude,
            environmental_summary=weather,
            solar_assessment=solar_assessment,
            wind_assessment=wind_assessment,
            gis_summary=gis,
            resource_metrics=resource_metrics,
            recommendation=recommendation,
        )