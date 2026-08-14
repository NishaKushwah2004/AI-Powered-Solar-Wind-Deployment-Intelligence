from sqlalchemy.orm import Session

from app.repositories.gis_analyst_dashboard_repository import (
    GISAnalystDashboardRepository,
)

from app.schemas.gis_analyst_dashboard import (
    EnvironmentalAnalytics,
    GISAnalystDashboardResponse,
    GISSummary,
    GISVisualizationSite,
    SiteComparisonItem,
    TerrainMapSite,
)


class GISAnalystDashboardService:

    def __init__(self, db: Session):

        self.repository = (
            GISAnalystDashboardRepository(db)
        )

    def get_dashboard(
        self,
    ) -> GISAnalystDashboardResponse:

        sites = (
            self.repository.get_sites()
        )

        visualization_sites = []

        terrain_sites = []

        comparison_sites = []

        vegetation_values = []
        water_distances = []
        protected_distances = []
        road_distances = []
        substation_distances = []
        transmission_distances = []
        slope_values = []

        enriched_sites = 0


        for site in sites:

            site_id = site.id

            site_name = getattr(
                site,
                "name",
                f"Site {site_id}",
            )

            latitude = self._number(
                getattr(
                    site,
                    "latitude",
                    0,
                )
            )

            longitude = self._number(
                getattr(
                    site,
                    "longitude",
                    0,
                )
            )


            suitability_score = self._number(
                getattr(
                    site,
                    "suitability_score",
                    getattr(
                        site,
                        "overall_deployment_score",
                        0,
                    ),
                )
            )


            land_use = str(
                getattr(
                    site,
                    "land_use",
                    "Unknown",
                )
            )


            land_slope = self._number(
                getattr(
                    site,
                    "land_slope",
                    0,
                )
            )


            vegetation_index = self._number(
                getattr(
                    site,
                    "vegetation_index",
                    0,
                )
            )


            road_distance = self._number(
                getattr(
                    site,
                    "road_distance",
                    0,
                )
            )


            substation_distance = self._number(
                getattr(
                    site,
                    "nearest_substation_distance",
                    0,
                )
            )


            transmission_distance = self._number(
                getattr(
                    site,
                    "nearest_transmission_line_distance",
                    0,
                )
            )


            water_distance = self._number(
                getattr(
                    site,
                    "water_body_distance",
                    0,
                )
            )


            protected_distance = self._number(
                getattr(
                    site,
                    "protected_area_distance",
                    0,
                )
            )


            if self._is_enriched(site):

                enriched_sites += 1


            slope_values.append(
                land_slope
            )

            vegetation_values.append(
                vegetation_index
            )

            water_distances.append(
                water_distance
            )

            protected_distances.append(
                protected_distance
            )

            road_distances.append(
                road_distance
            )

            substation_distances.append(
                substation_distance
            )

            transmission_distances.append(
                transmission_distance
            )


            visualization_sites.append(
                GISVisualizationSite(
                    site_id=site_id,
                    site_name=site_name,
                    latitude=latitude,
                    longitude=longitude,
                    suitability_score=suitability_score,
                    land_use=land_use,
                )
            )


            terrain_sites.append(
                TerrainMapSite(
                    site_id=site_id,
                    site_name=site_name,
                    latitude=latitude,
                    longitude=longitude,
                    land_slope=land_slope,
                )
            )


            comparison_sites.append(
                SiteComparisonItem(
                    site_id=site_id,
                    site_name=site_name,
                    suitability_score=suitability_score,
                    land_use=land_use,
                    land_slope=land_slope,
                    vegetation_index=vegetation_index,
                    road_distance=road_distance,
                    substation_distance=substation_distance,
                    transmission_line_distance=(
                        transmission_distance
                    ),
                    water_body_distance=(
                        water_distance
                    ),
                    protected_area_distance=(
                        protected_distance
                    ),
                )
            )


        environmental = (
            EnvironmentalAnalytics(
                average_vegetation_index=(
                    self._average(
                        vegetation_values
                    )
                ),
                average_water_body_distance=(
                    self._average(
                        water_distances
                    )
                ),
                average_protected_area_distance=(
                    self._average(
                        protected_distances
                    )
                ),
                average_road_distance=(
                    self._average(
                        road_distances
                    )
                ),
                average_substation_distance=(
                    self._average(
                        substation_distances
                    )
                ),
                average_transmission_line_distance=(
                    self._average(
                        transmission_distances
                    )
                ),
            )
        )


        summary = GISSummary(
            total_sites=len(sites),

            enriched_sites=enriched_sites,

            average_slope=self._average(
                slope_values
            ),

            average_vegetation_index=(
                self._average(
                    vegetation_values
                )
            ),
        )


        return GISAnalystDashboardResponse(
            summary=summary,

            visualization_sites=(
                visualization_sites
            ),

            environmental_analytics=(
                environmental
            ),

            terrain_sites=(
                terrain_sites
            ),

            site_comparison=(
                comparison_sites
            ),
        )


    @staticmethod
    def _number(value) -> float:

        if value is None:
            return 0.0

        try:
            return float(value)

        except (
            TypeError,
            ValueError,
        ):
            return 0.0


    @staticmethod
    def _average(
        values: list[float],
    ) -> float:

        if not values:
            return 0.0

        return round(
            sum(values)
            / len(values),
            2,
        )


    @staticmethod
    def _is_enriched(site) -> bool:

        fields = [
            "land_use",
            "road_distance",
            "nearest_substation_distance",
            "nearest_transmission_line_distance",
            "water_body_distance",
            "protected_area_distance",
            "land_slope",
            "vegetation_index",
        ]

        return any(
            getattr(
                site,
                field,
                None,
            ) is not None
            for field in fields
        )