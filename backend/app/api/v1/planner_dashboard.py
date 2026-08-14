from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.planner_dashboard import (
    PlannerDashboardResponse,
)

from app.services.planner_dashboard_service import (
    PlannerDashboardService,
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Planner Dashboard"],
)


@router.get(
    "/planner",
    response_model=PlannerDashboardResponse,
)
def get_planner_dashboard(

    db: Session = Depends(
        get_db
    ),

    current_user=Depends(
        require_roles(
            "Renewable Energy Planner",
            "Project Manager",
            "Admin",
        )
    ),

):

    service = PlannerDashboardService(
        db
    )

    return service.get_dashboard()