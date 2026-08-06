from pydantic import BaseModel

from app.environmental.models.solar_assessment import SolarAssessment
from app.environmental.models.wind_assessment import WindAssessment
from app.environmental.models.weather_result import WeatherResult
from app.gis.models.gis_result import GISResult
from app.environmental.models.resource_assessment import ResourceAssessment

class ResourceAssessmentReport(BaseModel):
    """
    Full renewable resource assessment report for a site.

    Sections (Milestone 2 - Resource Assessment Reports):
      - environmental_summary: raw weather / climate data
      - solar_assessment: Solar Potential Prediction Engine output
      - wind_assessment:  Wind Potential Prediction Engine output
      - gis_summary:      Geographic Intelligence Engine output
      - resource_metrics: combined solar/wind resource scoring
      - recommendation:   deployment recommendation summary
    """

    site_name: str

    latitude: float

    longitude: float

    environmental_summary: WeatherResult | None = None

    solar_assessment: SolarAssessment

    wind_assessment: WindAssessment

    gis_summary: GISResult | None = None

    resource_metrics: ResourceAssessment | None = None

    recommendation: str