from __future__ import annotations

import logging

from app.environmental.clients.sentinel_client import (
    SentinelClient,
)
from app.environmental.exceptions import (
    SentinelServiceError,
)
from app.gis.clients.elevation_client import (
    ElevationClient,
)
from app.gis.clients.osm_client import (
    OSMClient,
)
from app.gis.coordinates import (
    validate_coordinates,
)
from app.gis.exceptions import (
    InvalidCoordinatesError,
)
from app.gis.models.gis_result import (
    GISResult,
)

logger = logging.getLogger(__name__)


class GISEnrichmentService:
    """
    GIS Data Enrichment Engine.

    Collects:

        OpenStreetMap
        Elevation
        Slope
        Sentinel vegetation index

    Then derives:

        Terrain classification
        Infrastructure score
        GIS suitability score

    This service is intentionally independent from:
        - ML prediction
        - resource assessment
        - deployment optimization
        - forecasting
    """

    def __init__(self):
        self.osm_client = OSMClient()
        self.elevation_client = ElevationClient()
        self.sentinel_client = SentinelClient()

    # =========================================================
    # TERRAIN
    # =========================================================

    @staticmethod
    def _terrain_classification(
        slope: float | None,
    ) -> str | None:

        if slope is None:
            return None

        if slope < 5:
            return "Flat"

        if slope < 15:
            return "Moderate"

        return "Steep"

    # =========================================================
    # INFRASTRUCTURE
    # =========================================================

    @staticmethod
    def _infrastructure_score(
        road_distance: float | None,
        substation_distance: float | None,
        transmission_distance: float | None,
    ) -> float:

        score = 100.0

        if road_distance is not None:
            score -= min(
                max(road_distance, 0) * 2,
                20,
            )

        if substation_distance is not None:
            score -= min(
                max(substation_distance, 0) * 3,
                30,
            )

        if transmission_distance is not None:
            score -= min(
                max(transmission_distance, 0) * 2,
                20,
            )

        return round(
            max(0.0, score),
            2,
        )

    # =========================================================
    # GIS SCORE
    # =========================================================

    @staticmethod
    def _gis_score(
        land_use: str | None,
        slope: float | None,
        protected_area_distance: float | None,
        infrastructure_score: float,
    ) -> float:

        score = infrastructure_score

        if slope is not None:

            if slope > 15:
                score -= 20

            elif slope > 5:
                score -= 10

        if (
            protected_area_distance is not None
            and protected_area_distance < 5
        ):
            score -= 25

        if land_use is not None:

            normalized_land_use = (
                land_use.strip().lower()
            )

            if normalized_land_use == "industrial":
                score += 5

            elif normalized_land_use == "residential":
                score -= 10

            elif normalized_land_use == "forest":
                score -= 20

        return round(
            max(
                0.0,
                min(100.0, score),
            ),
            2,
        )

    # =========================================================
    # SITE CLASSIFICATION
    # =========================================================

    @staticmethod
    def _site_suitability(
        score: float,
    ) -> str:

        if score >= 85:
            return "Excellent"

        if score >= 70:
            return "Good"

        if score >= 50:
            return "Moderate"

        return "Poor"

    # =========================================================
    # EXISTING INFRASTRUCTURE
    # =========================================================

    @staticmethod
    def _existing_infrastructure(
        road_distance: float | None,
        substation_distance: float | None,
        transmission_distance: float | None,
    ) -> str | None:

        infrastructure = []

        if road_distance is not None:
            infrastructure.append(
                f"Road ({road_distance:.2f} km)"
            )

        if substation_distance is not None:
            infrastructure.append(
                f"Substation ({substation_distance:.2f} km)"
            )

        if transmission_distance is not None:
            infrastructure.append(
                f"Transmission Line "
                f"({transmission_distance:.2f} km)"
            )

        if not infrastructure:
            return None

        return ", ".join(
            infrastructure
        )

    # =========================================================
    # OSM
    # =========================================================

    def _get_osm_features(
        self,
        latitude: float,
        longitude: float,
    ) -> dict:

        try:

            features = (
                self.osm_client.get_site_features(
                    latitude,
                    longitude,
                )
            )

            return {
                "land_use": features.get(
                    "land_use"
                ),
                "road_distance": features.get(
                    "road_distance"
                ),
                "substation_distance": features.get(
                    "substation_distance"
                ),
                "transmission_distance": features.get(
                    "transmission_distance"
                ),
                "water_distance": features.get(
                    "water_distance"
                ),
                "protected_distance": features.get(
                    "protected_distance"
                ),
            }

        except Exception as exc:

            logger.warning(
                "Failed to fetch OSM features: %s",
                exc,
            )

            return {
                "land_use": None,
                "road_distance": None,
                "substation_distance": None,
                "transmission_distance": None,
                "water_distance": None,
                "protected_distance": None,
            }

    # =========================================================
    # ELEVATION
    # =========================================================

    def _get_elevation(
        self,
        latitude: float,
        longitude: float,
    ) -> tuple[float, float]:

        try:
            elevation = (
                self.elevation_client.get_elevation(
                    latitude,
                    longitude,
                )
            )

        except Exception as exc:

            logger.warning(
                "Failed to fetch elevation: %s",
                exc,
            )

            elevation = 0.0

        try:
            slope = (
                self.elevation_client.get_slope(
                    latitude,
                    longitude,
                )
            )

        except Exception as exc:

            logger.warning(
                "Failed to fetch land slope: %s",
                exc,
            )

            slope = 0.0

        return (
            elevation,
            slope,
        )

    # =========================================================
    # SENTINEL
    # =========================================================

    def _get_vegetation_index(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:

        try:

            return (
                self.sentinel_client
                .get_vegetation_index(
                    latitude,
                    longitude,
                )
            )

        except SentinelServiceError:

            logger.warning(
                "Vegetation index unavailable for "
                "(%s, %s).",
                latitude,
                longitude,
            )

            return None

        except Exception as exc:

            logger.warning(
                "Failed to fetch vegetation index: %s",
                exc,
            )

            return None

    # =========================================================
    # MAIN
    # =========================================================

    def enrich_site(
        self,
        latitude: float,
        longitude: float,
    ) -> GISResult:

        if not validate_coordinates(
            latitude,
            longitude,
        ):
            raise InvalidCoordinatesError(
                "Invalid latitude or longitude."
            )

        osm = self._get_osm_features(
            latitude,
            longitude,
        )

        elevation, slope = (
            self._get_elevation(
                latitude,
                longitude,
            )
        )

        vegetation_index = (
            self._get_vegetation_index(
                latitude,
                longitude,
            )
        )

        infrastructure_score = (
            self._infrastructure_score(
                osm["road_distance"],
                osm["substation_distance"],
                osm["transmission_distance"],
            )
        )

        gis_score = self._gis_score(
            land_use=osm["land_use"],
            slope=slope,
            protected_area_distance=(
                osm["protected_distance"]
            ),
            infrastructure_score=(
                infrastructure_score
            ),
        )

        terrain = (
            self._terrain_classification(
                slope
            )
        )

        suitability = (
            self._site_suitability(
                gis_score
            )
        )

        infrastructure = (
            self._existing_infrastructure(
                osm["road_distance"],
                osm["substation_distance"],
                osm["transmission_distance"],
            )
        )

        return GISResult(
            land_use=osm["land_use"],
            elevation=elevation,
            road_distance=osm["road_distance"],
            nearest_substation_distance=(
                osm["substation_distance"]
            ),
            nearest_transmission_line_distance=(
                osm["transmission_distance"]
            ),
            existing_infrastructure=infrastructure,
            water_body_distance=osm["water_distance"],
            protected_area_distance=(
                osm["protected_distance"]
            ),
            land_slope=slope,
            vegetation_index=vegetation_index,
            terrain_classification=terrain,
            infrastructure_score=(
                infrastructure_score
            ),
            gis_score=gis_score,
            site_suitability=suitability,
        )