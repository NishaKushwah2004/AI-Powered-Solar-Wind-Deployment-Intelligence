from __future__ import annotations

from sqlalchemy.orm import Session

from app.repositories.deployment_optimization_repository import (
    DeploymentOptimizationRepository,
)
from app.schemas.deployment_optimization import (
    CapacityPlan,
    DeploymentOptimizationResponse,
    DeploymentTechnology,
    ExpansionPlan,
    LocationRecommendation,
)


class DeploymentOptimizationService:
    """
    Deployment Optimization Engine.

    Consumes outputs from:

        Prediction Engine
        Resource Assessment Engine
        GIS Engine

    Produces:

        Technology recommendation
        Capacity plan
        Location recommendation
        Expansion recommendation

    It does not perform ML prediction.
    """

    MINIMUM_DEPLOYMENT_SCORE = 50.0

    MAX_SINGLE_TECH_CAPACITY_MW = 100.0
    MAX_HYBRID_CAPACITY_MW = 150.0

    def __init__(
        self,
        db: Session,
    ):
        self.repository = (
            DeploymentOptimizationRepository(db)
        )

    # =========================================================
    # MAIN
    # =========================================================

    def optimize_site(
        self,
        site_id: int,
        intelligence: dict,
    ) -> DeploymentOptimizationResponse:

        site = self.repository.get_site(
            site_id
        )

        if site is None:
            raise ValueError(
                f"Site {site_id} not found."
            )

        deployment_score = self._normalize(
            intelligence.get(
                "overall_deployment_score"
            )
        )

        technology = self._get_technology(
            intelligence
        )

        solar_score = self._normalize(
            intelligence.get("solar_score")
        )

        wind_score = self._normalize(
            intelligence.get("wind_score")
        )

        hybrid_score = self._normalize(
            intelligence.get("hybrid_score")
        )

        recommended_location = (
            deployment_score
            >= self.MINIMUM_DEPLOYMENT_SCORE
        )

        hybrid_recommended = (
            technology
            == DeploymentTechnology.HYBRID
        )

        capacity_plan = (
            self._calculate_capacity_plan(
                technology=technology,
                deployment_score=deployment_score,
                solar_score=solar_score,
                wind_score=wind_score,
            )
        )

        location_recommendation = (
            self._build_location_recommendation(
                site_id=site_id,
                deployment_score=deployment_score,
                technology=technology,
            )
        )

        expansion_plan = (
            self._build_expansion_plan(
                deployment_score=deployment_score,
                technology=technology,
            )
        )

        reason = (
            self._generate_optimization_reason(
                technology=technology,
                deployment_score=deployment_score,
                hybrid_score=hybrid_score,
                capacity_plan=capacity_plan,
            )
        )

        return DeploymentOptimizationResponse(
            site_id=site_id,
            recommended_location=recommended_location,
            technology=technology,
            optimization_score=deployment_score,
            capacity_plan=capacity_plan,
            hybrid_recommended=hybrid_recommended,
            location_recommendation=location_recommendation,
            expansion_plan=expansion_plan,
            optimization_reason=reason,
        )

    # =========================================================
    # TECHNOLOGY
    # =========================================================

    @staticmethod
    def _get_technology(
        intelligence: dict,
    ) -> DeploymentTechnology:

        value = intelligence.get(
            "recommended_technology"
        )

        if value is None:
            return DeploymentTechnology.UNSUITABLE

        try:
            return DeploymentTechnology(value)
        except ValueError:
            return DeploymentTechnology.UNSUITABLE

    # =========================================================
    # CAPACITY
    # =========================================================

    def _calculate_capacity_plan(
        self,
        technology: DeploymentTechnology,
        deployment_score: float,
        solar_score: float,
        wind_score: float,
    ) -> CapacityPlan:

        if technology == DeploymentTechnology.UNSUITABLE:

            return CapacityPlan(
                recommended_capacity_mw=0,
                solar_capacity_mw=0,
                wind_capacity_mw=0,
                capacity_strategy=(
                    "No deployment capacity recommended "
                    "until site suitability improves."
                ),
            )

        multiplier = deployment_score / 100.0

        if technology == DeploymentTechnology.SOLAR:

            capacity = self._round_capacity(
                self.MAX_SINGLE_TECH_CAPACITY_MW
                * multiplier
            )

            return CapacityPlan(
                recommended_capacity_mw=capacity,
                solar_capacity_mw=capacity,
                wind_capacity_mw=0,
                capacity_strategy=(
                    "Prioritize solar capacity according "
                    "to site suitability."
                ),
            )

        if technology == DeploymentTechnology.WIND:

            capacity = self._round_capacity(
                self.MAX_SINGLE_TECH_CAPACITY_MW
                * multiplier
            )

            return CapacityPlan(
                recommended_capacity_mw=capacity,
                solar_capacity_mw=0,
                wind_capacity_mw=capacity,
                capacity_strategy=(
                    "Prioritize wind capacity according "
                    "to site suitability."
                ),
            )

        total_capacity = (
            self.MAX_HYBRID_CAPACITY_MW
            * multiplier
        )

        total_score = (
            solar_score + wind_score
        )

        if total_score > 0:
            solar_ratio = (
                solar_score / total_score
            )
        else:
            solar_ratio = 0.5

        solar_capacity = (
            total_capacity
            * solar_ratio
        )

        wind_capacity = (
            total_capacity
            * (1 - solar_ratio)
        )

        return CapacityPlan(
            recommended_capacity_mw=(
                self._round_capacity(
                    total_capacity
                )
            ),
            solar_capacity_mw=(
                self._round_capacity(
                    solar_capacity
                )
            ),
            wind_capacity_mw=(
                self._round_capacity(
                    wind_capacity
                )
            ),
            capacity_strategy=(
                "Allocate capacity between solar "
                "and wind according to their relative "
                "resource suitability."
            ),
        )

    # =========================================================
    # LOCATION
    # =========================================================

    @staticmethod
    def _build_location_recommendation(
        site_id: int,
        deployment_score: float,
        technology: DeploymentTechnology,
    ) -> LocationRecommendation:

        if deployment_score >= 85:
            reason = (
                "Site has excellent deployment suitability "
                "and should be prioritized."
            )

        elif deployment_score >= 70:
            reason = (
                "Site has high deployment suitability "
                "and is a strong deployment candidate."
            )

        elif deployment_score >= 50:
            reason = (
                "Site has moderate deployment suitability "
                "and requires detailed feasibility validation."
            )

        else:
            reason = (
                "Site does not currently meet the "
                "recommended deployment threshold."
            )

        return LocationRecommendation(
            site_id=site_id,
            deployment_score=deployment_score,
            technology=technology,
            recommendation_reason=reason,
        )

    # =========================================================
    # EXPANSION
    # =========================================================

    @staticmethod
    def _build_expansion_plan(
        deployment_score: float,
        technology: DeploymentTechnology,
    ) -> ExpansionPlan:

        if technology == DeploymentTechnology.UNSUITABLE:

            return ExpansionPlan(
                expansion_recommended=False,
                expansion_priority="None",
                expansion_reason=(
                    "Expansion should not be considered "
                    "until the site becomes suitable."
                ),
            )

        if deployment_score >= 85:

            return ExpansionPlan(
                expansion_recommended=True,
                expansion_priority="High",
                expansion_reason=(
                    "Excellent site suitability supports "
                    "future renewable capacity expansion."
                ),
            )

        if deployment_score >= 70:

            return ExpansionPlan(
                expansion_recommended=True,
                expansion_priority="Medium",
                expansion_reason=(
                    "Site conditions may support future "
                    "capacity expansion after initial deployment."
                ),
            )

        return ExpansionPlan(
            expansion_recommended=False,
            expansion_priority="Low",
            expansion_reason=(
                "Additional feasibility validation is "
                "recommended before planning expansion."
            ),
        )

    # =========================================================
    # EXPLANATION
    # =========================================================

    @staticmethod
    def _generate_optimization_reason(
        technology: DeploymentTechnology,
        deployment_score: float,
        hybrid_score: float,
        capacity_plan: CapacityPlan,
    ) -> str:

        if technology == DeploymentTechnology.UNSUITABLE:
            return (
                "No deployment is recommended because "
                "the site does not currently satisfy "
                "the deployment suitability threshold."
            )

        if technology == DeploymentTechnology.HYBRID:
            return (
                "Hybrid solar-wind deployment is recommended "
                "because both technologies demonstrate suitable "
                "resource potential. "
                f"Recommended combined capacity: "
                f"{capacity_plan.recommended_capacity_mw} MW."
            )

        if technology == DeploymentTechnology.SOLAR:
            return (
                "Solar deployment is prioritized based "
                "on the site's renewable suitability. "
                f"Recommended solar capacity: "
                f"{capacity_plan.solar_capacity_mw} MW."
            )

        return (
            "Wind deployment is prioritized based "
            "on the site's renewable suitability. "
            f"Recommended wind capacity: "
            f"{capacity_plan.wind_capacity_mw} MW."
        )

    # =========================================================
    # HELPERS
    # =========================================================

    @staticmethod
    def _normalize(
        value,
    ) -> float:

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
    def _round_capacity(
        capacity: float,
    ) -> float:

        return round(
            max(0.0, capacity),
            2,
        )