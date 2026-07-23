from app.gis.clients.elevation_client import ElevationClient
from app.gis.clients.osm_client import OSMClient
from app.gis.coordinates import validate_coordinates
from app.gis.exceptions import InvalidCoordinatesError
from app.gis.models.gis_result import GISResult


class GISEnrichmentService:
    """
    Service responsible for enriching a site using
    external GIS providers.

    Current providers:
    - OpenStreetMap
    - Open Elevation

    Future providers:
    - NASA POWER
    - Open-Meteo
    - ERA5
    """

    def __init__(self):
        self.osm_client = OSMClient()
        self.elevation_client = ElevationClient()

    def enrich_site(
        self,
        latitude: float,
        longitude: float,
    ) -> GISResult:
        """
        Enrich a site using GIS providers.
        """

        if not validate_coordinates(latitude, longitude):
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
            self.osm_client.get_nearest_transmission_distance(
                latitude,
                longitude,
            )
        )

        infrastructure = []

        if road_distance is not None:
            infrastructure.append("Road")

        if substation_distance is not None:
            infrastructure.append("Substation")

        if transmission_distance is not None:
            infrastructure.append("Transmission Line")

        return GISResult(
            land_use=land_use,
            elevation=elevation,
            existing_infrastructure=", ".join(infrastructure)
            if infrastructure
            else None,
            road_distance=road_distance,
            nearest_substation_distance=substation_distance,
            nearest_transmission_line_distance=transmission_distance,
        )