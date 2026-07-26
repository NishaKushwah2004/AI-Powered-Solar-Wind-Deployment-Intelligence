import logging

import requests

from app.environmental.constants import (
    NASA_POWER_API_URL,
    REQUEST_TIMEOUT,
)
from app.environmental.exceptions import (
    NASAPowerServiceError,
)
from app.environmental.models.solar_result import (
    SolarResult,
)
from app.environmental.providers.nasa_power_query import (
    NASA_COMMUNITY,
    NASA_FORMAT,
    NASA_PARAMETERS,
    NASA_POWER_ENDPOINT,
)

logger = logging.getLogger(__name__)


class NASAPowerClient:
    """
    Client for NASA POWER API.

    Retrieves long-term climatology
    and solar resource information.
    """

    def get_solar_resource(
        self,
        latitude: float,
        longitude: float,
    ) -> SolarResult:

        logger.info(
            "Fetching NASA POWER data for (%s, %s)",
            latitude,
            longitude,
        )

        try:

            response = requests.get(
                f"{NASA_POWER_API_URL}{NASA_POWER_ENDPOINT}",
                params={
                    "parameters": ",".join(
                        NASA_PARAMETERS
                    ),
                    "community": NASA_COMMUNITY,
                    "latitude": latitude,
                    "longitude": longitude,
                    "format": NASA_FORMAT,
                },
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            data = response.json()

            parameters = (
                data.get("properties", {})
                .get("parameter", {})
            )

            ghi = parameters.get(
                "ALLSKY_SFC_SW_DWN", {}
            )

            dni = parameters.get(
                "ALLSKY_SFC_SW_DNI", {}
            )

            dhi = parameters.get(
                "ALLSKY_SFC_SW_DIFF", {}
            )

            ghi_value = (
                sum(ghi.values()) / len(ghi)
                if ghi
                else None
            )

            dni_value = (
                sum(dni.values()) / len(dni)
                if dni
                else None
            )

            dhi_value = (
                sum(dhi.values()) / len(dhi)
                if dhi
                else None
            )

            return SolarResult(
                ghi=ghi_value,
                dni=dni_value,
                dhi=dhi_value,
                solar_irradiance=ghi_value,
            )

        except requests.Timeout as exc:

            logger.exception(
                "NASA POWER request timed out."
            )

            raise NASAPowerServiceError(
                "NASA POWER request timed out."
            ) from exc

        except requests.RequestException as exc:

            logger.exception(
                "NASA POWER request failed."
            )

            raise NASAPowerServiceError(
                f"NASA POWER request failed: {exc}"
            ) from exc