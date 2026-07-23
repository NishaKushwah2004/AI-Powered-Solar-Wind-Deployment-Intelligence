from pydantic import BaseModel, Field


class PredictionResult(BaseModel):
    """
    Generic prediction response.
    """

    prediction: float = Field(
        ...,
        description="Predicted value."
    )

    confidence: float = Field(
        ...,
        ge=0,
        le=1,
        description="Prediction confidence."
    )

    model_name: str = Field(
        ...,
        description="ML model used."
    )