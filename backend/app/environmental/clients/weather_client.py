import logging

import requests

from app.core.config import settings
from app.environmental.constants import (
    DEFAULT_LANGUAGE,
    DEFAULT_UNITS,
    REQUEST_TIMEOUT,
    WEATHER_API_URL,
)
from app.environmental.exceptions import (
    WeatherServiceError,
)
from app.environmental.models.weather_result import (
    WeatherResult,
)
from app.environmental.providers.weather_query import (
    CURRENT_WEATHER_ENDPOINT,
)

logger = logging.getLogger(__name__)


class WeatherClient:
    """
    Client for OpenWeather API.
    """

    def get_weather(
        self,
        latitude: float,
        longitude: float,
    ) -> WeatherResult:

        logger.info(
            "Fetching weather for (%s,%s)",
            latitude,
            longitude,
        )

        try:

            response = requests.get(
                f"{WEATHER_API_URL}{CURRENT_WEATHER_ENDPOINT}",
                params={
                    "lat": latitude,
                    "lon": longitude,
                    "appid": settings.OPENWEATHER_API_KEY,
                    "units": DEFAULT_UNITS,
                    "lang": DEFAULT_LANGUAGE,
                },
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            data = response.json()

            return WeatherResult(
                temperature=data["main"].get("temp"),
                humidity=data["main"].get("humidity"),
                rainfall=data.get("rain", {}).get("1h"),
                wind_speed=data["wind"].get("speed"),
                wind_direction=data["wind"].get("deg"),
                pressure=data["main"].get("pressure"),
                cloud_cover=data["clouds"].get("all"),
            )

        except requests.Timeout as exc:

            logger.exception(
                "Weather API timed out."
            )

            raise WeatherServiceError(
                "Weather request timed out."
            ) from exc

        except requests.RequestException as exc:

            logger.exception(
                "Weather API request failed."
            )

            raise WeatherServiceError(
                f"Weather API failed: {exc}"
            ) from exc