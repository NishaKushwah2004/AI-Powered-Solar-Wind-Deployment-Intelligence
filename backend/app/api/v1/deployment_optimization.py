from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.deployment_optimization import (
    DeploymentOptimizationResponse,
)

from app.services.deployment_optimization_service import (
    DeploymentOptimizationService,
)


router = APIRouter(
    prefix="/deployment-optimization",
    tags=["Deployment Optimization"],
)


@router.post(
    "/sites/{site_id}",
    response_model=DeploymentOptimizationResponse,
)
def optimize_site_deployment(
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

    service = DeploymentOptimizationService(db)

    try:

        return service.optimize_site(
            site_id=site_id,
            intelligence=intelligence,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )