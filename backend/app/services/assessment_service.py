from __future__ import annotations

from app.prediction.services.prediction_service import (
    PredictionService,
)

from app.schemas.unified_prediction import (
    RenewablePredictionRequest,
)


def calculate_suitability_score(
    solar_generation_mw: float,
    wind_generation_mw: float,
) -> float:
    """
    Calculate the current assessment score from
    the ML-generated renewable output.

    This is assessment/business logic.
    It is NOT an ML prediction.
    """

    total_generation_mw = (
        solar_generation_mw
        + wind_generation_mw
    )

    if total_generation_mw <= 0:
        return 0.0

    score = min(
        100.0,
        total_generation_mw * 100.0,
    )

    return round(
        score,
        2,
    )


def determine_resource(
    solar_generation_mw: float,
    wind_generation_mw: float,
) -> str:
    """
    Determine the dominant renewable resource.

    This is a deterministic assessment rule,
    not an ML prediction.
    """

    if (
        solar_generation_mw <= 0
        and wind_generation_mw <= 0
    ):
        return "Not Recommended"

    if solar_generation_mw > (
        wind_generation_mw * 1.20
    ):
        return "Solar"

    if wind_generation_mw > (
        solar_generation_mw * 1.20
    ):
        return "Wind"

    return "Hybrid"


def build_assessment(
    data: RenewablePredictionRequest,
    prediction_service: PredictionService,
) -> dict:
    """
    Build a renewable resource assessment.

    Flow:

        RenewablePredictionRequest
                    ↓
            PredictionService
                    ↓
             Solar ML + Wind ML
                    ↓
             ML prediction result
                    ↓
             Assessment rules
    """

    prediction = (
        prediction_service.predict_renewable(
            data,
        )
    )

    solar = prediction.solar_generation_mw
    wind = prediction.wind_generation_mw

    score = calculate_suitability_score(
        solar,
        wind,
    )

    resource = determine_resource(
        solar,
        wind,
    )

    if score >= 70:
        assessment = "Highly Suitable"

    elif score >= 40:
        assessment = "Moderately Suitable"

    elif score > 0:
        assessment = "Low Suitability"

    else:
        assessment = "Not Suitable"

    return {
        "latitude": prediction.latitude,
        "longitude": prediction.longitude,
        "solar_generation_mw": solar,
        "wind_generation_mw": wind,
        "total_generation_mw": (
            prediction.total_generation_mw
        ),
        "model_version": (
            prediction.model_version
        ),
        "data_source": (
            prediction.data_source
        ),
        "recommended_resource": resource,
        "suitability_score": score,
        "assessment": assessment,
    }