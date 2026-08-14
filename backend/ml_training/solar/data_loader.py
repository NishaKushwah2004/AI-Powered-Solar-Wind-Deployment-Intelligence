"""
Solar dataset loading and preparation.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from ml_core.preprocessing.feature_preparation import (
    prepare_training_data,
)
from ml_training.common.validation import (
    validate_dataset,
)
from ml_training.solar.config import (
    DATASET_PATH,
    FEATURES,
    TARGET,
)


def load_solar_dataset(
    path: str | Path = DATASET_PATH,
) -> pd.DataFrame:
    """
    Load and validate the Solar dataset.
    """

    path = Path(path)

    if not path.exists():
        raise FileNotFoundError(
            f"Solar dataset not found: {path}"
        )

    dataframe = pd.read_csv(path)

    if dataframe.empty:
        raise ValueError(
            "Solar dataset is empty."
        )

    validate_dataset(
        dataframe,
        "solar",
    )

    return dataframe


def prepare_solar_training_data(
    dataframe: pd.DataFrame,
) -> tuple[pd.DataFrame, pd.Series]:
    """
    Prepare Solar features and target.
    """

    X, y = prepare_training_data(
        dataframe,
        "solar",
    )

    if list(X.columns) != FEATURES:
        raise ValueError(
            "Solar feature order does not match "
            "the authoritative feature contract."
        )

    if y.name != TARGET:
        y.name = TARGET

    return X, y


def get_dataset_summary(
    dataframe: pd.DataFrame,
) -> dict:
    """
    Return basic Solar dataset information.
    """

    return {
        "rows": len(dataframe),
        "features": len(FEATURES),
        "feature_names": FEATURES.copy(),
        "target": TARGET,
        "target_unique_values": int(
            dataframe[TARGET].nunique()
        ),
        "target_min": float(
            dataframe[TARGET].min()
        ),
        "target_max": float(
            dataframe[TARGET].max()
        ),
        "target_mean": float(
            dataframe[TARGET].mean()
        ),
    }