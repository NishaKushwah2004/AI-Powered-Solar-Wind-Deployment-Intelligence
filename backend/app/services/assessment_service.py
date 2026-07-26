from app.assessment.models.resource_assessment import (
    ResourceAssessment,
)
from app.environmental.models.solar_metrics import (
    SolarMetrics,
)
from app.environmental.models.wind_metrics import (
    WindMetrics,
)


class AssessmentService:
    """
    Renewable Energy Resource Assessment Service.
    """

    def generate_assessment(
        self,
        solar: SolarMetrics,
        wind: WindMetrics,
    ) -> ResourceAssessment:

        solar_score = (
            solar.capacity_factor or 0
        ) * 100

        wind_score = (
            wind.capacity_factor or 0
        ) * 100

        environmental_score = (
            solar_score + wind_score
        ) / 2

        if environmental_score >= 80:
            suitability = "High"
            recommendation = (
                "Suitable for utility-scale renewable deployment."
            )

        elif environmental_score >= 60:
            suitability = "Moderate"
            recommendation = (
                "Suitable after detailed feasibility analysis."
            )

        else:
            suitability = "Low"
            recommendation = (
                "Limited renewable potential."
            )

        return ResourceAssessment(
            overall_suitability=suitability,
            solar_score=solar_score,
            wind_score=wind_score,
            environmental_score=environmental_score,
            recommendation=recommendation,
        )