from fastapi import HTTPException, status

from app.models.site import Site
from app.models.user import User

from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository

from app.schemas.site import SiteCreate, SiteUpdate

from app.services.base_service import BaseService
from app.services.gis_enrichment_service import GISEnrichmentService

from app.services.notification_trigger_service import (
    NotificationTriggerService,
)


class SiteService(BaseService[SiteRepository]):

    def __init__(
        self,
        site_repository: SiteRepository,
        project_repository: ProjectRepository,
        gis_enrichment_service: GISEnrichmentService,
        notification_trigger_service: NotificationTriggerService,
    ):
        super().__init__(site_repository)

        self.project_repository = project_repository
        self.gis_enrichment_service = gis_enrichment_service
        self.notification_trigger_service = (
            notification_trigger_service
        )

    # =========================================================
    # GET ALL SITES
    # =========================================================

    def get_all_sites(
        self,
        current_user: User,
    ):
        if current_user.role.name == "Admin":
            return self.repository.get_all()

        projects = self.project_repository.get_by_owner(
            current_user.id
        )

        project_ids = [
            project.id
            for project in projects
        ]

        return [
            site
            for project_id in project_ids
            for site in self.repository.get_by_project(
                project_id
            )
        ]

    # =========================================================
    # GET SITE BY ID
    # =========================================================

    def get_site_by_id(
        self,
        site_id: int,
        current_user: User,
    ):
        site = self.repository.get_by_id(site_id)

        if site is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Site not found",
            )

        self._check_access(
            site,
            current_user,
        )

        return site

    # =========================================================
    # GET SITES BY PROJECT
    # =========================================================

    def get_sites_by_project(
        self,
        project_id: int,
        current_user: User,
    ):
        project = self.project_repository.get_by_id(
            project_id
        )

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        if (
            current_user.role.name != "Admin"
            and project.created_by != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this project",
            )

        return self.repository.get_by_project(
            project_id
        )

    # =========================================================
    # CREATE SITE
    # =========================================================

    def create_site(
        self,
        site_data: SiteCreate,
        current_user: User,
    ):
        # -----------------------------------------------------
        # 1. Validate project
        # -----------------------------------------------------

        project = self.project_repository.get_by_id(
            site_data.project_id
        )

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        # -----------------------------------------------------
        # 2. Check project access
        # -----------------------------------------------------

        if (
            current_user.role.name != "Admin"
            and project.created_by != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this project",
            )

        # -----------------------------------------------------
        # 3. Create the basic site first
        #
        # Only user-provided information is stored here.
        # GIS/environmental fields are populated after the
        # site receives its database ID.
        # -----------------------------------------------------

        site = Site(
            name=site_data.name,
            description=site_data.description,
            latitude=site_data.latitude,
            longitude=site_data.longitude,
            region=site_data.region,
            land_area=site_data.land_area,
            project_id=site_data.project_id,

            # GIS-derived fields are populated by the
            # GIS enrichment service.
            elevation=None,
            land_use=None,
            road_distance=None,
            nearest_substation_distance=None,
            nearest_transmission_line_distance=None,
            water_body_distance=None,
            protected_area_distance=None,
            land_slope=None,
            vegetation_index=None,
            existing_infrastructure=None,
        )

        # -----------------------------------------------------
        # 4. Persist basic site
        #
        # This gives the site its database ID.
        # -----------------------------------------------------

        created_site = self.repository.create(site)

        # -----------------------------------------------------
        # 5. GIS / ENVIRONMENTAL ENRICHMENT
        #
        # IMPORTANT:
        # The site must be enriched immediately after creation.
        #
        # PredictionFeatureBuilder requires a valid GIS section,
        # especially elevation for solar and wind prediction.
        # -----------------------------------------------------

        created_site = self._enrich_site(
            created_site
        )

        # -----------------------------------------------------
        # 6. Notification
        # -----------------------------------------------------

        self.notification_trigger_service.site_created(
            site=created_site,
            user_id=current_user.id,
        )

        return created_site

    # =========================================================
    # UPDATE SITE
    # =========================================================

    def update_site(
        self,
        site_id: int,
        site_data: SiteUpdate,
        current_user: User,
    ):
        site = self.get_site_by_id(
            site_id,
            current_user,
        )

        # -----------------------------------------------------
        # Detect coordinate changes
        # -----------------------------------------------------

        coordinates_changed = (
            site_data.latitude is not None
            and site_data.latitude != site.latitude
        ) or (
            site_data.longitude is not None
            and site_data.longitude != site.longitude
        )

        # -----------------------------------------------------
        # Project change
        # -----------------------------------------------------

        if site_data.project_id is not None:

            if site_data.project_id != site.project_id:

                project = self.project_repository.get_by_id(
                    site_data.project_id
                )

                if project is None:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="Project not found",
                    )

                if (
                    current_user.role.name != "Admin"
                    and project.created_by != current_user.id
                ):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail=(
                            "You do not have access "
                            "to this project"
                        ),
                    )

                site.project_id = site_data.project_id

        # -----------------------------------------------------
        # Update basic fields
        # -----------------------------------------------------

        if site_data.name is not None:
            site.name = site_data.name

        if site_data.description is not None:
            site.description = site_data.description

        if site_data.latitude is not None:
            site.latitude = site_data.latitude

        if site_data.longitude is not None:
            site.longitude = site_data.longitude

        if site_data.region is not None:
            site.region = site_data.region

        if site_data.land_area is not None:
            site.land_area = site_data.land_area

        # -----------------------------------------------------
        # Save basic changes
        # -----------------------------------------------------

        site = self.repository.update(site)

        # -----------------------------------------------------
        # Re-enrich when coordinates change
        # -----------------------------------------------------

        if coordinates_changed:
            site = self._enrich_site(site)

        self.notification_trigger_service.site_updated(
            site=site,
            user_id=site.project.created_by,
        )

        return site

    # =========================================================
    # DELETE SITE
    # =========================================================

    def delete_site(
        self,
        site_id: int,
        current_user: User,
    ):
        site = self.get_site_by_id(
            site_id,
            current_user,
        )

        project = self.project_repository.get_by_id(
            site.project_id
        )

        project_owner_id = (
            project.created_by
            if project is not None
            else current_user.id
        )

        self.repository.delete(site)

        self.notification_trigger_service.site_deleted(
            site=site,
            user_id=project_owner_id,
        )

        return {
            "message": "Site deleted successfully"
        }

    # =========================================================
    # GIS / ENVIRONMENTAL ENRICHMENT
    # =========================================================

    def _enrich_site(
        self,
        site: Site,
    ):
        try:
            # -------------------------------------------------
            # Latitude + longitude are the ONLY inputs needed
            # from the site for GIS enrichment.
            # -------------------------------------------------

            gis_data = (
                self.gis_enrichment_service.enrich_site(
                    site.latitude,
                    site.longitude,
                )
            )

            # -------------------------------------------------
            # Copy ALL GIS fields
            # -------------------------------------------------

            site.elevation = gis_data.elevation

            site.land_use = gis_data.land_use

            site.road_distance = (
                gis_data.road_distance
            )

            site.nearest_substation_distance = (
                gis_data.nearest_substation_distance
            )

            site.nearest_transmission_line_distance = (
                gis_data.nearest_transmission_line_distance
            )

            # -------------------------------------------------
            # Environmental fields
            # -------------------------------------------------

            site.water_body_distance = (
                gis_data.water_body_distance
            )

            site.protected_area_distance = (
                gis_data.protected_area_distance
            )

            site.land_slope = (
                gis_data.land_slope
            )

            site.vegetation_index = (
                gis_data.vegetation_index
            )

            # -------------------------------------------------
            # Derived infrastructure description
            # -------------------------------------------------

            site.existing_infrastructure = (
                gis_data.existing_infrastructure
            )

            # -------------------------------------------------
            # Persist ALL enrichment values
            # -------------------------------------------------

            return self.repository.update(site)

        except HTTPException:
            raise

        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=(
                    "GIS/environmental enrichment "
                    "failed for this site."
                ),
            ) from exc

    # =========================================================
    # ACCESS CONTROL
    # =========================================================

    @staticmethod
    def _check_access(
        site: Site,
        current_user: User,
    ):
        if current_user.role.name == "Admin":
            return

        if site.project.created_by != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have access to this site",
            )