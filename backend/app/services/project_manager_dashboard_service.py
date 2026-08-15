from __future__ import annotations

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

from app.services.deployment_optimization_service import (
    DeploymentOptimizationService,
)

from app.services.investment_recommendation_service import (
    InvestmentRecommendationService,
)


class ProjectManagerDashboardService:
    """
    Project Manager Dashboard.

    Uses the existing authoritative services:

        DeploymentOptimizationService
                    +
        InvestmentRecommendationService
                    ↓
        Project Manager Dashboard

    No manual intelligence JSON is required.
    """

    def __init__(
        self,
        db: Session,
        deployment_optimization_service:
            DeploymentOptimizationService,
        investment_recommendation_service:
            InvestmentRecommendationService,
    ) -> None:

        self.repository = (
            ProjectManagerDashboardRepository(db)
        )

        self.deployment_optimization_service = (
            deployment_optimization_service
        )

        self.investment_recommendation_service = (
            investment_recommendation_service
        )

    # =========================================================
    # MAIN DASHBOARD
    # =========================================================

    def get_dashboard(
        self,
    ) -> ProjectManagerDashboardResponse:

        projects = (
            self.repository.get_projects()
        )

        sites = (
            self.repository.get_sites()
        )

        # =====================================================
        # PROJECT OVERVIEW
        # =====================================================

        total_projects = len(projects)

        active_projects = sum(
            1
            for project in projects
            if self._is_active_project(project)
        )

        total_sites = len(sites)

        recommended_sites = 0

        total_capacity_mw = 0.0
        total_generation_mwh = 0.0

        # =====================================================
        # FINANCIAL ANALYTICS
        # =====================================================

        total_capex = 0.0
        total_annual_opex = 0.0
        total_annual_revenue = 0.0
        total_net_cash_flow = 0.0

        roi_values: list[float] = []
        payback_values: list[float] = []

        # =====================================================
        # RISK
        # =====================================================

        low_risk_projects = 0
        medium_risk_projects = 0
        high_risk_projects = 0

        risk_scores: list[float] = []

        # =====================================================
        # SITE-LEVEL ANALYSIS
        # =====================================================

        for site in sites:

            # -------------------------------------------------
            # DEPLOYMENT OPTIMIZATION
            # -------------------------------------------------

            deployment = (
                self.deployment_optimization_service
                .optimize_site(
                    site_id=site.id,
                )
            )

            capacity_plan = (
                deployment.capacity_plan
            )

            total_capacity_mw += (
                self._number(
                    capacity_plan
                    .recommended_capacity_mw
                )
            )

            # -------------------------------------------------
            # ENERGY / INVESTMENT
            # -------------------------------------------------

            investment = (
                self.investment_recommendation_service
                .evaluate_investment(
                    site_id=site.id,
                )
            )

            total_generation_mwh += (
                self._number(
                    investment.expected_generation_mwh
                )
            )

            # -------------------------------------------------
            # RECOMMENDATION
            # -------------------------------------------------

            recommendation = (
                investment.recommendation
            )

            if hasattr(
                recommendation,
                "value",
            ):
                recommendation = (
                    recommendation.value
                )

            if recommendation in {
                "Invest",
                "Invest with Conditions",
            }:
                recommended_sites += 1

            # -------------------------------------------------
            # FINANCIAL ANALYTICS
            # -------------------------------------------------

            financial = (
                investment.financial_metrics
            )

            total_capex += (
                self._number(
                    financial.capex
                )
            )

            total_annual_opex += (
                self._number(
                    financial.annual_opex
                )
            )

            total_annual_revenue += (
                self._number(
                    financial.annual_revenue
                )
            )

            total_net_cash_flow += (
                self._number(
                    financial.annual_net_cash_flow
                )
            )

            roi = self._number(
                financial.roi_percentage
            )

            roi_values.append(roi)

            payback = (
                financial.payback_period_years
            )

            if payback is not None:

                payback_values.append(
                    self._number(payback)
                )

            # -------------------------------------------------
            # RISK
            # -------------------------------------------------

            risk = (
                investment.risk_assessment
                .overall_risk
            )

            if hasattr(
                risk,
                "value",
            ):
                risk = risk.value

            risk = str(risk)

            if risk == "Low":

                low_risk_projects += 1

            elif risk == "High":

                high_risk_projects += 1

            else:

                medium_risk_projects += 1

            # -------------------------------------------------
            # RISK SCORE
            #
            # Investment risk scores are higher when risk is
            # higher. Convert them into a portfolio risk score.
            # -------------------------------------------------

            financial_risk = self._number(
                investment.risk_assessment
                .financial_risk_score
            )

            site_risk = self._number(
                investment.risk_assessment
                .site_risk_score
            )

            resource_risk = self._number(
                investment.risk_assessment
                .resource_risk_score
            )

            risk_score = (
                financial_risk * 0.40
                + site_risk * 0.35
                + resource_risk * 0.25
            )

            risk_scores.append(
                risk_score
            )

        # =====================================================
        # AGGREGATES
        # =====================================================

        average_roi = (
            sum(roi_values)
            / len(roi_values)
            if roi_values
            else 0.0
        )

        average_payback = (
            sum(payback_values)
            / len(payback_values)
            if payback_values
            else None
        )

        portfolio_risk_score = (
            sum(risk_scores)
            / len(risk_scores)
            if risk_scores
            else 0.0
        )

        overall_risk = (
            self._get_overall_risk(
                portfolio_risk_score
            )
        )

        # =====================================================
        # PROJECT OVERVIEW
        # =====================================================

        project_overview = ProjectOverview(
            total_projects=total_projects,
            active_projects=active_projects,
            total_sites=total_sites,
            recommended_sites=recommended_sites,
            total_capacity_mw=round(
                total_capacity_mw,
                2,
            ),
            total_generation_mwh=round(
                total_generation_mwh,
                2,
            ),
        )

        # =====================================================
        # FINANCIAL ANALYTICS
        # =====================================================

        financial_analytics = FinancialAnalytics(
            total_capex=round(
                total_capex,
                2,
            ),
            total_annual_opex=round(
                total_annual_opex,
                2,
            ),
            total_annual_revenue=round(
                total_annual_revenue,
                2,
            ),
            total_net_cash_flow=round(
                total_net_cash_flow,
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

        # =====================================================
        # RISK ASSESSMENT
        # =====================================================

        risk_assessment = RiskAssessment(
            overall_risk=overall_risk,
            low_risk_projects=(
                low_risk_projects
            ),
            medium_risk_projects=(
                medium_risk_projects
            ),
            high_risk_projects=(
                high_risk_projects
            ),
            risk_score=round(
                portfolio_risk_score,
                2,
            ),
            risk_summary=(
                self._build_risk_summary(
                    overall_risk=overall_risk,
                    high_risk_projects=(
                        high_risk_projects
                    ),
                )
            ),
        )

        # =====================================================
        # EXECUTIVE SUMMARY
        # =====================================================

        strengths: list[str] = []
        concerns: list[str] = []
        actions: list[str] = []

        if recommended_sites > 0:

            strengths.append(
                f"{recommended_sites} site(s) currently "
                "meet the recommended investment criteria."
            )

        if total_capacity_mw > 0:

            strengths.append(
                f"The portfolio has an estimated "
                f"{total_capacity_mw:.2f} MW of renewable "
                "deployment capacity."
            )

        if total_generation_mwh > 0:

            strengths.append(
                "The portfolio has measurable renewable "
                "energy generation potential."
            )

        if average_roi >= 15:

            strengths.append(
                "Portfolio-level estimated ROI is "
                "financially attractive."
            )

        if high_risk_projects > 0:

            concerns.append(
                f"{high_risk_projects} site(s) currently "
                "have high investment risk."
            )

            actions.append(
                "Review high-risk sites before "
                "investment approval."
            )

        if recommended_sites < total_sites:

            concerns.append(
                "Not all analyzed sites currently meet "
                "the preferred investment criteria."
            )

            actions.append(
                "Prioritize additional feasibility analysis "
                "for lower-performing sites."
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

        executive_summary = ExecutiveSummary(
            headline=(
                f"{recommended_sites} site(s) are currently "
                f"recommended for deployment, with an "
                f"estimated annual generation of "
                f"{total_generation_mwh:.2f} MWh. "
                f"Average estimated ROI is "
                f"{average_roi:.2f}%, while overall "
                f"portfolio risk is {overall_risk}."
            ),
            key_strengths=strengths,
            key_concerns=concerns,
            recommended_actions=actions,
        )

        # =====================================================
        # FINAL RESPONSE
        # =====================================================

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

        value = getattr(
            project,
            "status",
            None,
        )

        if value is None:
            return True

        if hasattr(
            value,
            "value",
        ):
            value = value.value

        return str(value).lower() in {
            "active",
            "in progress",
            "ongoing",
        }

    @staticmethod
    def _get_overall_risk(
        risk_score: float,
    ) -> str:

        # Risk score is a RISK score:
        # higher score = higher risk.

        if risk_score <= 35:
            return "Low"

        if risk_score <= 65:
            return "Medium"

        return "High"

    @staticmethod
    def _build_risk_summary(
        overall_risk: str,
        high_risk_projects: int,
    ) -> str:

        if overall_risk == "Low":

            return (
                "Overall portfolio risk is currently "
                "low based on the available investment "
                "risk indicators."
            )

        if overall_risk == "Medium":

            return (
                "Overall portfolio risk is moderate "
                "and requires continued monitoring."
            )

        return (
            f"Overall portfolio risk is high, with "
            f"{high_risk_projects} high-risk site(s) "
            "requiring additional review."
        )