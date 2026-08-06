import logging

from app.environmental.clients.sentinel_client import SentinelClient
from app.environmental.exceptions import SentinelServiceError
from app.gis.clients.elevation_client import ElevationClient
from app.gis.clients.osm_client import OSMClient
from app.gis.coordinates import validate_coordinates
from app.gis.exceptions import InvalidCoordinatesError
from app.gis.models.gis_result import GISResult

logger = logging.getLogger(__name__)


class GISEnrichmentService:
    """
    Service responsible for enriching a site using
    external GIS and environmental data providers.
    """

    def __init__(self):
        self.osm_client = OSMClient()
        self.elevation_client = ElevationClient()
        self.sentinel_client = SentinelClient()

    # --------------------------------------------------
    # Helper Methods
    # --------------------------------------------------

    def _terrain_classification(
        self,
        slope: float | None,
    ) -> str | None:

        if slope is None:
            return None

        if slope < 5:
            return "Flat"

        if slope < 15:
            return "Moderate"

        return "Steep"

    def _infrastructure_score(
        self,
        road_distance: float | None,
        substation_distance: float | None,
        transmission_distance: float | None,
    ) -> float:

        score = 100.0

        if road_distance is not None:
            score -= min(road_distance * 2, 20)

        if substation_distance is not None:
            score -= min(substation_distance * 3, 30)

        if transmission_distance is not None:
            score -= min(transmission_distance * 2, 20)

        return round(max(score, 0), 2)

    def _gis_score(
        self,
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

            land_use = land_use.lower()

            if land_use == "industrial":
                score += 5

            elif land_use == "residential":
                score -= 10

            elif land_use == "forest":
                score -= 20

        return round(
            min(max(score, 0), 100),
            2,
        )

    def _site_suitability(
        self,
        score: float,
    ) -> str:

        if score >= 85:
            return "Excellent"

        if score >= 70:
            return "Good"

        if score >= 50:
            return "Moderate"

        return "Poor"

    def _existing_infrastructure(
        self,
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
                f"Transmission Line ({transmission_distance:.2f} km)"
            )

        return (
            ", ".join(infrastructure)
            if infrastructure
            else None
        )

    # --------------------------------------------------
    # Main Enrichment
    # --------------------------------------------------

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

        land_use = self.osm_client.get_land_use(
            latitude,
            longitude,
        )

        elevation = self.elevation_client.get_elevation(
            latitude,
            longitude,
        )

        road_distance = (
            self.osm_client.get_nearest_road_distance(
                latitude,
                longitude,
            )
        )

        substation_distance = (
            self.osm_client.get_nearest_substation_distance(
                latitude,
                longitude,
            )
        )

        transmission_distance = (
            self.osm_client.get_nearest_transmission_line_distance(
                latitude,
                longitude,
            )
        )

        water_body_distance = (
            self.osm_client.get_nearest_water_body_distance(
                latitude,
                longitude,
            )
        )

        protected_area_distance = (
            self.osm_client.get_nearest_protected_area_distance(
                latitude,
                longitude,
            )
        )

        land_slope = self.elevation_client.get_slope(
            latitude,
            longitude,
        )

        vegetation_index = self._get_vegetation_index(
            latitude,
            longitude,
        )

        terrain = self._terrain_classification(
            land_slope,
        )

        infrastructure_score = (
            self._infrastructure_score(
                road_distance,
                substation_distance,
                transmission_distance,
            )
        )

        gis_score = self._gis_score(
            land_use,
            land_slope,
            protected_area_distance,
            infrastructure_score,
        )

        suitability = self._site_suitability(
            gis_score,
        )

        infrastructure = self._existing_infrastructure(
            road_distance,
            substation_distance,
            transmission_distance,
        )

        return GISResult(
            land_use=land_use,
            elevation=elevation,
            road_distance=road_distance,
            nearest_substation_distance=substation_distance,
            nearest_transmission_line_distance=transmission_distance,
            existing_infrastructure=infrastructure,
            water_body_distance=water_body_distance,
            protected_area_distance=protected_area_distance,
            land_slope=land_slope,
            vegetation_index=vegetation_index,
            terrain_classification=terrain,
            infrastructure_score=infrastructure_score,
            gis_score=gis_score,
            site_suitability=suitability,
        )

    # --------------------------------------------------
    # Sentinel
    # --------------------------------------------------

    def _get_vegetation_index(
        self,
        latitude: float,
        longitude: float,
    ) -> float | None:

        try:
            return self.sentinel_client.get_vegetation_index(
                latitude,
                longitude,
            )

        except SentinelServiceError:

            logger.warning(
                "Vegetation index unavailable for (%s, %s); "
                "continuing without Sentinel data.",
                latitude,
                longitude,
            )

            return None