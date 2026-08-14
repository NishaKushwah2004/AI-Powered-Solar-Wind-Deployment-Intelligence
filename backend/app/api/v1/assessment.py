from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import (
    get_environmental_service,
    get_prediction_service,
    get_site_repository,
    get_project_repository,
)

from app.auth.permissions import require_roles

from app.repositories.site_repository import (
    SiteRepository,
)
from app.repositories.project_repository import (
    ProjectRepository,
)

from app.prediction.services.prediction_service import (
    PredictionService,
)

from app.services.environmental_service import (
    EnvironmentalService,
)

from app.services.assessment_service import (
    build_assessment,
)

from app.schemas.unified_prediction import (
    RenewablePredictionRequest,
)


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


def _build_ml_assessment(
    prediction_request: RenewablePredictionRequest,
    prediction_service: PredictionService,
):
    """
    Build an assessment from the canonical renewable
    prediction request.

    Flow:

        RenewablePredictionRequest
                    ↓
            PredictionService
                    ↓
             Solar ML + Wind ML
                    ↓
             AssessmentService
    """

    return build_assessment(
        prediction_request,
        prediction_service,
    )


@router.post(
    "/report",
)
def create_resource_assessment_report(
    data: RenewablePredictionRequest,
    prediction_service: PredictionService = Depends(
        get_prediction_service,
    ),
    current_user=Depends(
        require_roles(*ALLOWED_ROLES)
    ),
):
    """
    Generate an assessment from renewable ML features.
    """

    try:
        return _build_ml_assessment(
            data,
            prediction_service,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Assessment failed: {exc}",
        ) from exc


@router.get(
    "/sites/{site_id}/report"
)
def get_site_resource_assessment_report(
    site_id: int,
    site_repository: SiteRepository = Depends(
        get_site_repository
    ),
    environmental_service: EnvironmentalService = Depends(
        get_environmental_service
    ),
    current_user=Depends(
        require_roles(*ALLOWED_ROLES)
    ),
):

    site = site_repository.get_by_id(
        site_id
    )

    if site is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Site not found.",
        )

    try:

        return _build_ml_assessment(
            site,
            environmental_service,
        )

    except Exception as exc:

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"ML assessment failed: {exc}",
        )


@router.get(
    "/projects/{project_id}/report"
)
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
    current_user=Depends(
        require_roles(*ALLOWED_ROLES)
    ),
):

    project = project_repository.get_by_id(
        project_id
    )

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    sites = site_repository.get_by_project(
        project_id
    )

    reports = []

    for site in sites:

        try:

            report = _build_ml_assessment(
                site,
                environmental_service,
            )

            reports.append(
                {
                    "site_id": site.id,
                    "site_name": site.site_name,
                    "assessment": report,
                }
            )

        except Exception as exc:

            reports.append(
                {
                    "site_id": site.id,
                    "site_name": site.site_name,
                    "error": str(exc),
                }
            )

    return {
        "project_id": project.id,
        "project_name": project.name,
        "reports": reports,
    }