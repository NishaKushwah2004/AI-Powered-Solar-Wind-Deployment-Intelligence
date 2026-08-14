"""
Dataset validation utilities for Solar and Wind ML training.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd

from ml_core.contracts.feature_contracts import (
    FEATURE_RANGES,
    TARGET_RANGES,
    get_features,
    get_target,
)


class DatasetValidationError(ValueError):
    """Raised when a training dataset violates the ML contract."""


def load_dataset(path: str | Path) -> pd.DataFrame:
    """
    Load a CSV dataset.
    """

    path = Path(path)

    if not path.exists():
        raise FileNotFoundError(
            f"Dataset not found: {path}"
        )

    if path.suffix.lower() != ".csv":
        raise DatasetValidationError(
            f"Expected CSV dataset, got: {path.suffix}"
        )

    dataframe = pd.read_csv(path)

    if dataframe.empty:
        raise DatasetValidationError(
            f"Dataset is empty: {path}"
        )

    return dataframe


def validate_columns(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """
    Validate required feature and target columns.
    """

    features = get_features(domain)
    target = get_target(domain)

    required_columns = [*features, target]

    missing = [
        column
        for column in required_columns
        if column not in dataframe.columns
    ]

    if missing:
        raise DatasetValidationError(
            f"{domain.capitalize()} dataset is missing "
            f"required columns: {missing}"
        )


def validate_numeric_columns(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """
    Ensure all ML features and target are numeric.
    """

    columns = [
        *get_features(domain),
        get_target(domain),
    ]

    invalid_columns: list[str] = []

    for column in columns:
        converted = pd.to_numeric(
            dataframe[column],
            errors="coerce",
        )

        if converted.isna().any():
            invalid_columns.append(column)

    if invalid_columns:
        raise DatasetValidationError(
            f"Non-numeric or invalid values found in "
            f"{domain} columns: {invalid_columns}"
        )


def validate_missing_values(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """
    Check missing values in required model columns.

    Missing values are currently treated as a validation failure
    so that preprocessing does not silently hide dataset problems.
    """

    columns = [
        *get_features(domain),
        get_target(domain),
    ]

    missing_counts = dataframe[columns].isna().sum()

    missing = {
        column: int(count)
        for column, count in missing_counts.items()
        if count > 0
    }

    if missing:
        raise DatasetValidationError(
            f"Missing values found in {domain} dataset: {missing}"
        )


def validate_ranges(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """
    Validate known physical/numerical ranges.
    """

    columns = get_features(domain)

    for column in columns:

        if column not in FEATURE_RANGES:
            continue

        minimum, maximum = FEATURE_RANGES[column]

        values = pd.to_numeric(
            dataframe[column],
            errors="coerce",
        )

        invalid_mask = (
            (values < minimum)
            | (values > maximum)
        )

        invalid_count = int(invalid_mask.sum())

        if invalid_count:
            raise DatasetValidationError(
                f"{domain} feature '{column}' contains "
                f"{invalid_count} values outside the valid range "
                f"[{minimum}, {maximum}]."
            )

    target = get_target(domain)

    if target in TARGET_RANGES:
        minimum, maximum = TARGET_RANGES[target]

        values = pd.to_numeric(
            dataframe[target],
            errors="coerce",
        )

        invalid_mask = (
            (values < minimum)
            | (values > maximum)
        )

        invalid_count = int(invalid_mask.sum())

        if invalid_count:
            raise DatasetValidationError(
                f"{domain} target '{target}' contains "
                f"{invalid_count} values outside the valid range "
                f"[{minimum}, {maximum}]."
            )


def validate_target_variance(
    dataframe: pd.DataFrame,
    domain: str,
) -> None:
    """
    Ensure the target contains meaningful variation.
    """

    target = get_target(domain)

    if dataframe[target].nunique() < 2:
        raise DatasetValidationError(
            f"{domain} target '{target}' has fewer than "
            f"2 unique values."
        )

    if float(dataframe[target].std()) == 0.0:
        raise DatasetValidationError(
            f"{domain} target '{target}' has zero variance."
        )


def validate_dataset(
    dataframe: pd.DataFrame,
    domain: str,
) -> dict:
    """
    Run the complete Phase 1 validation pipeline.
    """

    domain = domain.lower().strip()

    validate_columns(
        dataframe,
        domain,
    )

    validate_numeric_columns(
        dataframe,
        domain,
    )

    validate_missing_values(
        dataframe,
        domain,
    )

    validate_ranges(
        dataframe,
        domain,
    )

    validate_target_variance(
        dataframe,
        domain,
    )

    return {
        "valid": True,
        "domain": domain,
        "rows": len(dataframe),
        "features": len(get_features(domain)),
        "feature_names": get_features(domain),
        "target": get_target(domain),
        "missing_values": int(
            dataframe[
                [*get_features(domain), get_target(domain)]
            ]
            .isna()
            .sum()
            .sum()
        ),
    }


def validate_dataset_file(
    path: str | Path,
    domain: str,
) -> dict:
    """
    Load and validate a dataset file.
    """

    dataframe = load_dataset(path)

    return validate_dataset(
        dataframe,
        domain,
    )


def print_validation_report(
    report: dict,
) -> None:
    """
    Print a compact validation report.
    """

    print("=" * 60)
    print(
        f"{report['domain'].upper()} DATASET VALIDATION"
    )
    print("=" * 60)

    print(f"Status: {'PASS' if report['valid'] else 'FAIL'}")
    print(f"Rows: {report['rows']}")
    print(f"Features: {report['features']}")
    print(f"Target: {report['target']}")
    print(
        f"Missing values: {report['missing_values']}"
    )

    print("\nFeatures:")

    for feature in report["feature_names"]:
        print(f"  - {feature}")

    print("=" * 60)