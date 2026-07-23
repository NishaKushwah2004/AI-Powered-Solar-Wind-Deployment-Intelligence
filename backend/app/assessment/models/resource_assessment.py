from pydantic import BaseModel


class ResourceAssessment(BaseModel):
    """
    Overall renewable resource assessment.
    """

    overall_suitability: str

    solar_score: float

    wind_score: float

    environmental_score: float

    recommendation: str