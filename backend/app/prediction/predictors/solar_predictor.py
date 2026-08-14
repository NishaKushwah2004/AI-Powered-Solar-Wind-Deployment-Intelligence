from __future__ import annotations

from typing import Any

from ml_core.preprocessing.feature_preparation import prepare_prediction_record
from app.ml.inference.model_loader import MLModelLoader
from app.schemas.ml_prediction import (
    SolarPredictionRequest,
    PredictionResponse,
)


class SolarPredictor:
    """
    Solar ML inference adapter.

    Responsibilities:
        - accept the authoritative solar prediction request
        - build the exact ML feature record
        - delegate inference to the ML model loader
        - return the model prediction

    This class MUST NOT:
        - call SolarService
        - calculate heuristic capacity factors
        - calculate panel efficiency
        - calculate shading
        - calculate energy using hard-coded formulas
        - provide an ML fallback
    """

    domain = "solar"

    def __init__(
        self,
        model_loader: MLModelLoader,
    ) -> None:
        self.model_loader = model_loader

    def predict(
        self,
        data: SolarPredictionRequest,
    ) -> PredictionResponse:
        """
        Execute solar ML inference.
        """

        record: dict[str, Any] = {
            "latitude": data.latitude,
            "longitude": data.longitude,
            "ghi": data.ghi,
            "dni": data.dni,
            "dhi": data.dhi,
            "gti": data.gti,
            "temperature_c": data.temperature_c,
            "humidity_pct": data.humidity_pct,
            "cloud_cover_pct": data.cloud_cover_pct,
            "pressure_hpa": data.pressure_hpa,
            "wind_speed_m_s": data.wind_speed_m_s,
            "elevation_m": data.elevation_m,
        }

        # Uses the authoritative feature contract and guarantees
        # the correct feature ordering.
        prepare_prediction_record(
            record,
            self.domain,
        )

        result = self.model_loader.predict(
            record,
            self.domain,
        )

        return PredictionResponse(
            domain=self.domain,
            prediction_mw=float(result["prediction"]),
            model_version=str(result["model_version"]),
            data_source=str(
                result.get(
                    "data_source",
                    "synthetic_reference",
                )
            ),
        )