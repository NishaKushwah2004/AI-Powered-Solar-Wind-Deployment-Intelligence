from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.schemas.site_scoring import (
    SiteScoringResponse,
)

from app.services.site_scoring_service import (
    SiteScoringService,
)

from app.auth.permissions import require_roles


router = APIRouter(
    prefix="/site-scoring",
    tags=["Site Scoring"],
)


@router.post(
    "/sites/{site_id}",
    response_model=SiteScoringResponse,
)
def calculate_site_score(
    site_id: int,
    suitability_data: dict,
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

    service = SiteScoringService(db)

    try:

        return service.calculate_score(
            site_id=site_id,
            suitability_data=suitability_data,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )