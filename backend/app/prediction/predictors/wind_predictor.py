from __future__ import annotations

from typing import Any

from ml_core.preprocessing.feature_preparation import prepare_prediction_record
from app.ml.inference.model_loader import MLModelLoader
from app.schemas.ml_prediction import (
    WindPredictionRequest,
    PredictionResponse,
)


class WindPredictor:
    """
    Wind ML inference adapter.

    Responsibilities:
        - accept the authoritative wind prediction request
        - construct the ML feature record
        - delegate inference to the ML model loader
        - return the model prediction

    This class MUST NOT:
        - call WindService
        - execute a turbine power curve
        - calculate heuristic capacity factors
        - calculate annual energy using formulas
        - provide an ML fallback
    """

    domain = "wind"

    def __init__(
        self,
        model_loader: MLModelLoader,
    ) -> None:
        self.model_loader = model_loader

    def predict(
        self,
        data: WindPredictionRequest,
    ) -> PredictionResponse:
        """
        Execute wind ML inference.
        """

        record: dict[str, Any] = {
            "latitude": data.latitude,
            "longitude": data.longitude,
            "wind_speed_m_s": data.wind_speed_m_s,
            "air_density_kg_m3": data.air_density_kg_m3,
            "temperature_c": data.temperature_c,
            "humidity_pct": data.humidity_pct,
            "pressure_hpa": data.pressure_hpa,
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