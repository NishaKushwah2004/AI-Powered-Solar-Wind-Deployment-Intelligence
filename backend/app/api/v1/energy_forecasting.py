from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session

from app.api.deps import get_db

from app.auth.permissions import require_roles

from app.schemas.energy_forecasting import (
    EnergyForecastResponse,
)

from app.services.energy_forecasting_service import (
    EnergyForecastingService,
)


router = APIRouter(
    prefix="/energy-forecasting",
    tags=["Energy Forecasting"],
)


@router.post(
    "/sites/{site_id}",
    response_model=EnergyForecastResponse,
)
def forecast_site_energy(
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

    service = EnergyForecastingService(db)

    try:

        return service.forecast(
            site_id=site_id,
            intelligence=intelligence,
        )

    except ValueError as exc:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )