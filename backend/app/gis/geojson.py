"""
GeoJSON utilities.

Implemented in Phase 11B.
"""

from app.gis.constants import COORDINATE_PRECISION, MARKER_CONFIG
from app.models.site import Site
from app.schemas.geojson import (
    Feature,
    FeatureCollection,
    Geometry,
)



def site_to_feature(site: Site) -> Feature:
    """
    Convert Site model into a GeoJSON Feature.
    """

    geometry = Geometry(
        type="Point",
        coordinates=[
            round(site.longitude, COORDINATE_PRECISION),
            round(site.latitude, COORDINATE_PRECISION),
        ],
    )

    marker = MARKER_CONFIG["default"]

    properties = {
        "id": site.id,
        "name": site.name,
        "project_id": site.project_id,

        # Frontend metadata
        "markerColor": marker["color"],
        "markerIcon": marker["icon"],
        "layer": "sites",

        # Popup
        "popup": {
            "title": site.name,
            "project_id": site.project_id,
            "latitude": site.latitude,
            "longitude": site.longitude,
        },

        # Tooltip
        "tooltip": site.name,
    }

    return Feature(
        geometry=geometry,
        properties=properties,
    )


def sites_to_feature_collection(
    sites: list[Site],
) -> FeatureCollection:
    """
    Convert a list of Site objects into a GeoJSON FeatureCollection.
    """

    return FeatureCollection(
        features=[
            site_to_feature(site)
            for site in sites
        ]
    )

def project_sites_to_feature_collection(
    project,
) -> FeatureCollection:
    """
    Convert all sites of a project into a FeatureCollection.
    """

    return FeatureCollection(
        features=[
            site_to_feature(site)
            for site in project.sites
        ]
    )