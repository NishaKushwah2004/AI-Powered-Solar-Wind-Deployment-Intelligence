from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import (
    get_environmental_service,
)

from app.auth.permissions import require_roles

from app.services.environmental_service import (
    EnvironmentalService,
)

router = APIRouter(
    prefix="/environment",
    tags=["Environmental"],
)


@router.get("/sites/{site_id}")
def get_site_environment(
    site_id: int,
    service: EnvironmentalService = Depends(
        get_environmental_service
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
    try:
        return service.get_site_environment(
            site_id
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get("/projects/{project_id}")
def get_project_environment(
    project_id: int,
    service: EnvironmentalService = Depends(
        get_environmental_service
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
    try:
        return service.get_project_environment(
            project_id
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )