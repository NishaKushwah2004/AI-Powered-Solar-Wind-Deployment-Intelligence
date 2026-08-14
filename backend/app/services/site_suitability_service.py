from sqlalchemy.orm import Session

from app.repositories.suitability_repository import (
    SuitabilityRepository,
)
from app.schemas.suitability import (
    SiteSuitabilityResponse,
    SuitabilityCategory,
    SuitabilityFactor,
)


class SiteSuitabilityService:
    """
    Site Suitability Intelligence Engine.

    Consumes outputs from already implemented:
        - GIS Intelligence Engine
        - Environmental Intelligence Engine
        - Solar Prediction Engine
        - Wind Prediction Engine
        - Resource Assessment Engine

    and converts them into a unified site suitability assessment.
    """

    # Weights defined by the internship specification.
    RESOURCE_WEIGHT = 0.35
    GEOGRAPHIC_WEIGHT = 0.25
    INFRASTRUCTURE_WEIGHT = 0.15
    ENVIRONMENTAL_WEIGHT = 0.15
    ECONOMIC_WEIGHT = 0.10

    def __init__(self, db: Session):
        self.repository = SuitabilityRepository(db)

    # ---------------------------------------------------------
    # Public API
    # ---------------------------------------------------------

    def evaluate_site(
        self,
        site_id: int,
        intelligence: dict,
    ) -> SiteSuitabilityResponse:

        site_data = self.repository.get_site_intelligence(site_id)

        if not site_data:
            raise ValueError(f"Site {site_id} not found")

        renewable_data = intelligence.get(
            "renewable_resource",
            {},
        )

        geographic_data = intelligence.get(
            "geographic",
            {},
        )

        infrastructure_data = intelligence.get(
            "infrastructure",
            {},
        )

        environmental_data = intelligence.get(
            "environmental",
            {},
        )

        economic_data = intelligence.get(
            "economic",
            {},
        )

        solar_score = self._normalize_score(
            renewable_data.get("solar_score")
        )

        wind_score = self._normalize_score(
            renewable_data.get("wind_score")
        )

        resource_score = self._calculate_resource_score(
            solar_score=solar_score,
            wind_score=wind_score,
        )

        geographic_score = self._normalize_score(
            geographic_data.get("score")
        )

        infrastructure_score = self._normalize_score(
            infrastructure_data.get("score")
        )

        environmental_score = self._normalize_score(
            environmental_data.get("score")
        )

        economic_score = self._normalize_score(
            economic_data.get("score")
        )

        factors = {
            "renewable_resource": self._factor(
                resource_score,
                self.RESOURCE_WEIGHT,
                "Renewable resource availability",
            ),
            "geographic_suitability": self._factor(
                geographic_score,
                self.GEOGRAPHIC_WEIGHT,
                "Geographic and terrain suitability",
            ),
            "infrastructure_accessibility": self._factor(
                infrastructure_score,
                self.INFRASTRUCTURE_WEIGHT,
                "Infrastructure accessibility",
            ),
            "environmental_impact": self._factor(
                environmental_score,
                self.ENVIRONMENTAL_WEIGHT,
                "Environmental constraints",
            ),
            "economic_feasibility": self._factor(
                economic_score,
                self.ECONOMIC_WEIGHT,
                "Economic viability",
            ),
        }

        overall_score = round(
            sum(
                factor.weighted_score
                for factor in factors.values()
            ),
            2,
        )

        category = self._get_category(overall_score)

        deployment_feasible = (
            category != SuitabilityCategory.UNSUITABLE
        )

        strengths = self._identify_strengths(factors)

        constraints = self._identify_constraints(factors)

        recommendation = self._generate_recommendation(
            category=category,
            solar_score=solar_score,
            wind_score=wind_score,
            constraints=constraints,
        )

        return SiteSuitabilityResponse(
            site_id=site_id,
            overall_score=overall_score,
            category=category,

            renewable_resource=factors[
                "renewable_resource"
            ],

            geographic_suitability=factors[
                "geographic_suitability"
            ],

            infrastructure_accessibility=factors[
                "infrastructure_accessibility"
            ],

            environmental_impact=factors[
                "environmental_impact"
            ],

            economic_feasibility=factors[
                "economic_feasibility"
            ],

            deployment_feasible=deployment_feasible,

            recommendation=recommendation,

            strengths=strengths,
            constraints=constraints,

            solar_score=solar_score,
            wind_score=wind_score,
        )

    # ---------------------------------------------------------
    # Score calculations
    # ---------------------------------------------------------

    @staticmethod
    def _normalize_score(value) -> float:
        """
        Convert an incoming score to a safe 0-100 range.
        """

        if value is None:
            return 0.0

        try:
            value = float(value)
        except (TypeError, ValueError):
            return 0.0

        return round(
            max(0.0, min(100.0, value)),
            2,
        )

    @staticmethod
    def _calculate_resource_score(
        solar_score: float,
        wind_score: float,
    ) -> float:
        """
        Combine existing solar and wind resource scores.

        The actual solar/wind prediction logic remains in the
        existing prediction engines.
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

        return round(sum(scores) / len(scores), 2)

    @staticmethod
    def _factor(
        score: float,
        weight: float,
        explanation: str,
    ) -> SuitabilityFactor:

        weighted_score = score * weight

        return SuitabilityFactor(
            score=round(score, 2),
            weight=weight,
            weighted_score=round(weighted_score, 2),
            status=SiteSuitabilityService._score_status(score),
            explanation=explanation,
        )

    @staticmethod
    def _score_status(score: float) -> str:

        if score >= 80:
            return "Excellent"

        if score >= 65:
            return "Good"

        if score >= 50:
            return "Moderate"

        if score >= 30:
            return "Low"

        return "Poor"

    # ---------------------------------------------------------
    # Suitability classification
    # ---------------------------------------------------------

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

    # ---------------------------------------------------------
    # Strengths / constraints
    # ---------------------------------------------------------

    @staticmethod
    def _identify_strengths(
        factors: dict,
    ) -> list[str]:

        strengths = []

        for name, factor in factors.items():

            if factor.score >= 70:

                readable_name = name.replace(
                    "_",
                    " ",
                ).title()

                strengths.append(
                    f"{readable_name} is favorable."
                )

        return strengths

    @staticmethod
    def _identify_constraints(
        factors: dict,
    ) -> list[str]:

        constraints = []

        for name, factor in factors.items():

            if factor.score < 50:

                readable_name = name.replace(
                    "_",
                    " ",
                ).title()

                constraints.append(
                    f"{readable_name} requires attention."
                )

        return constraints

    # ---------------------------------------------------------
    # Recommendation
    # ---------------------------------------------------------

    @staticmethod
    def _generate_recommendation(
        category: SuitabilityCategory,
        solar_score: float,
        wind_score: float,
        constraints: list[str],
    ) -> str:

        if category == SuitabilityCategory.UNSUITABLE:
            return (
                "The site is currently unsuitable for "
                "renewable energy deployment."
            )

        if solar_score >= 70 and wind_score >= 70:
            return (
                "The site shows strong potential for "
                "hybrid solar-wind deployment."
            )

        if solar_score >= 70:
            return (
                "The site shows strong potential for "
                "solar energy deployment."
            )

        if wind_score >= 70:
            return (
                "The site shows strong potential for "
                "wind energy deployment."
            )

        if constraints:
            return (
                "The site may be suitable for deployment "
                "subject to the identified constraints."
            )

        return (
            "The site is potentially suitable for "
            "renewable energy deployment."
        )