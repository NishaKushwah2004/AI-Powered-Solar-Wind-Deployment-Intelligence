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


class PlannerDashboardService:

    def __init__(self, db: Session):

        self.repository = (
            PlannerDashboardRepository(db)
        )


    def get_dashboard(
        self,
    ) -> PlannerDashboardResponse:

        sites = self.repository.get_sites()


        recommended_sites = []

        suitability_scores = []

        generation_forecast = []

        investment_recommendations = []


        for site in sites:

            """
            IMPORTANT:

            The following values should come from your
            existing Milestone 3 persisted/module outputs.

            Do not recreate suitability, forecasting or
            investment calculations here.
            """

            suitability_score = self._get_value(
                site,
                "overall_deployment_score",
                0,
            )

            technology = self._get_value(
                site,
                "recommended_technology",
                "Unknown",
            )

            suitability_category = (
                self._get_value(
                    site,
                    "suitability_category",
                    "Unknown",
                )
            )

            deployment_status = (
                self._get_value(
                    site,
                    "deployment_status",
                    "Evaluation",
                )
            )

            annual_generation = self._get_value(
                site,
                "annual_generation_mwh",
                0,
            )

            investment_score = self._get_value(
                site,
                "investment_score",
                0,
            )

            investment_recommendation = (
                self._get_value(
                    site,
                    "investment_recommendation",
                    "Further Evaluation Required",
                )
            )

            feasibility_status = (
                self._get_value(
                    site,
                    "feasibility_status",
                    "Requires Further Evaluation",
                )
            )


            site_id = site.id

            site_name = (
                getattr(
                    site,
                    "name",
                    f"Site {site_id}",
                )
            )


            suitability_scores.append(
                SuitabilityScoreItem(
                    site_id=site_id,
                    site_name=site_name,
                    score=float(
                        suitability_score
                    ),
                )
            )


            if suitability_score >= 70:

                recommended_sites.append(
                    RecommendedSite(
                        site_id=site_id,
                        site_name=site_name,
                        technology=str(
                            technology
                        ),
                        suitability_category=str(
                            suitability_category
                        ),
                        suitability_score=float(
                            suitability_score
                        ),
                        deployment_status=str(
                            deployment_status
                        ),
                    )
                )


            generation_forecast.append(
                GenerationForecastItem(
                    period="Annual",
                    technology=str(
                        technology
                    ),
                    generation_mwh=float(
                        annual_generation
                    ),
                )
            )


            if investment_score >= 60:

                investment_recommendations.append(
                    InvestmentRecommendationItem(
                        site_id=site_id,
                        site_name=site_name,
                        technology=str(
                            technology
                        ),
                        investment_score=float(
                            investment_score
                        ),
                        recommendation=str(
                            investment_recommendation
                        ),
                        feasibility_status=str(
                            feasibility_status
                        ),
                    )
                )


        total_generation = sum(
            item.generation_mwh
            for item in generation_forecast
        )


        average_suitability = (
            sum(
                item.score
                for item in suitability_scores
            )
            / len(suitability_scores)
            if suitability_scores
            else 0
        )


        summary = PlannerSummary(

            recommendedSites=len(
                recommended_sites
            ),

            totalForecastMwh=round(
                total_generation,
                2,
            ),

            averageSuitability=round(
                average_suitability,
                2,
            ),

            investmentOpportunities=len(
                investment_recommendations
            ),

        )


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


    @staticmethod
    def _get_value(
        obj,
        field,
        default,
    ):

        value = getattr(
            obj,
            field,
            None,
        )

        return (
            default
            if value is None
            else value
        )