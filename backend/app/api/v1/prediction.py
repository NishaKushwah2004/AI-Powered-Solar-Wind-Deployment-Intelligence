from fastapi import APIRouter, Depends

from app.api.deps import get_renewable_intelligence_service
from app.auth.permissions import require_roles
from app.services.renewable_intelligence_service import (
    RenewableIntelligenceService,
)

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


@router.get(
    "/sites/{site_id}",
    summary="Predict renewable energy potential for a site",
)
def predict_site(
    site_id: int,
    service: RenewableIntelligenceService = Depends(
        get_renewable_intelligence_service,
    ),
    current_user=Depends(
        require_roles(
            "Admin",
            "GIS Analyst",
            "Project Manager",
            "Renewable Energy Planner",
        )
    ),
):
    """
    Generate a complete renewable intelligence report
    for a single site.
    """

    return service.analyze_site(site_id)


@router.get(
    "/projects/{project_id}",
    summary="Predict renewable energy potential for all sites in a project",
)
def predict_project(
    project_id: int,
    service: RenewableIntelligenceService = Depends(
        get_renewable_intelligence_service,
    ),
    current_user=Depends(
        require_roles(
            "Admin",
            "GIS Analyst",
            "Project Manager",
            "Renewable Energy Planner",
        )
    ),
):
    """
    Generate renewable intelligence reports
    for every site in a project.
    """

    return service.analyze_project(project_id)


@router.get(
    "/health",
    summary="Prediction engine health check",
)
def prediction_health():
    """
    Verify that the prediction engine
    is available.
    """

    return {
        "status": "healthy",
        "service": "Prediction Engine",
    }