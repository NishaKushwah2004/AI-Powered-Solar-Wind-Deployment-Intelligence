import requests

from app.gis.constants import (
    DEFAULT_SEARCH_RADIUS,
    OVERPASS_API_URL,
    REQUEST_TIMEOUT,
)
from app.gis.exceptions import OSMServiceError
from app.gis.providers.overpass_query import (
    ROAD_QUERY,
    LAND_USE_QUERY,
    SUBSTATION_QUERY,
    POWER_LINE_QUERY,
)
from app.gis.coordinates import distance_between_points
import logging
from app.core.logging import logger

from app.gis.constants import (
    DEFAULT_SEARCH_RADIUS,
    OVERPASS_API_URL,
    REQUEST_TIMEOUT,
)
from app.gis.exceptions import OSMServiceError

logger = logging.getLogger(__name__)


class OSMClient:
    """
    Client for interacting with the OpenStreetMap
    Overpass API.
    """

    def _execute_query(
        self,
        query: str,
    ) -> dict:
        """
        Execute an Overpass API query.
        """

        logger.info("Sending request to Overpass API")

        try:
            response = requests.post(
                OVERPASS_API_URL,
                data=query,
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            logger.info(
                "Overpass API request completed successfully."
            )

            return response.json()

        except requests.Timeout as exc:
            logger.exception("Overpass API request timed out.")
            raise OSMServiceError(
                "OpenStreetMap request timed out."
            ) from exc

        except requests.RequestException as exc:
            logger.exception("Overpass API request failed.")
            raise OSMServiceError(
                f"OpenStreetMap request failed: {exc}"
            ) from exc

    def _nearest_distance(
        self,
        latitude: float,
        longitude: float,
        elements: list,
    ) -> float | None:
        """
        Calculate the distance (km) to the nearest OSM element.
        """

        if not elements:
            return None

        distances = []

        for element in elements:

            if "lat" in element and "lon" in element:
                lat = element["lat"]
                lon = element["lon"]

            elif "center" in element:
                lat = element["center"]["lat"]
                lon = element["center"]["lon"]

            else:
                continue

            distance = distance_between_points(
                latitude,
                longitude,
                lat,
                lon,
            )

            distances.append(distance)

        return min(distances) if distances else None

    def get_land_use(
        self,
        latitude: float,
        longitude: float,
    ) -> str | None:

        query = LAND_USE_QUERY.format(
            lat=latitude,
            lon=longitude,
            radius=DEFAULT_SEARCH_RADIUS,
        )

        data = self._execute_query(query)

        elements = data.get("elements", [])

        if not elements:
            return None

        tags = elements[0].get("tags", {})

        return tags.get("landuse")

    def get_nearest_road_distance(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:

        query = ROAD_QUERY.format(
            lat=latitude,
            lon=longitude,
            radius=DEFAULT_SEARCH_RADIUS,
        )

        data = self._execute_query(query)

        return self._nearest_distance(
            latitude,
            longitude,
            data.get("elements", []),
        )

    def get_nearest_substation_distance(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:

        query = SUBSTATION_QUERY.format(
            lat=latitude,
            lon=longitude,
            radius=DEFAULT_SEARCH_RADIUS,
        )

        data = self._execute_query(query)

        return self._nearest_distance(
            latitude,
            longitude,
            data.get("elements", []),
        )

    def get_nearest_transmission_line_distance(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:

        query = POWER_LINE_QUERY.format(
            lat=latitude,
            lon=longitude,
            radius=DEFAULT_SEARCH_RADIUS,
        )

        data = self._execute_query(query)

        return self._nearest_distance(
            latitude,
            longitude,
            data.get("elements", []),
        )