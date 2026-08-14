from __future__ import annotations

from app.prediction.predictors.solar_predictor import (
    SolarPredictor,
)
from app.prediction.predictors.wind_predictor import (
    WindPredictor,
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


class PredictionService:
    """
    Single orchestration layer for renewable prediction.

    Architecture:

        API
          ↓
        PredictionService
          ↓
        SolarPredictor / WindPredictor
          ↓
        MLModelLoader
          ↓
        trained ML model
    """

    def __init__(
        self,
        solar_predictor: SolarPredictor,
        wind_predictor: WindPredictor,
    ) -> None:

        self.solar_predictor = solar_predictor
        self.wind_predictor = wind_predictor

    # ------------------------------------------------------------------
    # Solar
    # ------------------------------------------------------------------

    def predict_solar(
        self,
        data: SolarPredictionRequest,
    ) -> PredictionResponse:
        """
        Delegate solar prediction to SolarPredictor.
        """

        return self.solar_predictor.predict(data)

    # ------------------------------------------------------------------
    # Wind
    # ------------------------------------------------------------------

    def predict_wind(
        self,
        data: WindPredictionRequest,
    ) -> PredictionResponse:
        """
        Delegate wind prediction to WindPredictor.
        """

        return self.wind_predictor.predict(data)

    # ------------------------------------------------------------------
    # Renewable / hybrid
    # ------------------------------------------------------------------

    def predict_renewable(
        self,
        data: RenewablePredictionRequest,
    ) -> RenewablePredictionResponse:
        """
        Execute both ML models and combine their outputs.

        No heuristic prediction is performed here.
        """

        solar_request = SolarPredictionRequest(
            latitude=data.latitude,
            longitude=data.longitude,
            ghi=data.ghi,
            dni=data.dni,
            dhi=data.dhi,
            gti=data.gti,
            temperature_c=data.temperature_c,
            humidity_pct=data.humidity_pct,
            cloud_cover_pct=data.cloud_cover_pct,
            pressure_hpa=data.pressure_hpa,
            wind_speed_m_s=data.wind_speed_m_s,
            elevation_m=data.elevation_m,
        )

        wind_request = WindPredictionRequest(
            latitude=data.latitude,
            longitude=data.longitude,
            wind_speed_m_s=data.wind_speed_m_s,
            air_density_kg_m3=data.air_density_kg_m3,
            temperature_c=data.temperature_c,
            humidity_pct=data.humidity_pct,
            pressure_hpa=data.pressure_hpa,
            elevation_m=data.elevation_m,
        )

        solar = self.predict_solar(
            solar_request
        )

        wind = self.predict_wind(
            wind_request
        )

        return RenewablePredictionResponse(
            latitude=data.latitude,
            longitude=data.longitude,
            solar_generation_mw=solar.prediction_mw,
            wind_generation_mw=wind.prediction_mw,
            total_generation_mw=(
                solar.prediction_mw
                + wind.prediction_mw
            ),
            model_version=(
                f"solar:{solar.model_version};"
                f"wind:{wind.model_version}"
            ),
            data_source=(
                f"solar:{solar.data_source};"
                f"wind:{wind.data_source}"
            ),
        )

    # Backward-compatible method name if existing callers use predict().
    def predict(
        self,
        data: RenewablePredictionRequest,
    ) -> RenewablePredictionResponse:
        return self.predict_renewable(data)