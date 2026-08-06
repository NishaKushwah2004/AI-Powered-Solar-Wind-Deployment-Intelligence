from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import (
    get_environmental_service,
    get_project_repository,
    get_resource_assessment_service,
    get_site_repository,
)

from app.auth.permissions import require_roles

from app.environmental.models.resource_assessment_report import (
    ResourceAssessmentReport,
)
from app.environmental.services.resource_assessment_service import (
    ResourceAssessmentService,
)
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository
from app.services.environmental_service import EnvironmentalService

router = APIRouter(
    prefix="/assessment",
    tags=["Resource Assessment"],
)

ALLOWED_ROLES = (
    "Admin",
    "GIS Analyst",
    "Project Manager",
    "Renewable Energy Planner",
)


def _build_site_report(
    site,
    environmental_service: EnvironmentalService,
    resource_assessment_service: ResourceAssessmentService,
) -> ResourceAssessmentReport:
    """
    Shared helper: assembles a full resource assessment
    report for a single site by combining the Environmental
    Data Engine, GIS Processing, and Solar/Wind Prediction
    Engines.
    """

    environment = environmental_service.get_environmental_data(
        site.latitude,
        site.longitude,
    )

    return resource_assessment_service.generate_report(
        site=site,
        weather=environment["weather"],
        solar=environment["solar"],
        gis=environment["gis"],
        resource_metrics=environment["assessment"],
    )


@router.get(
    "/sites/{site_id}/report",
    response_model=ResourceAssessmentReport,
)
def get_site_resource_assessment_report(
    site_id: int,
    site_repository: SiteRepository = Depends(
        get_site_repository
    ),
    environmental_service: EnvironmentalService = Depends(
        get_environmental_service
    ),
    resource_assessment_service: ResourceAssessmentService = Depends(
        get_resource_assessment_service
    ),
    current_user=Depends(require_roles(*ALLOWED_ROLES)),
):
    site = site_repository.get_by_id(site_id)

    if site is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Site not found.",
        )

    return _build_site_report(
        site,
        environmental_service,
        resource_assessment_service,
    )


@router.get("/projects/{project_id}/report")
def get_project_resource_assessment_report(
    project_id: int,
    project_repository: ProjectRepository = Depends(
        get_project_repository
    ),
    site_repository: SiteRepository = Depends(
        get_site_repository
    ),
    environmental_service: EnvironmentalService = Depends(
        get_environmental_service
    ),
    resource_assessment_service: ResourceAssessmentService = Depends(
        get_resource_assessment_service
    ),
    current_user=Depends(require_roles(*ALLOWED_ROLES)),
):
    project = project_repository.get_by_id(project_id)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    sites = site_repository.get_by_project(project_id)

    reports = [
        _build_site_report(
            site,
            environmental_service,
            resource_assessment_service,
        )
        for site in sites
    ]

    return {
        "project_id": project.id,
        "project_name": project.name,
        "reports": reports,
    }