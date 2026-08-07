from app.prediction.models.hybrid_prediction import HybridPrediction
from app.prediction.models.solar_prediction import SolarPrediction
from app.prediction.models.wind_prediction import WindPrediction


class HybridPredictor:
    """
    Hybrid renewable energy predictor.
    """

    def predict(
        self,
        solar: SolarPrediction,
        wind: WindPrediction,
    ) -> HybridPrediction:

        total_energy = (
            solar.predicted_energy_output
            + wind.predicted_energy_output
        )

        if total_energy == 0:

            solar_share = 0

            wind_share = 0

        else:

            solar_share = (
                solar.predicted_energy_output
                / total_energy
            ) * 100

            wind_share = (
                wind.predicted_energy_output
                / total_energy
            ) * 100

        if (
            40 <= solar_share <= 60
        ):
            recommendation = (
                "Balanced Hybrid Configuration"
            )

        elif solar_share > wind_share:
            recommendation = (
                "Solar Dominant Hybrid"
            )

        else:
            recommendation = (
                "Wind Dominant Hybrid"
            )

        confidence = round(
            (
                solar.confidence
                + wind.confidence
            )
            / 2,
            2,
        )

        return HybridPrediction(
            solar_contribution=round(
                solar_share,
                2,
            ),
            wind_contribution=round(
                wind_share,
                2,
            ),
            total_expected_energy=round(
                total_energy,
                2,
            ),
            recommended_configuration=recommendation,
            confidence=confidence,
        )