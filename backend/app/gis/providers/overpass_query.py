"""
Reusable Overpass API queries.

The placeholders:
{lat}
{lon}
{radius}

are replaced dynamically.
"""

ROAD_QUERY = """
[out:json];
(
  way(around:{radius},{lat},{lon})["highway"];
);
out center;
"""

LAND_USE_QUERY = """
[out:json];
(
  way(around:{radius},{lat},{lon})["landuse"];
);
out center;
"""

POWER_LINE_QUERY = """
[out:json];
(
  way(around:{radius},{lat},{lon})["power"="line"];
);
out center;
"""

SUBSTATION_QUERY = """
[out:json];
(
  node(around:{radius},{lat},{lon})["power"="substation"];
  way(around:{radius},{lat},{lon})["power"="substation"];
);
out center;
"""

WATER_QUERY = """
[out:json];
(
  way(around:{radius},{lat},{lon})["natural"="water"];
  way(around:{radius},{lat},{lon})["waterway"];
);
out center;
"""

PROTECTED_AREA_QUERY = """
[out:json];
(
  way(around:{radius},{lat},{lon})["boundary"="protected_area"];
  way(around:{radius},{lat},{lon})["leisure"="nature_reserve"];
  relation(around:{radius},{lat},{lon})["boundary"="protected_area"];
);
out center;
"""

INFRASTRUCTURE_QUERY = """
[out:json];
(
  node(around:{radius},{lat},{lon});
  way(around:{radius},{lat},{lon});
);
out center;
"""