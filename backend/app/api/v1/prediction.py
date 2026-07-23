from fastapi import APIRouter, Depends

from app.api.deps import get_renewable_intelligence_service
from app.auth.permissions import require_roles
from app.services.renewable_intelligence_service import RenewableIntelligenceService

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


@router.get("/sites/{site_id}")
def predict_site(
    site_id: int,
    service: RenewableIntelligenceService = Depends(
        get_renewable_intelligence_service
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
    return service.analyze_site(site_id)