import requests

from app.gis.constants import (
    OPEN_ELEVATION_API_URL,
    REQUEST_TIMEOUT,
)
from app.gis.exceptions import ElevationServiceError
from app.gis.providers.elevation_query import (
    OPEN_ELEVATION_ENDPOINT,
)
import logging
from app.core.logging import logger

logger = logging.getLogger(__name__)


class ElevationClient:
    """
    Client for Open-Elevation API.
    """

    def get_elevation(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:
        """
        Retrieve elevation from the Open-Elevation API.
        """

        logger.info(
            "Fetching elevation for (%s, %s)",
            latitude,
            longitude,
        )

        try:

            response = requests.get(
                f"{OPEN_ELEVATION_API_URL}{OPEN_ELEVATION_ENDPOINT}",
                params={
                    "locations": f"{latitude},{longitude}",
                },
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            data = response.json()

            results = data.get("results", [])

            if not results:
                logger.warning(
                    "No elevation data returned for (%s, %s).",
                    latitude,
                    longitude,
                )
                return None

            elevation = results[0].get("elevation")

            logger.info(
                "Elevation retrieved successfully: %s m",
                elevation,
            )

            return elevation

        except requests.Timeout as exc:
            logger.exception("Elevation API request timed out.")
            raise ElevationServiceError(
                "Elevation API request timed out."
            ) from exc

        except requests.RequestException as exc:
            logger.exception("Elevation API request failed.")
            raise ElevationServiceError(
                f"Elevation API failed: {exc}"
            ) from exc