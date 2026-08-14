from sqlalchemy.orm import Session

from app.repositories.renewable_recommendation_repository import (
    RenewableRecommendationRepository,
)

from app.schemas.renewable_recommendation import (
    RecommendationConfidence,
    RenewableRecommendationResponse,
    RenewableTechnology,
    TechnologyScore,
)


class RenewableRecommendationService:
    """
    Renewable Energy Recommendation Logic.

    Determines whether a site is better suited for:

        - Solar
        - Wind
        - Hybrid Solar-Wind
        - Unsuitable

    The service consumes already-generated intelligence rather
    than recalculating prediction or GIS values.
    """

    MINIMUM_DEPLOYMENT_SCORE = 30

    SOLAR_THRESHOLD = 65
    WIND_THRESHOLD = 65
    HYBRID_THRESHOLD = 65

    def __init__(self, db: Session):
        self.repository = (
            RenewableRecommendationRepository(db)
        )

    # =========================================================
    # Main recommendation method
    # =========================================================

    def recommend(
        self,
        site_id: int,
        intelligence: dict,
    ) -> RenewableRecommendationResponse:

        site = self.repository.get_site(site_id)

        if site is None:
            raise ValueError(
                f"Site {site_id} not found."
            )

        solar_resource = self._normalize(
            intelligence.get("solar_score")
        )

        wind_resource = self._normalize(
            intelligence.get("wind_score")
        )

        overall_site_score = self._normalize(
            intelligence.get(
                "overall_deployment_score"
            )
        )

        solar_suitability = self._extract_score(
            intelligence,
            "solar_suitability_score",
            solar_resource,
        )

        wind_suitability = self._extract_score(
            intelligence,
            "wind_suitability_score",
            wind_resource,
        )

        deployment_feasible = (
            overall_site_score
            >= self.MINIMUM_DEPLOYMENT_SCORE
        )

        solar_score = self._calculate_technology_score(
            solar_resource,
            solar_suitability,
        )

        wind_score = self._calculate_technology_score(
            wind_resource,
            wind_suitability,
        )

        hybrid_score = self._calculate_hybrid_score(
            solar_score,
            wind_score,
        )

        if not deployment_feasible:

            technology = (
                RenewableTechnology.UNSUITABLE
            )

        else:

            technology = self._select_technology(
                solar_score,
                wind_score,
                hybrid_score,
            )

        confidence = self._calculate_confidence(
            technology=technology,
            solar_score=solar_score,
            wind_score=wind_score,
            overall_site_score=overall_site_score,
        )

        strengths = self._identify_strengths(
            solar_score,
            wind_score,
            overall_site_score,
        )

        constraints = self._identify_constraints(
            solar_score,
            wind_score,
            overall_site_score,
        )

        reason = self._generate_reason(
            technology=technology,
            solar_score=solar_score,
            wind_score=wind_score,
            hybrid_score=hybrid_score,
            constraints=constraints,
        )

        capacity_type = (
            self._get_capacity_type(
                technology
            )
        )

        return RenewableRecommendationResponse(
            site_id=site_id,

            recommended_technology=technology,

            confidence=confidence,

            solar=TechnologyScore(
                score=solar_score,
                resource_score=solar_resource,
                suitability_score=solar_suitability,
            ),

            wind=TechnologyScore(
                score=wind_score,
                resource_score=wind_resource,
                suitability_score=wind_suitability,
            ),

            hybrid_score=hybrid_score,

            overall_site_score=overall_site_score,

            deployment_feasible=deployment_feasible,

            recommendation_reason=reason,

            strengths=strengths,

            constraints=constraints,

            recommended_capacity_type=capacity_type,
        )

    # =========================================================
    # Technology score
    # =========================================================

    @staticmethod
    def _calculate_technology_score(
        resource_score: float,
        suitability_score: float,
    ) -> float:
        """
        Combine renewable resource availability and
        technology-specific site suitability.

        This does not replace the existing prediction model.
        """

        return round(
            (
                resource_score * 0.60
                + suitability_score * 0.40
            ),
            2,
        )

    # =========================================================
    # Hybrid score
    # =========================================================

    @staticmethod
    def _calculate_hybrid_score(
        solar_score: float,
        wind_score: float,
    ) -> float:

        if solar_score <= 0 and wind_score <= 0:
            return 0.0

        average_score = (
            solar_score + wind_score
        ) / 2

        balance = 100 - abs(
            solar_score - wind_score
        )

        hybrid_score = (
            average_score * 0.70
            + balance * 0.30
        )

        return round(
            max(
                0,
                min(
                    100,
                    hybrid_score,
                ),
            ),
            2,
        )

    # =========================================================
    # Technology selection
    # =========================================================

    def _select_technology(
        self,
        solar_score: float,
        wind_score: float,
        hybrid_score: float,
    ) -> RenewableTechnology:

        solar_available = (
            solar_score >= self.SOLAR_THRESHOLD
        )

        wind_available = (
            wind_score >= self.WIND_THRESHOLD
        )

        hybrid_available = (
            hybrid_score >= self.HYBRID_THRESHOLD
        )

        # Both technologies perform strongly.
        if (
            solar_available
            and wind_available
            and hybrid_available
        ):
            return RenewableTechnology.HYBRID

        # Solar is clearly stronger.
        if solar_available and (
            solar_score > wind_score
        ):
            return RenewableTechnology.SOLAR

        # Wind is clearly stronger.
        if wind_available and (
            wind_score > solar_score
        ):
            return RenewableTechnology.WIND

        # Hybrid is useful when both technologies
        # have meaningful potential.
        if hybrid_available:
            return RenewableTechnology.HYBRID

        # One technology may still be usable.
        if solar_available:
            return RenewableTechnology.SOLAR

        if wind_available:
            return RenewableTechnology.WIND

        return RenewableTechnology.UNSUITABLE

    # =========================================================
    # Confidence
    # =========================================================

    @staticmethod
    def _calculate_confidence(
        technology: RenewableTechnology,
        solar_score: float,
        wind_score: float,
        overall_site_score: float,
    ) -> RecommendationConfidence:

        if technology == RenewableTechnology.UNSUITABLE:
            return RecommendationConfidence.HIGH

        if technology == RenewableTechnology.SOLAR:

            if solar_score >= 80:
                return RecommendationConfidence.HIGH

            if solar_score >= 65:
                return RecommendationConfidence.MEDIUM

            return RecommendationConfidence.LOW

        if technology == RenewableTechnology.WIND:

            if wind_score >= 80:
                return RecommendationConfidence.HIGH

            if wind_score >= 65:
                return RecommendationConfidence.MEDIUM

            return RecommendationConfidence.LOW

        # Hybrid
        if (
            solar_score >= 75
            and wind_score >= 75
            and overall_site_score >= 70
        ):
            return RecommendationConfidence.HIGH

        if (
            solar_score >= 65
            and wind_score >= 65
        ):
            return RecommendationConfidence.MEDIUM

        return RecommendationConfidence.LOW

    # =========================================================
    # Strengths
    # =========================================================

    @staticmethod
    def _identify_strengths(
        solar_score: float,
        wind_score: float,
        overall_site_score: float,
    ) -> list[str]:

        strengths = []

        if solar_score >= 75:
            strengths.append(
                "Strong solar deployment potential."
            )

        if wind_score >= 75:
            strengths.append(
                "Strong wind deployment potential."
            )

        if (
            solar_score >= 65
            and wind_score >= 65
        ):
            strengths.append(
                "Both solar and wind resources "
                "support hybrid deployment."
            )

        if overall_site_score >= 70:
            strengths.append(
                "Overall site conditions are favorable "
                "for renewable deployment."
            )

        return strengths

    # =========================================================
    # Constraints
    # =========================================================

    @staticmethod
    def _identify_constraints(
        solar_score: float,
        wind_score: float,
        overall_site_score: float,
    ) -> list[str]:

        constraints = []

        if solar_score < 50:
            constraints.append(
                "Solar suitability is relatively low."
            )

        if wind_score < 50:
            constraints.append(
                "Wind suitability is relatively low."
            )

        if overall_site_score < 50:
            constraints.append(
                "Overall site suitability requires "
                "additional evaluation."
            )

        return constraints

    # =========================================================
    # Explanation
    # =========================================================

    @staticmethod
    def _generate_reason(
        technology: RenewableTechnology,
        solar_score: float,
        wind_score: float,
        hybrid_score: float,
        constraints: list[str],
    ) -> str:

        if technology == RenewableTechnology.SOLAR:

            return (
                "Solar is recommended because the site "
                "shows stronger solar resource and "
                "suitability characteristics than wind."
            )

        if technology == RenewableTechnology.WIND:

            return (
                "Wind is recommended because the site "
                "shows stronger wind resource and "
                "suitability characteristics than solar."
            )

        if technology == RenewableTechnology.HYBRID:

            return (
                "Hybrid solar-wind deployment is recommended "
                "because both renewable technologies show "
                "strong and complementary suitability."
            )

        if technology == RenewableTechnology.UNSUITABLE:

            return (
                "The site does not currently demonstrate "
                "sufficient renewable deployment suitability."
            )

        return (
            "The site requires further renewable "
            "deployment assessment."
        )

    # =========================================================
    # Capacity recommendation type
    # =========================================================

    @staticmethod
    def _get_capacity_type(
        technology: RenewableTechnology,
    ) -> str | None:

        if technology == RenewableTechnology.SOLAR:
            return "Solar Capacity"

        if technology == RenewableTechnology.WIND:
            return "Wind Capacity"

        if technology == RenewableTechnology.HYBRID:
            return "Hybrid Solar-Wind Capacity"

        return None

    # =========================================================
    # Helpers
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

    @staticmethod
    def _extract_score(
        intelligence: dict,
        key: str,
        fallback: float,
    ) -> float:

        value = intelligence.get(key)

        if isinstance(value, dict):
            value = value.get("score")

        if value is None:
            return fallback

        return RenewableRecommendationService._normalize(
            value
        )