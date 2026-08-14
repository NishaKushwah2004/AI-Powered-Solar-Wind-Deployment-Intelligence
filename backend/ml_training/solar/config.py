"""
Solar ML training configuration.
"""

from pathlib import Path

from ml_core.contracts.feature_contracts import (
    SOLAR_FEATURES,
    SOLAR_TARGET,
    SOLAR_SCHEMA_VERSION,
)


BASE_DIR = Path(__file__).resolve().parents[1]


DATASET_PATH = (
    BASE_DIR
    / "datasets"
    / "solar"
    / "raw"
    / "solar_reference_dataset_v2.csv"
)


ARTIFACT_DIR = (
    BASE_DIR
    / "artifacts"
    / "solar"
)


MODEL_DIR = ARTIFACT_DIR / "model"
PREPROCESSING_DIR = ARTIFACT_DIR / "preprocessing"
METADATA_DIR = ARTIFACT_DIR / "metadata"
EVALUATION_DIR = ARTIFACT_DIR / "evaluation"


MODEL_PATH = (
    MODEL_DIR
    / "solar_generation_model.joblib"
)


PREPROCESSOR_PATH = (
    PREPROCESSING_DIR
    / "solar_preprocessor.joblib"
)


METADATA_PATH = (
    METADATA_DIR
    / "metadata.json"
)


METRICS_PATH = (
    EVALUATION_DIR
    / "metrics.json"
)


FEATURES = SOLAR_FEATURES
TARGET = SOLAR_TARGET
SCHEMA_VERSION = SOLAR_SCHEMA_VERSION


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