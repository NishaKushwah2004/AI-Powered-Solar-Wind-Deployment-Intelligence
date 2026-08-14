from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.suitability import SiteSuitabilityResponse
from app.services.site_suitability_service import (
    SiteSuitabilityService,
)

# Reuse your existing authentication / RBAC implementation.
from app.auth.permissions import require_roles


router = APIRouter(
    prefix="/suitability",
    tags=["Site Suitability"],
)


@router.post(
    "/sites/{site_id}/evaluate",
    response_model=SiteSuitabilityResponse,
)
def evaluate_site_suitability(
    site_id: int,
    intelligence: dict,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "Renewable Energy Planner",
            "GIS Analyst",
            "Project Manager",
            "Admin",
        )
    ),
):

    service = SiteSuitabilityService(db)

    try:
        return service.evaluate_site(
            site_id=site_id,
            intelligence=intelligence,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )