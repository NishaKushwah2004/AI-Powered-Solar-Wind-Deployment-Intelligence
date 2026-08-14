from __future__ import annotations

from app.environmental.models.resource_assessment import (
    ResourceAssessment,
)
from app.environmental.models.resource_assessment_report import (
    ResourceAssessmentReport,
)

from app.services.solar_service import SolarService
from app.services.wind_service import WindService


class ResourceAssessmentService:
    """
    Resource Assessment Engine.

    Responsibility:
        - Combine solar and wind resource results.
        - Incorporate GIS suitability.
        - Incorporate environmental conditions.
        - Produce a unified resource assessment.

    This service does NOT perform ML prediction.
    ML prediction is handled by PredictionService/predictors.
    """

    RENEWABLE_WEIGHT = 0.35
    GEOGRAPHIC_WEIGHT = 0.25
    INFRASTRUCTURE_WEIGHT = 0.15
    ENVIRONMENTAL_WEIGHT = 0.15
    ECONOMIC_WEIGHT = 0.10

    DEFAULT_GIS_SCORE = 60.0
    DEFAULT_INFRASTRUCTURE_SCORE = 60.0

    def __init__(
        self,
        solar_service: SolarService,
        wind_service: WindService,
    ):
        self.solar_service = solar_service
        self.wind_service = wind_service

    # =========================================================
    # SCORE CALCULATIONS
    # =========================================================

    @staticmethod
    def _renewable_score(
        solar_cf: float,
        wind_cf: float,
    ) -> float:
        """
        Convert solar/wind capacity factors into
        a combined 0-100 renewable resource score.
        """

        solar_score = max(
            0.0,
            min(100.0, solar_cf * 100),
        )

        wind_score = max(
            0.0,
            min(100.0, wind_cf * 100),
        )

        return round(
            (solar_score + wind_score) / 2,
            2,
        )

    @staticmethod
    def _environmental_score(
        weather,
    ) -> float:
        """
        Calculate an environmental score from
        available weather indicators.

        Missing values do not automatically reduce
        the score.
        """

        score = 100.0

        cloud_cover = getattr(
            weather,
            "cloud_cover",
            None,
        )

        rainfall = getattr(
            weather,
            "rainfall",
            None,
        )

        if cloud_cover is not None:
            score -= min(
                max(float(cloud_cover), 0.0) * 0.3,
                30.0,
            )

        if rainfall is not None:
            score -= min(
                max(float(rainfall), 0.0) * 0.2,
                20.0,
            )

        return round(
            max(score, 0.0),
            2,
        )

    @staticmethod
    def _economic_score(
        infrastructure_score: float,
        geographic_score: float,
    ) -> float:
        """
        Baseline economic feasibility proxy.

        This is intentionally isolated so that it can later
        be replaced by an ML/economic feasibility model.
        """

        return round(
            infrastructure_score * 0.7
            + geographic_score * 0.3,
            2,
        )

    def _overall_score(
        self,
        renewable: float,
        geographic: float,
        infrastructure: float,
        environmental: float,
        economic: float,
    ) -> float:

        score = (
            renewable * self.RENEWABLE_WEIGHT
            + geographic * self.GEOGRAPHIC_WEIGHT
            + infrastructure * self.INFRASTRUCTURE_WEIGHT
            + environmental * self.ENVIRONMENTAL_WEIGHT
            + economic * self.ECONOMIC_WEIGHT
        )

        return round(
            max(0.0, min(100.0, score)),
            2,
        )

    # =========================================================
    # CLASSIFICATION
    # =========================================================

    @staticmethod
    def _classify_score(
        score: float,
    ) -> str:

        if score >= 80:
            return "Excellent"

        if score >= 60:
            return "High"

        if score >= 40:
            return "Moderate"

        return "Low"

    @staticmethod
    def _energy_source(
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

    @staticmethod
    def _recommendation(
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
                "Moderately Suitable - Detailed Feasibility "
                "Study Recommended"
            )

        return "Further Site Investigation Required"

    # =========================================================
    # CONFIDENCE
    # =========================================================

    @staticmethod
    def _confidence_score(
        weather,
        solar,
        gis,
    ) -> float:
        """
        Calculate data availability confidence.

        This is data-quality confidence, not ML prediction
        confidence.
        """

        confidence = 1.0

        if getattr(
            weather,
            "cloud_cover",
            None,
        ) is None:
            confidence -= 0.05

        if gis is None:
            confidence -= 0.10

        if getattr(
            solar,
            "ghi",
            None,
        ) is None:
            confidence -= 0.15

        return round(
            max(confidence, 0.70),
            2,
        )

    # =========================================================
    # GIS
    # =========================================================

    def _get_gis_scores(
        self,
        gis,
    ) -> tuple[float, float]:

        if gis is None:
            return (
                self.DEFAULT_GIS_SCORE,
                self.DEFAULT_INFRASTRUCTURE_SCORE,
            )

        geographic_score = getattr(
            gis,
            "gis_score",
            None,
        )

        infrastructure_score = getattr(
            gis,
            "infrastructure_score",
            None,
        )

        if geographic_score is None:
            geographic_score = self.DEFAULT_GIS_SCORE

        if infrastructure_score is None:
            infrastructure_score = (
                self.DEFAULT_INFRASTRUCTURE_SCORE
            )

        return (
            float(geographic_score),
            float(infrastructure_score),
        )

    # =========================================================
    # MAIN
    # =========================================================

    def generate_report(
        self,
        site,
        weather,
        solar,
        gis=None,
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

        solar_cf = float(
            solar_assessment.metrics.capacity_factor
        )

        wind_cf = float(
            wind_assessment.metrics.capacity_factor
        )

        renewable_score = self._renewable_score(
            solar_cf,
            wind_cf,
        )

        (
            geographic_score,
            infrastructure_score,
        ) = self._get_gis_scores(gis)

        environmental_score = (
            self._environmental_score(
                weather
            )
        )

        economic_score = self._economic_score(
            infrastructure_score,
            geographic_score,
        )

        overall_score = self._overall_score(
            renewable=renewable_score,
            geographic=geographic_score,
            infrastructure=infrastructure_score,
            environmental=environmental_score,
            economic=economic_score,
        )

        confidence = self._confidence_score(
            weather,
            solar,
            gis,
        )

        resource_metrics = ResourceAssessment(
            solar_score=round(
                solar_cf * 100,
                2,
            ),
            wind_score=round(
                wind_cf * 100,
                2,
            ),
            renewable_resource_score=renewable_score,
            geographic_score=round(
                geographic_score,
                2,
            ),
            infrastructure_score=round(
                infrastructure_score,
                2,
            ),
            environmental_score=environmental_score,
            economic_score=economic_score,
            overall_score=overall_score,
            solar_potential=self._classify_score(
                solar_cf * 100
            ),
            wind_potential=self._classify_score(
                wind_cf * 100
            ),
            recommended_energy_source=self._energy_source(
                solar_cf,
                wind_cf,
            ),
            confidence_score=confidence,
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
            recommendation=self._recommendation(
                overall_score
            ),
        )