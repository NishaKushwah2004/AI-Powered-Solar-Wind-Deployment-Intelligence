from abc import ABC, abstractmethod


class BasePredictor(ABC):
    """
    Base class for all renewable energy predictors.
    """

    @abstractmethod
    def predict(self, features):
        """
        Generate prediction from engineered features.
        """
        pass