from app.gis.geojson import (
    site_to_feature,
    sites_to_feature_collection,
)
from app.models.site import Site


def test_site_to_feature():
    site = Site(
        id=1,
        name="Solar Site",
        latitude=23.181,
        longitude=79.955,
        project_id=2,
    )

    feature = site_to_feature(site)

    assert feature.type == "Feature"
    assert feature.geometry.type == "Point"
    assert feature.geometry.coordinates == [79.955, 23.181]

    assert feature.properties["id"] == 1
    assert feature.properties["name"] == "Solar Site"
    assert feature.properties["project_id"] == 2


def test_feature_collection():
    sites = [
        Site(
            id=1,
            name="Site A",
            latitude=23.18,
            longitude=79.95,
            project_id=1,
        ),
        Site(
            id=2,
            name="Site B",
            latitude=24.18,
            longitude=80.95,
            project_id=1,
        ),
    ]

    collection = sites_to_feature_collection(sites)

    assert collection.type == "FeatureCollection"
    assert len(collection.features) == 2