from __future__ import annotations

from app.models.project import Project
from app.models.site import Site
from app.models.user import User
from app.repositories.notification_repository import (
    NotificationRepository,
)


class NotificationTriggerService:
    """
    Creates automatic in-app notifications for important
    business events.

    This service does NOT change business logic.
    It only records notifications after an event occurs.
    """

    def __init__(
        self,
        repository: NotificationRepository,
    ):
        self.repository = repository

    # =========================================================
    # SITE CREATED
    # =========================================================

    def site_created(
        self,
        site: Site,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Site Created",
            message=(
                f"Site '{site.name}' was created successfully "
                f"and GIS data was processed."
            ),
            notification_type="site_created",
            severity="info",
            site_id=site.id,
            project_id=site.project_id,
        )

    # =========================================================
    # SITE UPDATED
    # =========================================================

    def site_updated(
        self,
        site: Site,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Site Updated",
            message=(
                f"Site '{site.name}' was updated successfully."
            ),
            notification_type="site_updated",
            severity="info",
            site_id=site.id,
            project_id=site.project_id,
        )

    # =========================================================
    # SITE DELETED
    # =========================================================

    def site_deleted(
        self,
        site: Site,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Site Deleted",
            message=(
                f"Site '{site.name}' was deleted successfully."
            ),
            notification_type="site_deleted",
            severity="warning",
            site_id=None,
            project_id=site.project_id,
        )

    # =========================================================
    # SITE GIS ENRICHMENT FAILURE
    # =========================================================

    def site_enrichment_failed(
        self,
        site: Site | None,
        user_id: int,
    ):
        site_name = (
            site.name
            if site is not None
            else "Site"
        )

        site_id = (
            site.id
            if site is not None
            else None
        )

        project_id = (
            site.project_id
            if site is not None
            else None
        )

        return self._create(
            user_id=user_id,
            title="GIS Enrichment Failed",
            message=(
                f"GIS/environmental enrichment failed "
                f"for '{site_name}'."
            ),
            notification_type="gis_enrichment_failed",
            severity="critical",
            site_id=site_id,
            project_id=project_id,
        )

    # =========================================================
    # PROJECT CREATED
    # =========================================================

    def project_created(
        self,
        project: Project,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Project Created",
            message=(
                f"Project '{project.name}' was created successfully."
            ),
            notification_type="project_created",
            severity="info",
            project_id=project.id,
        )

    # =========================================================
    # PROJECT UPDATED
    # =========================================================

    def project_updated(
        self,
        project: Project,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Project Updated",
            message=(
                f"Project '{project.name}' was updated successfully."
            ),
            notification_type="project_updated",
            severity="info",
            project_id=project.id,
        )

    # =========================================================
    # PROJECT DELETED
    # =========================================================

    def project_deleted(
        self,
        project: Project,
        user_id: int,
    ):
        return self._create(
            user_id=user_id,
            title="Project Deleted",
            message=(
                f"Project '{project.name}' was deleted successfully."
            ),
            notification_type="project_deleted",
            severity="warning",
            project_id=None,
        )

    # =========================================================
    # INTERNAL CREATE
    # =========================================================

    def _create(
        self,
        *,
        user_id: int,
        title: str,
        message: str,
        notification_type: str,
        severity: str,
        site_id: int | None = None,
        project_id: int | None = None,
    ):
        from app.models.notification import Notification

        notification = Notification(
            title=title,
            message=message,
            notification_type=notification_type,
            severity=severity,
            user_id=user_id,
            site_id=site_id,
            project_id=project_id,
            is_read=False,
        )

        return self.repository.create(notification)