from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.gis_analyst_dashboard import (
    GISAnalystDashboardResponse,
)

from app.services.gis_analyst_dashboard_service import (
    GISAnalystDashboardService,
)


router = APIRouter(
    prefix="/dashboard",
    tags=["GIS Analyst Dashboard"],
)


@router.get(
    "/gis-analyst",
    response_model=GISAnalystDashboardResponse,
)
def get_gis_analyst_dashboard(

    db: Session = Depends(
        get_db
    ),

    current_user=Depends(
        require_roles(
            "GIS Analyst",
            "Project Manager",
            "Admin",
        )
    ),

):

    service = (
        GISAnalystDashboardService(
            db
        )
    )

    return service.get_dashboard()