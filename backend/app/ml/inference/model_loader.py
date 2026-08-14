from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import joblib

from ml_core.contracts.feature_contracts import (
    get_features,
    get_schema_version,
    get_target,
    validate_domain,
)


BACKEND_DIR = Path(__file__).resolve().parents[3]

ML_ARTIFACTS_DIR = (
    BACKEND_DIR
    / "ml_training"
    / "artifacts"
)


@dataclass(frozen=True)
class MLArtifacts:
    """
    Complete set of artifacts required for ML inference.
    """

    domain: str
    model: Any
    preprocessor: Any
    metadata: dict[str, Any]


class MLModelLoader:
    """
    Loads and caches trained ML artifacts.

    Responsibilities:
        - Locate model artifacts.
        - Load trained model.
        - Load preprocessing pipeline.
        - Load metadata.
        - Validate artifact compatibility.
        - Cache loaded artifacts.

    This class does NOT:
        - Prepare features.
        - Fetch environmental data.
        - Calculate suitability.
        - Perform business logic.
        - Handle HTTP requests.
        - Calculate predictions directly.
    """

    _artifacts: dict[str, MLArtifacts] = {}

    @classmethod
    def _get_paths(
        cls,
        domain: str,
    ) -> tuple[Path, Path, Path]:

        validate_domain(domain)

        domain = domain.lower().strip()

        artifact_dir = (
            ML_ARTIFACTS_DIR
            / domain
        )

        model_path = (
            artifact_dir
            / "model"
            / f"{domain}_generation_model.joblib"
        )

        preprocessor_path = (
            artifact_dir
            / "preprocessing"
            / f"{domain}_preprocessor.joblib"
        )

        metadata_path = (
            artifact_dir
            / "metadata"
            / "metadata.json"
        )

        return (
            model_path,
            preprocessor_path,
            metadata_path,
        )

    @classmethod
    def _load_metadata(
        cls,
        metadata_path: Path,
    ) -> dict[str, Any]:

        if not metadata_path.exists():
            raise FileNotFoundError(
                f"ML metadata not found: "
                f"{metadata_path}"
            )

        try:
            with metadata_path.open(
                "r",
                encoding="utf-8",
            ) as file:
                metadata = json.load(file)

        except json.JSONDecodeError as exc:
            raise ValueError(
                f"Invalid ML metadata JSON: "
                f"{metadata_path}"
            ) from exc

        if not isinstance(metadata, dict):
            raise ValueError(
                f"ML metadata must be a JSON object: "
                f"{metadata_path}"
            )

        return metadata

    @classmethod
    def _validate_metadata(
        cls,
        domain: str,
        metadata: dict[str, Any],
    ) -> None:

        expected_features = get_features(domain)
        expected_target = get_target(domain)
        expected_schema = get_schema_version(domain)

        metadata_domain = metadata.get(
            "domain"
        )

        if metadata_domain != domain:
            raise ValueError(
                "ML artifact domain mismatch. "
                f"Expected '{domain}', "
                f"got '{metadata_domain}'."
            )

        metadata_schema = metadata.get(
            "schema_version"
        )

        if metadata_schema != expected_schema:
            raise ValueError(
                "ML schema version mismatch for "
                f"'{domain}'. "
                f"Expected '{expected_schema}', "
                f"got '{metadata_schema}'."
            )

        metadata_features = metadata.get(
            "features"
        )

        if metadata_features != expected_features:
            raise ValueError(
                "ML feature contract mismatch for "
                f"'{domain}'. "
                f"Expected {expected_features}, "
                f"got {metadata_features}."
            )

        metadata_target = metadata.get(
            "target"
        )

        if metadata_target != expected_target:
            raise ValueError(
                "ML target mismatch for "
                f"'{domain}'. "
                f"Expected '{expected_target}', "
                f"got '{metadata_target}'."
            )

    @classmethod
    def load(
        cls,
        domain: str,
    ) -> MLArtifacts:

        validate_domain(domain)

        domain = domain.lower().strip()

        if domain in cls._artifacts:
            return cls._artifacts[domain]

        (
            model_path,
            preprocessor_path,
            metadata_path,
        ) = cls._get_paths(domain)

        if not model_path.exists():
            raise FileNotFoundError(
                f"{domain.capitalize()} model not found: "
                f"{model_path}"
            )

        if not preprocessor_path.exists():
            raise FileNotFoundError(
                f"{domain.capitalize()} preprocessor not found: "
                f"{preprocessor_path}"
            )

        metadata = cls._load_metadata(
            metadata_path
        )

        cls._validate_metadata(
            domain,
            metadata,
        )

        try:
            model = joblib.load(
                model_path
            )

            preprocessor = joblib.load(
                preprocessor_path
            )

        except Exception as exc:
            raise RuntimeError(
                f"Failed to load {domain} ML artifacts."
            ) from exc

        artifacts = MLArtifacts(
            domain=domain,
            model=model,
            preprocessor=preprocessor,
            metadata=metadata,
        )

        cls._artifacts[domain] = artifacts

        return artifacts

    @classmethod
    def preload(cls) -> None:
        """
        Load all production ML artifacts.
        """

        cls.load("solar")
        cls.load("wind")

    @classmethod
    def clear_cache(cls) -> None:
        """
        Clear cached ML artifacts.

        Primarily useful for tests and
        controlled model reloads.
        """

        cls._artifacts.clear()