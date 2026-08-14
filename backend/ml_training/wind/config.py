"""
Wind ML training configuration.
"""

from pathlib import Path

from ml_core.contracts.feature_contracts import (
    WIND_FEATURES,
    WIND_TARGET,
    WIND_SCHEMA_VERSION,
)


BASE_DIR = Path(__file__).resolve().parents[1]


DATASET_PATH = (
    BASE_DIR
    / "datasets"
    / "wind"
    / "raw"
    / "wind_reference_dataset_v2.csv"
)


ARTIFACT_DIR = (
    BASE_DIR
    / "artifacts"
    / "wind"
)


MODEL_DIR = ARTIFACT_DIR / "model"
PREPROCESSING_DIR = ARTIFACT_DIR / "preprocessing"
METADATA_DIR = ARTIFACT_DIR / "metadata"
EVALUATION_DIR = ARTIFACT_DIR / "evaluation"


MODEL_PATH = (
    MODEL_DIR
    / "wind_generation_model.joblib"
)


PREPROCESSOR_PATH = (
    PREPROCESSING_DIR
    / "wind_preprocessor.joblib"
)


METADATA_PATH = (
    METADATA_DIR
    / "metadata.json"
)


METRICS_PATH = (
    EVALUATION_DIR
    / "metrics.json"
)


FEATURES = WIND_FEATURES
TARGET = WIND_TARGET
SCHEMA_VERSION = WIND_SCHEMA_VERSION


TEST_SIZE = 0.20
RANDOM_STATE = 42


MODEL_PARAMS = {
    "n_estimators": 300,
    "max_depth": None,
    "min_samples_split": 2,
    "min_samples_leaf": 1,
    "random_state": RANDOM_STATE,
    "n_jobs": -1,
}