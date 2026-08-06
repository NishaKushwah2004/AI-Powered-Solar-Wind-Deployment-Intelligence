import logging

import requests

from app.core.config import settings
from app.environmental.constants import REQUEST_TIMEOUT
from app.environmental.exceptions import SentinelServiceError

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------
# Copernicus Sentinel Hub Integration
# ---------------------------------------------------------------
#
# This client is designed against the Sentinel Hub Statistical
# API (Copernicus Data Space Ecosystem), which is the standard
# way to derive a Vegetation Index (NDVI) and basic land-cover
# signal for a point/area of interest from Sentinel-2 imagery.
#
# Real integration flow:
#   1. OAuth2 client-credentials grant against
#      https://identity.dataspace.copernicus.eu/auth/realms/
#      CDSE/protocol/openid-connect/token
#      using SENTINEL_CLIENT_ID / SENTINEL_CLIENT_SECRET.
#   2. POST a small bounding box (built from latitude/longitude)
#      plus an NDVI evalscript to the Statistical API:
#      https://sh.dataspace.copernicus.eu/api/v1/statistics
#   3. Parse the returned per-band statistics and take the
#      mean NDVI value for the requested time window as the
#      site's vegetation index.
#
# Because Sentinel Hub requires a paid/registered account,
# credentials are optional in this environment. When they are
# not configured, this client returns `None` rather than
# raising, so the rest of the Environmental Data Engine keeps
# working using NASA POWER, OpenWeather, OSM and Elevation data.
# ---------------------------------------------------------------

SENTINEL_TOKEN_URL = (
    "https://identity.dataspace.copernicus.eu/auth/realms/"
    "CDSE/protocol/openid-connect/token"
)

SENTINEL_STATISTICS_URL = (
    "https://sh.dataspace.copernicus.eu/api/v1/statistics"
)


class SentinelClient:
    """
    Client for Copernicus Sentinel Hub.

    Retrieves a vegetation index (NDVI) for a site, used by the
    Environmental Data Engine / Geographic Intelligence Engine.
    """

    def is_configured(self) -> bool:
        return bool(
            settings.SENTINEL_CLIENT_ID
            and settings.SENTINEL_CLIENT_SECRET
        )

    def _get_access_token(self) -> str | None:

        try:
            response = requests.post(
                SENTINEL_TOKEN_URL,
                data={
                    "grant_type": "client_credentials",
                    "client_id": settings.SENTINEL_CLIENT_ID,
                    "client_secret": settings.SENTINEL_CLIENT_SECRET,
                },
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            return response.json().get("access_token")

        except requests.RequestException as exc:
            logger.exception(
                "Sentinel Hub authentication failed."
            )
            raise SentinelServiceError(
                f"Sentinel Hub authentication failed: {exc}"
            ) from exc

    def get_vegetation_index(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:
        """
        Retrieve the NDVI-based vegetation index for a site.

        Returns None when Sentinel Hub credentials are not
        configured, instead of failing the request - satellite
        land-cover data is treated as an enhancement, not a
        hard dependency, for Milestone 2.
        """

        if not self.is_configured():
            logger.info(
                "Sentinel Hub credentials not configured; "
                "skipping vegetation index lookup for (%s, %s).",
                latitude,
                longitude,
            )
            return None

        try:
            token = self._get_access_token()

            if token is None:
                return None

            # A small bounding box (~500m) around the site,
            # as required by the Statistical API.
            offset = 0.005

            request_body = {
                "input": {
                    "bounds": {
                        "bbox": [
                            longitude - offset,
                            latitude - offset,
                            longitude + offset,
                            latitude + offset,
                        ]
                    },
                    "data": [
                        {"type": "sentinel-2-l2a"}
                    ],
                },
                "aggregation": {
                    "timeRange": {
                        "from": "2024-01-01T00:00:00Z",
                        "to": "2024-12-31T00:00:00Z",
                    },
                    "aggregationInterval": {
                        "of": "P1D",
                    },
                    "evalscript": (
                        "//VERSION=3\n"
                        "function setup() {\n"
                        "  return {\n"
                        "    input: [\"B04\", \"B08\"],\n"
                        "    output: { bands: 1 }\n"
                        "  };\n"
                        "}\n"
                        "function evaluatePixel(s) {\n"
                        "  let ndvi = (s.B08 - s.B04) / "
                        "(s.B08 + s.B04);\n"
                        "  return [ndvi];\n"
                        "}"
                    ),
                },
            }

            response = requests.post(
                SENTINEL_STATISTICS_URL,
                json=request_body,
                headers={
                    "Authorization": f"Bearer {token}",
                },
                timeout=REQUEST_TIMEOUT,
            )

            response.raise_for_status()

            data = response.json()

            intervals = data.get("data", [])

            ndvi_values = [
                interval["outputs"]["default"]["bands"]["B0"][
                    "stats"
                ]["mean"]
                for interval in intervals
                if "outputs" in interval
            ]

            if not ndvi_values:
                return None

            return round(
                sum(ndvi_values) / len(ndvi_values),
                4,
            )

        except SentinelServiceError:
            raise

        except (requests.RequestException, KeyError, ValueError) as exc:
            logger.exception(
                "Sentinel Hub vegetation index request failed."
            )
            raise SentinelServiceError(
                f"Sentinel Hub request failed: {exc}"
            ) from exc