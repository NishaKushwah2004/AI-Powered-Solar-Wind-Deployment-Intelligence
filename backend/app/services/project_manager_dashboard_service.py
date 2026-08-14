from sqlalchemy.orm import Session

from app.repositories.project_manager_dashboard_repository import (
    ProjectManagerDashboardRepository,
)

from app.schemas.project_manager_dashboard import (
    ExecutiveSummary,
    FinancialAnalytics,
    ProjectManagerDashboardResponse,
    ProjectOverview,
    RiskAssessment,
)


class ProjectManagerDashboardService:

    def __init__(self, db: Session):

        self.repository = (
            ProjectManagerDashboardRepository(db)
        )


    def get_dashboard(
        self,
    ) -> ProjectManagerDashboardResponse:

        projects = (
            self.repository.get_projects()
        )

        sites = (
            self.repository.get_sites()
        )


        # -----------------------------------------------------
        # PROJECT OVERVIEW
        # -----------------------------------------------------

        total_projects = len(projects)

        active_projects = sum(
            1
            for project in projects
            if self._is_active_project(project)
        )


        recommended_sites = sum(
            1
            for site in sites
            if self._number(
                getattr(
                    site,
                    "suitability_score",
                    getattr(
                        site,
                        "overall_deployment_score",
                        0,
                    ),
                )
            ) >= 70
        )


        total_capacity = sum(
            self._number(
                getattr(
                    site,
                    "capacity_mw",
                    0,
                )
            )
            for site in sites
        )


        total_generation = sum(
            self._number(
                getattr(
                    site,
                    "annual_generation_mwh",
                    0,
                )
            )
            for site in sites
        )


        project_overview = ProjectOverview(

            total_projects=total_projects,

            active_projects=active_projects,

            total_sites=len(sites),

            recommended_sites=recommended_sites,

            total_capacity_mw=round(
                total_capacity,
                2,
            ),

            total_generation_mwh=round(
                total_generation,
                2,
            ),
        )


        # -----------------------------------------------------
        # FINANCIAL ANALYTICS
        # -----------------------------------------------------

        total_capex = 0.0

        total_opex = 0.0

        total_revenue = 0.0

        total_cash_flow = 0.0

        roi_values = []

        payback_values = []


        for site in sites:

            capex = self._number(
                getattr(
                    site,
                    "capex",
                    0,
                )
            )

            opex = self._number(
                getattr(
                    site,
                    "annual_opex",
                    0,
                )
            )

            revenue = self._number(
                getattr(
                    site,
                    "annual_revenue",
                    0,
                )
            )

            cash_flow = self._number(
                getattr(
                    site,
                    "annual_net_cash_flow",
                    revenue - opex,
                )
            )

            roi = self._number(
                getattr(
                    site,
                    "roi_percentage",
                    0,
                )
            )

            payback = getattr(
                site,
                "payback_period_years",
                None,
            )


            total_capex += capex

            total_opex += opex

            total_revenue += revenue

            total_cash_flow += cash_flow


            if roi > 0:
                roi_values.append(roi)


            if payback is not None:

                payback_value = self._number(
                    payback
                )

                if payback_value > 0:
                    payback_values.append(
                        payback_value
                    )


        average_roi = (
            sum(roi_values)
            / len(roi_values)
            if roi_values
            else 0
        )


        average_payback = (
            sum(payback_values)
            / len(payback_values)
            if payback_values
            else None
        )


        financial_analytics = FinancialAnalytics(

            total_capex=round(
                total_capex,
                2,
            ),

            total_annual_opex=round(
                total_opex,
                2,
            ),

            total_annual_revenue=round(
                total_revenue,
                2,
            ),

            total_net_cash_flow=round(
                total_cash_flow,
                2,
            ),

            average_roi_percentage=round(
                average_roi,
                2,
            ),

            average_payback_period_years=(
                round(
                    average_payback,
                    2,
                )
                if average_payback is not None
                else None
            ),
        )


        # -----------------------------------------------------
        # RISK ASSESSMENT
        # -----------------------------------------------------

        low_risk = 0

        medium_risk = 0

        high_risk = 0

        risk_scores = []


        for site in sites:

            risk = str(
                getattr(
                    site,
                    "investment_risk",
                    "Medium",
                )
            )


            risk_score = self._number(
                getattr(
                    site,
                    "investment_risk_score",
                    50,
                )
            )


            risk_scores.append(
                risk_score
            )


            if risk == "Low":

                low_risk += 1

            elif risk == "High":

                high_risk += 1

            else:

                medium_risk += 1


        average_risk_score = (
            sum(risk_scores)
            / len(risk_scores)
            if risk_scores
            else 50
        )


        overall_risk = (
            self._get_overall_risk(
                average_risk_score
            )
        )


        risk_assessment = RiskAssessment(

            overall_risk=overall_risk,

            low_risk_projects=low_risk,

            medium_risk_projects=medium_risk,

            high_risk_projects=high_risk,

            risk_score=round(
                average_risk_score,
                2,
            ),

            risk_summary=(
                self._build_risk_summary(
                    overall_risk,
                    high_risk,
                )
            ),
        )


        # -----------------------------------------------------
        # EXECUTIVE SUMMARY
        # -----------------------------------------------------

        strengths = []

        concerns = []

        actions = []


        if recommended_sites > 0:

            strengths.append(
                f"{recommended_sites} sites "
                "currently meet the recommended "
                "deployment threshold."
            )


        if total_generation > 0:

            strengths.append(
                "The current portfolio has measurable "
                "renewable generation potential."
            )


        if average_roi >= 15:

            strengths.append(
                "Portfolio-level estimated ROI is "
                "financially attractive."
            )


        if high_risk > 0:

            concerns.append(
                f"{high_risk} site(s) currently have "
                "high investment risk."
            )

            actions.append(
                "Review high-risk sites before "
                "investment approval."
            )


        if recommended_sites < len(sites):

            concerns.append(
                "Not all analyzed sites currently "
                "meet the recommended deployment "
                "threshold."
            )

            actions.append(
                "Prioritize additional feasibility "
                "analysis for lower-scoring sites."
            )


        if average_roi < 10:

            concerns.append(
                "Portfolio-level estimated ROI "
                "requires improvement."
            )

            actions.append(
                "Review project economics, CAPEX, "
                "OPEX and revenue assumptions."
            )


        if not actions:

            actions.append(
                "Continue detailed feasibility validation "
                "before final deployment decisions."
            )


        headline = (
            self._build_headline(
                recommended_sites,
                total_generation,
                average_roi,
                overall_risk,
            )
        )


        executive_summary = ExecutiveSummary(

            headline=headline,

            key_strengths=strengths,

            key_concerns=concerns,

            recommended_actions=actions,
        )


        return ProjectManagerDashboardResponse(

            project_overview=project_overview,

            financial_analytics=financial_analytics,

            risk_assessment=risk_assessment,

            executive_summary=executive_summary,
        )


    # =========================================================
    # HELPERS
    # =========================================================

    @staticmethod
    def _number(value) -> float:

        if value is None:
            return 0.0

        try:

            return float(value)

        except (
            TypeError,
            ValueError,
        ):

            return 0.0


    @staticmethod
    def _is_active_project(
        project,
    ) -> bool:

        status = str(
            getattr(
                project,
                "status",
                "Active",
            )
        ).lower()

        return status in {
            "active",
            "in progress",
            "ongoing",
        }


    @staticmethod
    def _get_overall_risk(
        score: float,
    ) -> str:

        if score >= 75:

            return "Low"

        if score >= 50:

            return "Medium"

        return "High"


    @staticmethod
    def _build_risk_summary(
        risk: str,
        high_risk: int,
    ) -> str:

        if risk == "Low":

            return (
                "Overall portfolio risk is currently "
                "low based on the available project "
                "risk indicators."
            )

        if risk == "Medium":

            return (
                "Overall portfolio risk is moderate "
                "and requires continued monitoring."
            )

        return (
            f"Overall portfolio risk is high with "
            f"{high_risk} high-risk site(s) requiring "
            "additional review."
        )


    @staticmethod
    def _build_headline(
        recommended_sites: int,
        total_generation: float,
        average_roi: float,
        risk: str,
    ) -> str:

        return (
            f"{recommended_sites} site(s) are currently "
            f"recommended for deployment, with an "
            f"estimated annual generation of "
            f"{total_generation:,.2f} MWh. "
            f"Average estimated ROI is "
            f"{average_roi:.2f}%, while overall "
            f"portfolio risk is {risk}."
        )