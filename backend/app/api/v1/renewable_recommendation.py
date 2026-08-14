from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.renewable_recommendation import (
    RenewableRecommendationResponse,
)

from app.services.renewable_recommendation_service import (
    RenewableRecommendationService,
)


router = APIRouter(
    prefix="/renewable-recommendation",
    tags=["Renewable Recommendation"],
)


@router.post(
    "/sites/{site_id}",
    response_model=RenewableRecommendationResponse,
)
def recommend_renewable_technology(
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

    service = RenewableRecommendationService(db)

    try:

        return service.recommend(
            site_id=site_id,
            intelligence=intelligence,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )