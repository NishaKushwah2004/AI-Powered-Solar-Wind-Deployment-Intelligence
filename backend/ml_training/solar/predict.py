"""
Solar model inference.

Run:

    python -m ml_training.solar.predict
"""

from __future__ import annotations

from pathlib import Path

import joblib
import pandas as pd

from ml_core.preprocessing.feature_preparation import (
    prepare_prediction_record,
)

from ml_training.solar.config import (
    MODEL_PATH,
    PREPROCESSOR_PATH,
)


def load_artifacts():
    """Load trained Solar model and preprocessor."""

    if not MODEL_PATH.exists():
        raise FileNotFoundError(
            f"Solar model not found: {MODEL_PATH}"
        )

    if not PREPROCESSOR_PATH.exists():
        raise FileNotFoundError(
            f"Solar preprocessor not found: "
            f"{PREPROCESSOR_PATH}"
        )

    model = joblib.load(
        MODEL_PATH
    )

    preprocessor = joblib.load(
        PREPROCESSOR_PATH
    )

    return model, preprocessor


def predict_solar(
    record: dict,
) -> float:
    """
    Generate Solar power prediction in MW.
    """

    model, preprocessor = load_artifacts()

    features = prepare_prediction_record(
        record,
        "solar",
    )

    processed = preprocessor.transform(
        features
    )

    prediction = model.predict(
        processed
    )[0]

    return float(prediction)


if __name__ == "__main__":

    sample = {
        "latitude": 13.34,
        "longitude": 77.10,
        "ghi": 5.2,
        "dni": 4.8,
        "dhi": 1.1,
        "gti": 5.5,
        "temperature_c": 28.0,
        "humidity_pct": 45.0,
        "cloud_cover_pct": 20.0,
        "pressure_hpa": 1008.0,
        "wind_speed_m_s": 4.5,
        "elevation_m": 890.0,
    }

    prediction = predict_solar(
        sample
    )

    print(
        f"Predicted Solar Generation: "
        f"{prediction:.4f} MW"
    )