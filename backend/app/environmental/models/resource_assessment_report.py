from pydantic import BaseModel

from app.environmental.models.solar_assessment import SolarAssessment
from app.environmental.models.wind_assessment import WindAssessment


class ResourceAssessmentReport(BaseModel):
    site_name: str

    latitude: float

    longitude: float

    solar_assessment: SolarAssessment

    wind_assessment: WindAssessment

    recommendation: str