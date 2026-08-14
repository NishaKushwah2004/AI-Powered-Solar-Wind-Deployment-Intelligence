from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.investment_recommendation import (
    InvestmentRecommendationResponse,
)

from app.services.investment_recommendation_service import (
    InvestmentRecommendationService,
)


router = APIRouter(
    prefix="/investment-recommendation",
    tags=["Investment Recommendation"],
)


@router.post(
    "/sites/{site_id}",
    response_model=InvestmentRecommendationResponse,
)
def evaluate_site_investment(
    site_id: int,
    intelligence: dict,
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "Renewable Energy Planner",
            "Project Manager",
            "Admin",
        )
    ),
):

    service = InvestmentRecommendationService(db)

    try:

        return service.evaluate_investment(
            site_id=site_id,
            intelligence=intelligence,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )