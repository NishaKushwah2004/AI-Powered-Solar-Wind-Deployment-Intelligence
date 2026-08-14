from sqlalchemy.orm import Session

from app.repositories.site_scoring_repository import (
    SiteScoringRepository,
)
from app.schemas.site_scoring import (
    ScoreComponent,
    SiteScoringResponse,
    SuitabilityCategory,
)


class SiteScoringService:
    """
    Site Scoring Engine.

    Converts the outputs of the Site Suitability Intelligence
    Engine into the deployment scoring model specified by the
    internship requirements.
    """

    RESOURCE_WEIGHT = 0.35
    GEOGRAPHIC_WEIGHT = 0.25
    INFRASTRUCTURE_WEIGHT = 0.15
    ENVIRONMENTAL_WEIGHT = 0.15
    ECONOMIC_WEIGHT = 0.10

    def __init__(self, db: Session):
        self.repository = SiteScoringRepository(db)

    # =========================================================
    # Main scoring method
    # =========================================================

    def calculate_score(
        self,
        site_id: int,
        suitability_data: dict,
    ) -> SiteScoringResponse:

        site = self.repository.get_site(site_id)

        if site is None:
            raise ValueError(
                f"Site {site_id} not found."
            )

        solar_score = self._normalize(
            suitability_data.get("solar_score")
        )

        wind_score = self._normalize(
            suitability_data.get("wind_score")
        )

        resource_score = self._calculate_resource_score(
            solar_score,
            wind_score,
        )

        geographic_score = self._extract_factor_score(
            suitability_data,
            "geographic_suitability",
        )

        infrastructure_score = self._extract_factor_score(
            suitability_data,
            "infrastructure_accessibility",
        )

        environmental_score = self._extract_factor_score(
            suitability_data,
            "environmental_impact",
        )

        economic_score = self._extract_factor_score(
            suitability_data,
            "economic_feasibility",
        )

        renewable_component = self._build_component(
            resource_score,
            self.RESOURCE_WEIGHT,
        )

        geographic_component = self._build_component(
            geographic_score,
            self.GEOGRAPHIC_WEIGHT,
        )

        infrastructure_component = self._build_component(
            infrastructure_score,
            self.INFRASTRUCTURE_WEIGHT,
        )

        environmental_component = self._build_component(
            environmental_score,
            self.ENVIRONMENTAL_WEIGHT,
        )

        economic_component = self._build_component(
            economic_score,
            self.ECONOMIC_WEIGHT,
        )

        overall_score = round(
            renewable_component.weighted_score
            + geographic_component.weighted_score
            + infrastructure_component.weighted_score
            + environmental_component.weighted_score
            + economic_component.weighted_score,
            2,
        )

        category = self._get_category(
            overall_score
        )

        investment_score = economic_score

        return SiteScoringResponse(
            site_id=site_id,

            solar_suitability_score=solar_score,

            wind_suitability_score=wind_score,

            infrastructure_score=infrastructure_score,

            investment_score=investment_score,

            overall_deployment_score=overall_score,

            category=category,

            renewable_resource=renewable_component,

            geographic_suitability=geographic_component,

            infrastructure_accessibility=(
                infrastructure_component
            ),

            environmental_impact=(
                environmental_component
            ),

            economic_feasibility=(
                economic_component
            ),
        )

    # =========================================================
    # Resource score
    # =========================================================

    @staticmethod
    def _calculate_resource_score(
        solar_score: float,
        wind_score: float,
    ) -> float:
        """
        Combine existing solar and wind suitability.

        The solar and wind prediction engines are NOT
        recalculated here.
        """

        scores = [
            score
            for score in (
                solar_score,
                wind_score,
            )
            if score > 0
        ]

        if not scores:
            return 0.0

        return round(
            sum(scores) / len(scores),
            2,
        )

    # =========================================================
    # Factor extraction
    # =========================================================

    @staticmethod
    def _extract_factor_score(
        suitability_data: dict,
        key: str,
    ) -> float:

        value = suitability_data.get(key)

        if isinstance(value, dict):
            value = value.get("score")

        return SiteScoringService._normalize(
            value
        )

    # =========================================================
    # Normalization
    # =========================================================

    @staticmethod
    def _normalize(value) -> float:

        if value is None:
            return 0.0

        try:
            value = float(value)
        except (
            TypeError,
            ValueError,
        ):
            return 0.0

        return round(
            max(
                0.0,
                min(
                    100.0,
                    value,
                ),
            ),
            2,
        )

    # =========================================================
    # Weighted component
    # =========================================================

    @staticmethod
    def _build_component(
        score: float,
        weight: float,
    ) -> ScoreComponent:

        return ScoreComponent(
            score=round(
                score,
                2,
            ),
            weight=weight,
            weighted_score=round(
                score * weight,
                2,
            ),
        )

    # =========================================================
    # Category
    # =========================================================

    @staticmethod
    def _get_category(
        score: float,
    ) -> SuitabilityCategory:

        if score >= 85:
            return SuitabilityCategory.EXCELLENT

        if score >= 70:
            return SuitabilityCategory.HIGHLY_SUITABLE

        if score >= 50:
            return SuitabilityCategory.MODERATELY_SUITABLE

        if score >= 30:
            return SuitabilityCategory.LOW_SUITABILITY

        return SuitabilityCategory.UNSUITABLE