"""
Validate Solar and Wind reference datasets.

Run from backend root:

    python -m ml_training.validate_datasets
"""

from pathlib import Path

from ml_training.common.validation import (
    print_validation_report,
    validate_dataset_file,
)


BASE_DIR = Path(__file__).resolve().parent

SOLAR_DATASET = (
    BASE_DIR
    / "datasets"
    / "solar"
    / "raw"
    / "solar_reference_dataset_v2.csv"
)

WIND_DATASET = (
    BASE_DIR
    / "datasets"
    / "wind"
    / "raw"
    / "wind_reference_dataset_v2.csv"
)


def main() -> None:

    print("\nValidating Solar dataset...\n")

    solar_report = validate_dataset_file(
        SOLAR_DATASET,
        "solar",
    )

    print_validation_report(
        solar_report
    )

    print("\nValidating Wind dataset...\n")

    wind_report = validate_dataset_file(
        WIND_DATASET,
        "wind",
    )

    print_validation_report(
        wind_report
    )

    print("\nAll datasets passed validation.")


if __name__ == "__main__":
    main()