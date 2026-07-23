class PredictionError(Exception):
    """Prediction failed."""


class ModelNotFoundError(PredictionError):
    """Model file not found."""


class FeatureEngineeringError(PredictionError):
    """Invalid feature vector."""