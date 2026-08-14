"""
Wind ML training pipeline.

Run from backend root:

    python -m ml_training.wind.train
"""

from __future__ import annotations

import json
from datetime import datetime, timezone

import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

from ml_core.preprocessing import (
    NumericImputer,
    NumericScaler,
    PreprocessingPipeline,
)

from ml_training.wind.config import (
    ARTIFACT_DIR,
    EVALUATION_DIR,
    FEATURES,
    METADATA_PATH,
    METRICS_PATH,
    MODEL_DIR,
    MODEL_PARAMS,
    MODEL_PATH,
    PREPROCESSING_DIR,
    PREPROCESSOR_PATH,
    RANDOM_STATE,
    SCHEMA_VERSION,
    TARGET,
    TEST_SIZE,
)

from ml_training.wind.data_loader import (
    load_wind_dataset,
    prepare_wind_training_data,
)

from ml_training.wind.evaluate import (
    evaluate_model,
    print_metrics,
    save_metrics,
)


def create_artifact_directories() -> None:
    """Create all Wind artifact directories."""

    for directory in [
        ARTIFACT_DIR,
        MODEL_DIR,
        PREPROCESSING_DIR,
        EVALUATION_DIR,
        METADATA_PATH.parent,
    ]:
        directory.mkdir(
            parents=True,
            exist_ok=True,
        )


def train() -> dict:
    """
    Complete Wind training pipeline.
    """

    print("\n" + "=" * 60)
    print("WIND ML TRAINING")
    print("=" * 60)

    create_artifact_directories()

    # ---------------------------------------------------------
    # 1. Load dataset
    # ---------------------------------------------------------

    print("\n[1/6] Loading dataset...")

    dataframe = load_wind_dataset()

    print(
        f"Loaded {len(dataframe)} rows."
    )

    # ---------------------------------------------------------
    # 2. Prepare X/y
    # ---------------------------------------------------------

    print(
        "\n[2/6] Preparing features and target..."
    )

    X, y = prepare_wind_training_data(
        dataframe
    )

    print(
        f"Features: {len(FEATURES)}"
    )

    print(
        f"Target: {TARGET}"
    )

    # ---------------------------------------------------------
    # 3. Train/test split
    # ---------------------------------------------------------

    print(
        "\n[3/6] Splitting dataset..."
    )

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
    )

    print(
        f"Training rows: {len(X_train)}"
    )

    print(
        f"Testing rows: {len(X_test)}"
    )

    # ---------------------------------------------------------
    # 4. Preprocessing
    # ---------------------------------------------------------

    print(
        "\n[4/6] Fitting preprocessing pipeline..."
    )

    preprocessor = PreprocessingPipeline(
        use_scaler=True
    )

    X_train_processed = (
        preprocessor.fit_transform(
            X_train
        )
    )

    X_test_processed = (
        preprocessor.transform(
            X_test
        )
    )

    # ---------------------------------------------------------
    # 5. Train model
    # ---------------------------------------------------------

    print(
        "\n[5/6] Training Random Forest..."
    )

    model = RandomForestRegressor(
        **MODEL_PARAMS
    )

    model.fit(
        X_train_processed,
        y_train,
    )

    # ---------------------------------------------------------
    # 6. Evaluate
    # ---------------------------------------------------------

    print(
        "\n[6/6] Evaluating model..."
    )

    metrics = evaluate_model(
        model,
        X_test_processed,
        y_test,
    )

    print_metrics(
        metrics
    )

    # ---------------------------------------------------------
    # Save model
    # ---------------------------------------------------------

    joblib.dump(
        model,
        MODEL_PATH,
    )

    print(
        f"\nModel saved:\n{MODEL_PATH}"
    )

    # ---------------------------------------------------------
    # Save preprocessor
    # ---------------------------------------------------------

    joblib.dump(
        preprocessor,
        PREPROCESSOR_PATH,
    )

    print(
        f"Preprocessor saved:\n"
        f"{PREPROCESSOR_PATH}"
    )

    # ---------------------------------------------------------
    # Save metrics
    # ---------------------------------------------------------

    save_metrics(
        metrics,
        METRICS_PATH,
    )

    # ---------------------------------------------------------
    # Save metadata
    # ---------------------------------------------------------

    metadata = {
        "domain": "wind",
        "schema_version": SCHEMA_VERSION,
        "model_type": "RandomForestRegressor",
        "model_version": "1.0.0",
        "features": FEATURES,
        "feature_count": len(FEATURES),
        "target": TARGET,
        "target_unit": "MW",
        "data_source": "synthetic_reference",
        "dataset_type": "reference",
        "training_rows": len(X_train),
        "testing_rows": len(X_test),
        "test_size": TEST_SIZE,
        "random_state": RANDOM_STATE,
        "metrics": metrics,
        "trained_at": datetime.now(
            timezone.utc
        ).isoformat(),
        "preprocessing": (
            preprocessor.get_metadata()
        ),
    }

    with METADATA_PATH.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            metadata,
            file,
            indent=2,
        )

    print(
        f"Metadata saved:\n"
        f"{METADATA_PATH}"
    )

    print(
        "\nWind training completed successfully."
    )

    return metrics


if __name__ == "__main__":
    train()