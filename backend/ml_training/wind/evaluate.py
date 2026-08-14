"""
Wind model evaluation.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)


def evaluate_model(
    model: Any,
    X_test: pd.DataFrame,
    y_test: pd.Series,
) -> dict[str, float]:
    """
    Evaluate a regression model.
    """

    predictions = model.predict(
        X_test
    )

    mae = mean_absolute_error(
        y_test,
        predictions,
    )

    rmse = np.sqrt(
        mean_squared_error(
            y_test,
            predictions,
        )
    )

    r2 = r2_score(
        y_test,
        predictions,
    )

    return {
        "mae": float(mae),
        "rmse": float(rmse),
        "r2": float(r2),
    }


def save_metrics(
    metrics: dict[str, float],
    path: str | Path,
) -> None:
    """
    Save evaluation metrics as JSON.
    """

    import json

    path = Path(path)

    path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with path.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            metrics,
            file,
            indent=2,
        )


def print_metrics(
    metrics: dict[str, float],
) -> None:

    print("\nWind Model Evaluation")
    print("=" * 40)

    print(
        f"MAE : {metrics['mae']:.6f} MW"
    )

    print(
        f"RMSE: {metrics['rmse']:.6f} MW"
    )

    print(
        f"R²  : {metrics['r2']:.6f}"
    )

    print("=" * 40)