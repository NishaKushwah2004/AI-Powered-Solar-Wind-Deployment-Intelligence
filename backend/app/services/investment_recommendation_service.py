from sqlalchemy.orm import Session

from app.repositories.investment_recommendation_repository import (
    InvestmentRecommendationRepository,
)

from app.schemas.investment_recommendation import (
    FinancialMetrics,
    InvestmentRecommendationResponse,
    InvestmentRisk,
    InvestmentRiskAssessment,
    InvestmentRecommendation,
)


class InvestmentRecommendationService:
    """
    Investment Recommendation Engine.

    Consumes outputs from:

        - Site Suitability Engine
        - Site Scoring Engine
        - Deployment Optimization Engine
        - Energy Forecasting Engine

    and produces:

        - Financial feasibility
        - Investment score
        - Risk assessment
        - Investment recommendation
        - Investment priority

    CAPEX, OPEX and financial assumptions are configurable
    because the internship PDF does not define fixed values.
    """

    # ---------------------------------------------------------
    # DEFAULT FINANCIAL ASSUMPTIONS
    # ---------------------------------------------------------

    DEFAULT_SOLAR_CAPEX_PER_MW = 50_000_000.0
    DEFAULT_WIND_CAPEX_PER_MW = 70_000_000.0

    DEFAULT_HYBRID_SOLAR_CAPEX_PER_MW = 50_000_000.0
    DEFAULT_HYBRID_WIND_CAPEX_PER_MW = 70_000_000.0

    DEFAULT_SOLAR_OPEX_RATE = 0.02
    DEFAULT_WIND_OPEX_RATE = 0.03

    DEFAULT_HYBRID_OPEX_RATE = 0.025

    # ---------------------------------------------------------
    # Recommendation thresholds
    #
    # These are implementation thresholds, NOT values defined
    # in the internship PDF.
    # ---------------------------------------------------------

    INVESTMENT_THRESHOLD = 75
    CONDITIONAL_THRESHOLD = 60
    EVALUATION_THRESHOLD = 40

    LOW_RISK_THRESHOLD = 75
    MEDIUM_RISK_THRESHOLD = 50

    def __init__(self, db: Session):
        self.repository = (
            InvestmentRecommendationRepository(db)
        )

    # =========================================================
    # MAIN METHOD
    # =========================================================

    def evaluate_investment(
        self,
        site_id: int,
        intelligence: dict,
    ) -> InvestmentRecommendationResponse:

        site = self.repository.get_site(site_id)

        if site is None:
            raise ValueError(
                f"Site {site_id} not found."
            )

        technology = self._get_technology(
            intelligence
        )

        capacity_mw = self._normalize(
            intelligence.get("capacity_mw")
        )

        solar_capacity_mw = self._normalize(
            intelligence.get(
                "solar_capacity_mw"
            )
        )

        wind_capacity_mw = self._normalize(
            intelligence.get(
                "wind_capacity_mw"
            )
        )

        overall_site_score = self._normalize(
            intelligence.get(
                "overall_deployment_score"
            )
        )

        solar_score = self._normalize(
            intelligence.get(
                "solar_score"
            )
        )

        wind_score = self._normalize(
            intelligence.get(
                "wind_score"
            )
        )

        annual_generation = self._normalize(
            intelligence.get(
                "annual_generation_mwh"
            )
        )

        annual_revenue = self._normalize(
            intelligence.get(
                "annual_revenue"
            )
        )

        # -----------------------------------------------------
        # Financial calculation
        # -----------------------------------------------------

        capex = self._calculate_capex(
            technology=technology,
            capacity_mw=capacity_mw,
            solar_capacity_mw=solar_capacity_mw,
            wind_capacity_mw=wind_capacity_mw,
            intelligence=intelligence,
        )

        annual_opex = self._calculate_opex(
            technology=technology,
            capex=capex,
            intelligence=intelligence,
        )

        annual_net_cash_flow = max(
            0.0,
            annual_revenue - annual_opex,
        )

        roi = self._calculate_roi(
            annual_net_cash_flow=(
                annual_net_cash_flow
            ),
            capex=capex,
        )

        payback_period = (
            self._calculate_payback_period(
                capex=capex,
                annual_net_cash_flow=(
                    annual_net_cash_flow
                ),
            )
        )

        financial_metrics = FinancialMetrics(
            capex=round(
                capex,
                2,
            ),
            annual_opex=round(
                annual_opex,
                2,
            ),
            annual_revenue=round(
                annual_revenue,
                2,
            ),
            annual_net_cash_flow=round(
                annual_net_cash_flow,
                2,
            ),
            roi_percentage=round(
                roi,
                2,
            ),
            payback_period_years=payback_period,
        )

        # -----------------------------------------------------
        # Risk
        # -----------------------------------------------------

        financial_risk_score = (
            self._calculate_financial_risk(
                roi=roi,
                payback_period=payback_period,
            )
        )

        site_risk_score = (
            self._calculate_site_risk(
                overall_site_score
            )
        )

        resource_risk_score = (
            self._calculate_resource_risk(
                solar_score=solar_score,
                wind_score=wind_score,
                technology=technology,
            )
        )

        overall_risk_score = (
            financial_risk_score * 0.40
            + site_risk_score * 0.35
            + resource_risk_score * 0.25
        )

        risk = self._get_risk_level(
            overall_risk_score
        )

        risk_assessment = (
            InvestmentRiskAssessment(
                overall_risk=risk,

                financial_risk_score=round(
                    financial_risk_score,
                    2,
                ),

                site_risk_score=round(
                    site_risk_score,
                    2,
                ),

                resource_risk_score=round(
                    resource_risk_score,
                    2,
                ),

                explanation=(
                    self._generate_risk_explanation(
                        risk
                    )
                ),
            )
        )

        # -----------------------------------------------------
        # Investment score
        # -----------------------------------------------------

        investment_score = (
            self._calculate_investment_score(
                roi=roi,
                site_score=overall_site_score,
                risk_score=overall_risk_score,
            )
        )

        recommendation = (
            self._generate_recommendation(
                investment_score=investment_score,
                risk=risk,
            )
        )

        feasibility_status = (
            self._get_feasibility_status(
                investment_score
            )
        )

        priority = (
            self._get_investment_priority(
                investment_score
            )
        )

        strengths = self._identify_strengths(
            roi=roi,
            site_score=overall_site_score,
            annual_revenue=annual_revenue,
        )

        concerns = self._identify_concerns(
            roi=roi,
            payback_period=payback_period,
            risk=risk,
        )

        reason = (
            self._generate_recommendation_reason(
                recommendation=recommendation,
                investment_score=investment_score,
                roi=roi,
                payback_period=payback_period,
                risk=risk,
            )
        )

        assumptions = (
            self._build_assumptions(
                intelligence
            )
        )

        return InvestmentRecommendationResponse(
            site_id=site_id,

            recommendation=recommendation,

            investment_score=round(
                investment_score,
                2,
            ),

            financial_metrics=financial_metrics,

            risk_assessment=risk_assessment,

            feasibility_status=feasibility_status,

            investment_priority=priority,

            expected_generation_mwh=round(
                annual_generation,
                2,
            ),

            expected_annual_revenue=round(
                annual_revenue,
                2,
            ),

            recommendation_reason=reason,

            strengths=strengths,

            concerns=concerns,

            assumptions=assumptions,
        )

    # =========================================================
    # CAPEX
    # =========================================================

    def _calculate_capex(
        self,
        technology: str,
        capacity_mw: float,
        solar_capacity_mw: float,
        wind_capacity_mw: float,
        intelligence: dict,
    ) -> float:

        solar_capex = self._get_configured_value(
            intelligence,
            "solar_capex_per_mw",
            self.DEFAULT_SOLAR_CAPEX_PER_MW,
        )

        wind_capex = self._get_configured_value(
            intelligence,
            "wind_capex_per_mw",
            self.DEFAULT_WIND_CAPEX_PER_MW,
        )

        if technology == "Solar":

            return (
                capacity_mw
                * solar_capex
            )

        if technology == "Wind":

            return (
                capacity_mw
                * wind_capex
            )

        if technology == "Hybrid Solar-Wind":

            return (
                solar_capacity_mw
                * solar_capex
                + wind_capacity_mw
                * wind_capex
            )

        return 0.0

    # =========================================================
    # OPEX
    # =========================================================

    def _calculate_opex(
        self,
        technology: str,
        capex: float,
        intelligence: dict,
    ) -> float:

        if technology == "Solar":

            rate = self._get_configured_value(
                intelligence,
                "solar_opex_rate",
                self.DEFAULT_SOLAR_OPEX_RATE,
            )

        elif technology == "Wind":

            rate = self._get_configured_value(
                intelligence,
                "wind_opex_rate",
                self.DEFAULT_WIND_OPEX_RATE,
            )

        elif technology == "Hybrid Solar-Wind":

            rate = self._get_configured_value(
                intelligence,
                "hybrid_opex_rate",
                self.DEFAULT_HYBRID_OPEX_RATE,
            )

        else:
            rate = 0.0

        return capex * rate

    # =========================================================
    # ROI
    # =========================================================

    @staticmethod
    def _calculate_roi(
        annual_net_cash_flow: float,
        capex: float,
    ) -> float:

        if capex <= 0:
            return 0.0

        return (
            annual_net_cash_flow
            / capex
            * 100
        )

    # =========================================================
    # PAYBACK
    # =========================================================

    @staticmethod
    def _calculate_payback_period(
        capex: float,
        annual_net_cash_flow: float,
    ) -> float | None:

        if annual_net_cash_flow <= 0:
            return None

        return round(
            capex
            / annual_net_cash_flow,
            2,
        )

    # =========================================================
    # FINANCIAL RISK
    # =========================================================

    @staticmethod
    def _calculate_financial_risk(
        roi: float,
        payback_period: float | None,
    ) -> float:

        if payback_period is None:
            return 0.0

        roi_score = min(
            100,
            max(
                0,
                roi * 5,
            ),
        )

        payback_score = max(
            0,
            min(
                100,
                100 - (
                    payback_period * 10
                ),
            ),
        )

        return (
            roi_score * 0.60
            + payback_score * 0.40
        )

    # =========================================================
    # SITE RISK
    # =========================================================

    @staticmethod
    def _calculate_site_risk(
        site_score: float,
    ) -> float:

        return max(
            0,
            min(
                100,
                site_score,
            ),
        )

    # =========================================================
    # RESOURCE RISK
    # =========================================================

    @staticmethod
    def _calculate_resource_risk(
        solar_score: float,
        wind_score: float,
        technology: str,
    ) -> float:

        if technology == "Solar":
            return solar_score

        if technology == "Wind":
            return wind_score

        if technology == "Hybrid Solar-Wind":
            return (
                solar_score
                + wind_score
            ) / 2

        return 0.0

    # =========================================================
    # RISK LEVEL
    # =========================================================

    @staticmethod
    def _get_risk_level(
        score: float,
    ) -> InvestmentRisk:

        if score >= 75:
            return InvestmentRisk.LOW

        if score >= 50:
            return InvestmentRisk.MEDIUM

        return InvestmentRisk.HIGH

    # =========================================================
    # INVESTMENT SCORE
    # =========================================================

    @staticmethod
    def _calculate_investment_score(
        roi: float,
        site_score: float,
        risk_score: float,
    ) -> float:

        roi_score = min(
            100,
            max(
                0,
                roi * 5,
            ),
        )

        return round(
            roi_score * 0.40
            + site_score * 0.35
            + risk_score * 0.25,
            2,
        )

    # =========================================================
    # RECOMMENDATION
    # =========================================================

    def _generate_recommendation(
        self,
        investment_score: float,
        risk: InvestmentRisk,
    ) -> InvestmentRecommendation:

        if (
            investment_score
            >= self.INVESTMENT_THRESHOLD
            and risk == InvestmentRisk.LOW
        ):
            return InvestmentRecommendation.INVEST

        if (
            investment_score
            >= self.CONDITIONAL_THRESHOLD
            and risk != InvestmentRisk.HIGH
        ):
            return (
                InvestmentRecommendation
                .INVEST_WITH_CONDITIONS
            )

        if (
            investment_score
            >= self.EVALUATION_THRESHOLD
        ):
            return (
                InvestmentRecommendation
                .FURTHER_EVALUATION
            )

        return (
            InvestmentRecommendation
            .DO_NOT_INVEST
        )

    # =========================================================
    # FEASIBILITY
    # =========================================================

    @staticmethod
    def _get_feasibility_status(
        investment_score: float,
    ) -> str:

        if investment_score >= 75:
            return "Financially Attractive"

        if investment_score >= 60:
            return "Potentially Feasible"

        if investment_score >= 40:
            return "Requires Further Evaluation"

        return "Not Currently Feasible"

    # =========================================================
    # PRIORITY
    # =========================================================

    @staticmethod
    def _get_investment_priority(
        investment_score: float,
    ) -> str:

        if investment_score >= 85:
            return "High"

        if investment_score >= 70:
            return "Medium"

        return "Low"

    # =========================================================
    # STRENGTHS
    # =========================================================

    @staticmethod
    def _identify_strengths(
        roi: float,
        site_score: float,
        annual_revenue: float,
    ) -> list[str]:

        strengths = []

        if roi >= 15:
            strengths.append(
                "Attractive estimated return on investment."
            )

        if site_score >= 70:
            strengths.append(
                "Strong overall site deployment suitability."
            )

        if annual_revenue > 0:
            strengths.append(
                "Renewable generation provides an "
                "estimated annual revenue stream."
            )

        return strengths

    # =========================================================
    # CONCERNS
    # =========================================================

    @staticmethod
    def _identify_concerns(
        roi: float,
        payback_period: float | None,
        risk: InvestmentRisk,
    ) -> list[str]:

        concerns = []

        if roi < 10:
            concerns.append(
                "Estimated ROI is relatively low."
            )

        if (
            payback_period is not None
            and payback_period > 10
        ):
            concerns.append(
                "Estimated payback period is relatively long."
            )

        if risk == InvestmentRisk.HIGH:
            concerns.append(
                "Overall investment risk is high."
            )

        return concerns

    # =========================================================
    # RECOMMENDATION EXPLANATION
    # =========================================================

    @staticmethod
    def _generate_recommendation_reason(
        recommendation: InvestmentRecommendation,
        investment_score: float,
        roi: float,
        payback_period: float | None,
        risk: InvestmentRisk,
    ) -> str:

        payback_text = (
            f"{payback_period:.2f} years"
            if payback_period is not None
            else "undefined"
        )

        if recommendation == InvestmentRecommendation.INVEST:

            return (
                "The project is recommended for investment "
                "because its combined financial, site and "
                f"resource assessment is favorable. "
                f"Estimated ROI is {roi:.2f}% with an "
                f"estimated payback period of "
                f"{payback_text}. "
                f"Overall risk is {risk.value}."
            )

        if (
            recommendation
            == InvestmentRecommendation.INVEST_WITH_CONDITIONS
        ):

            return (
                "Investment may be appropriate subject to "
                "additional financial and project validation. "
                f"The investment score is "
                f"{investment_score:.2f} and overall risk is "
                f"{risk.value}."
            )

        if (
            recommendation
            == InvestmentRecommendation.FURTHER_EVALUATION
        ):

            return (
                "The project requires further feasibility "
                "and financial evaluation before an "
                "investment decision is made."
            )

        return (
            "The current assessment does not support "
            "investment without substantial improvement "
            "or additional evidence."
        )

    def _generate_risk_explanation(
        self,
        risk_level: str,
    ) -> str:

        risk = risk_level.lower()

        if risk == "low":
            return (
                "The site presents relatively low investment risk. "
                "The available project indicators are favorable."
            )

        if risk == "medium":
            return (
                "The site presents moderate investment risk. "
                "Further financial, environmental and deployment "
                "validation is recommended before investment approval."
            )

        if risk == "high":
            return (
                "The site presents high investment risk. "
                "Additional feasibility analysis and risk mitigation "
                "should be completed before investment."
            )

        return (
            "Investment risk could not be classified reliably "
            "from the available indicators."
        )

    # =========================================================
    # ASSUMPTIONS
    # =========================================================

    def _build_assumptions(
        self,
        intelligence: dict,
    ) -> list[str]:

        assumptions = []

        if not intelligence.get(
            "solar_capex_per_mw"
        ):
            assumptions.append(
                "Default solar CAPEX per MW was used."
            )

        if not intelligence.get(
            "wind_capex_per_mw"
        ):
            assumptions.append(
                "Default wind CAPEX per MW was used."
            )

        if not intelligence.get(
            "solar_opex_rate"
        ):
            assumptions.append(
                "Default solar OPEX rate was used."
            )

        if not intelligence.get(
            "wind_opex_rate"
        ):
            assumptions.append(
                "Default wind OPEX rate was used."
            )

        if not intelligence.get(
            "annual_revenue"
        ):
            assumptions.append(
                "Annual revenue must come from the "
                "Energy Forecasting Engine or another "
                "validated revenue source."
            )

        return assumptions

    # =========================================================
    # HELPERS
    # =========================================================

    @staticmethod
    def _get_technology(
        intelligence: dict,
    ) -> str:

        return str(
            intelligence.get(
                "recommended_technology",
                "Unsuitable",
            )
        )

    @staticmethod
    def _get_configured_value(
        intelligence: dict,
        key: str,
        default: float,
    ) -> float:

        value = intelligence.get(key)

        if value is None:
            return default

        try:
            value = float(value)
        except (
            TypeError,
            ValueError,
        ):
            return default

        return max(
            0,
            value,
        )

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

        return max(
            0.0,
            value,
        )