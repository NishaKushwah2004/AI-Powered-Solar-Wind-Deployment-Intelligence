from app.environmental.clients.nasa_power_client import (
    NASAPowerClient,
)
from app.environmental.clients.weather_client import (
    WeatherClient,
)
from app.services.assessment_service import (
    AssessmentService,
)
from app.services.environmental_service import (
    EnvironmentalService,
)
from app.services.solar_service import (
    SolarService,
)
from app.services.wind_service import (
    WindService,
)


def get_environmental_service() -> EnvironmentalService:

    weather_client = WeatherClient()

    nasa_client = NASAPowerClient()

    solar_service = SolarService()

    wind_service = WindService()

    assessment_service = AssessmentService()

    return EnvironmentalService(
        weather_client=weather_client,
        nasa_client=nasa_client,
        solar_service=solar_service,
        wind_service=wind_service,
        assessment_service=assessment_service,
    )