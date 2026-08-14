"""
Shared feature preparation for ML training and inference.
"""

from __future__ import annotations

from typing import Iterable

import pandas as pd

from ml_core.contracts.feature_contracts import (
    DEFAULTS,
    get_features,
    get_target,
)


def prepare_features(
    records: Iterable[dict] | pd.DataFrame,
    domain: str,
) -> pd.DataFrame:
    """
    Prepare model features using the authoritative feature contract.

    Guarantees:
        - required features exist
        - correct feature order
        - numeric conversion
        - default filling for missing values
    """

    features = get_features(domain)

    if isinstance(records, pd.DataFrame):
        frame = records.copy()
    else:
        frame = pd.DataFrame(records)

    for feature in features:
        if feature not in frame.columns:
            frame[feature] = DEFAULTS.get(feature, 0.0)

        frame[feature] = pd.to_numeric(
            frame[feature],
            errors="coerce",
        )

        frame[feature] = frame[feature].fillna(
            DEFAULTS.get(feature, 0.0)
        )

    return frame[features].copy()


def prepare_training_data(
    dataframe: pd.DataFrame,
    domain: str,
) -> tuple[pd.DataFrame, pd.Series]:
    """
    Split a validated dataset into model features and target.
    """

    features = get_features(domain)
    target = get_target(domain)

    missing_features = [
        column
        for column in features
        if column not in dataframe.columns
    ]

    if missing_features:
        raise ValueError(
            f"Missing required features for {domain}: "
            f"{missing_features}"
        )

    if target not in dataframe.columns:
        raise ValueError(
            f"Missing target '{target}' for {domain}."
        )

    X = prepare_features(dataframe, domain)

    y = pd.to_numeric(
        dataframe[target],
        errors="coerce",
    )

    if y.isna().any():
        raise ValueError(
            f"Target '{target}' contains invalid or missing values."
        )

    return X, y


def assert_feature_parity(
    frame: pd.DataFrame,
    domain: str,
) -> None:
    """
    Ensure dataframe columns exactly match the ML feature contract.
    """

    expected = get_features(domain)
    actual = list(frame.columns)

    if actual != expected:
        raise ValueError(
            f"Feature schema mismatch for '{domain}'. "
            f"Expected {expected}, got {actual}"
        )


def assert_target(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """Ensure the authoritative target exists."""

    target = get_target(domain)

    if target not in dataframe.columns:
        raise ValueError(
            f"Target schema mismatch for '{domain}'. "
            f"Expected target '{target}'."
        )


def prepare_prediction_record(
    record: dict,
    domain: str,
) -> pd.DataFrame:
    """
    Prepare a single online prediction record.
    """

    frame = prepare_features([record], domain)

    assert_feature_parity(frame, domain)

    return frame