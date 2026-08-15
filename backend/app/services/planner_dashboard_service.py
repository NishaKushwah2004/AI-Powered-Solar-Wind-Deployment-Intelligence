from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from app.repositories.planner_dashboard_repository import (
    PlannerDashboardRepository,
)

from app.schemas.planner_dashboard import (
    GenerationForecastItem,
    InvestmentRecommendationItem,
    PlannerDashboardResponse,
    PlannerSummary,
    RecommendedSite,
    SuitabilityScoreItem,
)

from app.services.site_suitability_service import (
    SiteSuitabilityService,
)

from app.services.renewable_recommendation_service import (
    RenewableRecommendationService,
)

from app.services.deployment_optimization_service import (
    DeploymentOptimizationService,
)

from app.services.investment_recommendation_service import (
    InvestmentRecommendationService,
)


class PlannerDashboardService:
    """
    Planner Dashboard orchestration service.

    The dashboard does not implement renewable intelligence itself.

    Authoritative flow:

        Site
          ↓
        Site Suitability
          ↓
        Renewable Recommendation
          ↓
        Deployment Optimization
          ↓
        Energy Forecasting
          ↓
        Investment Recommendation
          ↓
        Planner Dashboard

    The underlying intelligence remains inside the
    respective locked services.
    """

    # ---------------------------------------------------------
    # Dashboard display thresholds
    #
    # These are dashboard filters only.
    # They do not modify the underlying intelligence engines.
    # ---------------------------------------------------------

    RECOMMENDED_SITE_SCORE = 50.0
    INVESTMENT_OPPORTUNITY_SCORE = 60.0

    # =========================================================
    # INITIALIZATION
    # =========================================================

    def __init__(
        self,
        db: Session,
        site_suitability_service: SiteSuitabilityService,
        renewable_recommendation_service:
            RenewableRecommendationService,
        deployment_optimization_service:
            DeploymentOptimizationService,
        energy_forecasting_service: Any,
        investment_recommendation_service:
            InvestmentRecommendationService,
    ) -> None:

        self.repository = (
            PlannerDashboardRepository(db)
        )

        self.site_suitability_service = (
            site_suitability_service
        )

        self.renewable_recommendation_service = (
            renewable_recommendation_service
        )

        self.deployment_optimization_service = (
            deployment_optimization_service
        )

        # Kept as a dependency because Energy Forecasting
        # is part of the planner intelligence flow.
        #
        # Generation itself is taken from the Investment
        # Recommendation output so that the Planner Dashboard
        # stays consistent with the Project Manager Dashboard.
        self.energy_forecasting_service = (
            energy_forecasting_service
        )

        self.investment_recommendation_service = (
            investment_recommendation_service
        )

    # =========================================================
    # MAIN DASHBOARD
    # =========================================================

    def get_dashboard(
        self,
    ) -> PlannerDashboardResponse:

        sites = self.repository.get_sites()

        recommended_sites: list[
            RecommendedSite
        ] = []

        generation_forecast: list[
            GenerationForecastItem
        ] = []

        suitability_scores: list[
            SuitabilityScoreItem
        ] = []

        investment_recommendations: list[
            InvestmentRecommendationItem
        ] = []

        # =====================================================
        # PROCESS EACH SITE
        # =====================================================

        for site in sites:

            site_id = int(site.id)

            site_name = self._get_site_name(
                site,
                site_id,
            )

            # =================================================
            # 1. SITE SUITABILITY
            # =================================================

            suitability = (
                self.site_suitability_service
                .evaluate_site(
                    site_id=site_id,
                )
            )

            suitability_score = self._number(
                suitability.overall_score
            )

            suitability_category = (
                self._enum_value(
                    suitability.category
                )
            )

            # -------------------------------------------------
            # Suitability chart
            # -------------------------------------------------

            suitability_scores.append(
                SuitabilityScoreItem(
                    site_id=site_id,
                    site_name=site_name,
                    score=round(
                        suitability_score,
                        2,
                    ),
                )
            )

            # =================================================
            # 2. RENEWABLE RECOMMENDATION
            # =================================================

            # RenewableRecommendationService expects a dict,
            # while SiteSuitabilityService returns a Pydantic
            # response.
            suitability_data = self._model_dump(
                suitability
            )

            renewable = (
                self.renewable_recommendation_service
                .recommend(
                    site_id=site_id,
                    suitability_data=suitability_data,
                )
            )

            technology = self._enum_value(
                renewable.recommended_technology
            )

            # =================================================
            # 3. DEPLOYMENT OPTIMIZATION
            # =================================================

            deployment = (
                self.deployment_optimization_service
                .optimize_site(
                    site_id=site_id,
                )
            )

            deployment_status = (
                "Recommended"
                if bool(
                    deployment.recommended_location
                )
                else "Not Recommended"
            )

            # =================================================
            # 4. INVESTMENT RECOMMENDATION
            # =================================================
            #
            # Investment Recommendation already consumes:
            #
            # Deployment Optimization
            #          +
            # Energy Forecasting
            #
            # Therefore its expected_generation_mwh is used
            # as the canonical generation value here.
            # This prevents the Planner Dashboard from producing
            # a different generation value from the Project
            # Manager Dashboard.
            # =================================================

            investment = (
                self.investment_recommendation_service
                .evaluate_investment(
                    site_id=site_id,
                )
            )

            investment_score = self._number(
                investment.investment_score
            )

            investment_recommendation = (
                self._enum_value(
                    investment.recommendation
                )
            )

            feasibility_status = self._enum_value(
                investment.feasibility_status
            )

            annual_generation = self._number(
                investment.expected_generation_mwh
            )

            # =================================================
            # 5. GENERATION FORECAST
            # =================================================

            # Do NOT call forecast_site().
            #
            # The locked EnergyForecastingService exposes
            # forecast(site_id=...), and InvestmentRecommendation
            # already consumed that authoritative forecast.
            #
            # Using investment.expected_generation_mwh here keeps
            # Planner Dashboard consistent with Project Manager.
            # =================================================

            generation_forecast.append(
                GenerationForecastItem(
                    period="Annual",
                    technology=technology,
                    generation_mwh=round(
                        annual_generation,
                        2,
                    ),
                )
            )

            # =================================================
            # 6. RECOMMENDED SITES
            # =================================================

            if (
                suitability_score
                >= self.RECOMMENDED_SITE_SCORE
                and technology.lower()
                != "unsuitable"
                and bool(
                    deployment.recommended_location
                )
            ):

                recommended_sites.append(
                    RecommendedSite(
                        site_id=site_id,
                        site_name=site_name,
                        technology=technology,
                        suitability_category=(
                            suitability_category
                        ),
                        suitability_score=round(
                            suitability_score,
                            2,
                        ),
                        deployment_status=(
                            deployment_status
                        ),
                    )
                )

            # =================================================
            # 7. INVESTMENT OPPORTUNITIES
            # =================================================

            if (
                investment_score
                >= self.INVESTMENT_OPPORTUNITY_SCORE
                and investment_recommendation.lower()
                not in {
                    "do not invest",
                    "not recommended",
                }
            ):

                investment_recommendations.append(
                    InvestmentRecommendationItem(
                        site_id=site_id,
                        site_name=site_name,
                        technology=technology,
                        investment_score=round(
                            investment_score,
                            2,
                        ),
                        recommendation=(
                            investment_recommendation
                        ),
                        feasibility_status=(
                            feasibility_status
                        ),
                    )
                )

        # =====================================================
        # SUMMARY
        # =====================================================

        total_forecast_mwh = round(
            sum(
                item.generation_mwh
                for item in generation_forecast
            ),
            2,
        )

        average_suitability = round(
            (
                sum(
                    item.score
                    for item in suitability_scores
                )
                / len(suitability_scores)
            )
            if suitability_scores
            else 0.0,
            2,
        )

        summary = PlannerSummary(
            recommendedSites=len(
                recommended_sites
            ),
            totalForecastMwh=(
                total_forecast_mwh
            ),
            averageSuitability=(
                average_suitability
            ),
            investmentOpportunities=len(
                investment_recommendations
            ),
        )

        # =====================================================
        # FINAL RESPONSE
        # =====================================================

        return PlannerDashboardResponse(
            summary=summary,

            recommended_sites=(
                recommended_sites
            ),

            generation_forecast=(
                generation_forecast
            ),

            suitability_scores=(
                suitability_scores
            ),

            investment_recommendations=(
                investment_recommendations
            ),
        )

    # =========================================================
    # HELPERS
    # =========================================================

    @staticmethod
    def _model_dump(
        value: Any,
    ) -> dict:

        if value is None:
            return {}

        if hasattr(
            value,
            "model_dump",
        ):
            return value.model_dump()

        if isinstance(
            value,
            dict,
        ):
            return value

        return {}

    # =========================================================
    # ENUM NORMALIZATION
    # =========================================================

    @staticmethod
    def _enum_value(
        value: Any,
    ) -> str:

        if value is None:
            return "Unknown"

        if hasattr(
            value,
            "value",
        ):
            return str(
                value.value
            )

        return str(value)

    # =========================================================
    # NUMBER NORMALIZATION
    # =========================================================

    @staticmethod
    def _number(
        value: Any,
    ) -> float:

        if value is None:
            return 0.0

        try:
            return float(value)

        except (
            TypeError,
            ValueError,
        ):
            return 0.0

    # =========================================================
    # SITE NAME
    # =========================================================

    @staticmethod
    def _get_site_name(
        site: Any,
        site_id: int,
    ) -> str:

        name = getattr(
            site,
            "name",
            None,
        )

        if name:
            return str(name)

        return f"Site {site_id}"