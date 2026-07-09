from app.gis.coordinates import (
    validate_latitude,
    validate_longitude,
    validate_coordinates,
    distance_between_points,
    bounding_box,
    center_point,
)


def test_validate_latitude():
    assert validate_latitude(23.18)
    assert validate_latitude(-90)
    assert validate_latitude(90)

    assert not validate_latitude(91)
    assert not validate_latitude(-91)


def test_validate_longitude():
    assert validate_longitude(79.95)
    assert validate_longitude(-180)
    assert validate_longitude(180)

    assert not validate_longitude(181)
    assert not validate_longitude(-181)


def test_validate_coordinates():
    assert validate_coordinates(23.18, 79.95)
    assert not validate_coordinates(100, 79.95)
    assert not validate_coordinates(23.18, 200)


def test_distance_between_points():
    distance = distance_between_points(
        23.181,
        79.955,
        28.6139,
        77.2090,
    )

    assert distance > 0


def test_bounding_box():
    coords = [
        (23.18, 79.95),
        (25.10, 80.20),
        (22.40, 81.00),
    ]

    bbox = bounding_box(coords)

    assert bbox == (
        22.40,
        79.95,
        25.10,
        81.00,
    )


def test_center_point():
    coords = [
        (20.0, 80.0),
        (22.0, 82.0),
    ]

    center = center_point(coords)

    assert center == (
        21.0,
        81.0,
    )