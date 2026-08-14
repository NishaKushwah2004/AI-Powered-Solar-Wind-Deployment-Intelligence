from fastapi import APIRouter, Depends

from app.api.deps import get_prediction_service

from app.prediction.services.prediction_service import (
    PredictionService,
)

from app.schemas.ml_prediction import (
    SolarPredictionRequest,
    WindPredictionRequest,
    PredictionResponse,
)

from app.schemas.unified_prediction import (
    RenewablePredictionRequest,
    RenewablePredictionResponse,
)


router = APIRouter(
    prefix="/prediction",
    tags=["Prediction"],
)


# ---------------------------------------------------------------------
# Solar Prediction
# ---------------------------------------------------------------------

@router.post(
    "/solar",
    response_model=PredictionResponse,
)
def predict_solar(
    data: SolarPredictionRequest,
    prediction_service: PredictionService = Depends(
        get_prediction_service,
    ),
) -> PredictionResponse:

    return prediction_service.predict_solar(
        data,
    )


# ---------------------------------------------------------------------
# Wind Prediction
# ---------------------------------------------------------------------

@router.post(
    "/wind",
    response_model=PredictionResponse,
)
def predict_wind(
    data: WindPredictionRequest,
    prediction_service: PredictionService = Depends(
        get_prediction_service,
    ),
) -> PredictionResponse:

    return prediction_service.predict_wind(
        data,
    )


# ---------------------------------------------------------------------
# Unified Renewable Prediction
# ---------------------------------------------------------------------

@router.post(
    "/renewable",
    response_model=RenewablePredictionResponse,
)
def predict_renewable(
    data: RenewablePredictionRequest,
    prediction_service: PredictionService = Depends(
        get_prediction_service,
    ),
) -> RenewablePredictionResponse:

    return prediction_service.predict_renewable(
        data,
    )