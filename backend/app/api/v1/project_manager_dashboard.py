from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.project_manager_dashboard import (
    ProjectManagerDashboardResponse,
)

from app.services.project_manager_dashboard_service import (
    ProjectManagerDashboardService,
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Project Manager Dashboard"],
)


@router.get(
    "/project-manager",
    response_model=ProjectManagerDashboardResponse,
)
def get_project_manager_dashboard(

    db: Session = Depends(
        get_db
    ),

    current_user=Depends(
        require_roles(
            "Project Manager",
            "Admin",
        )
    ),

):

    service = (
        ProjectManagerDashboardService(
            db
        )
    )

    return service.get_dashboard()