from app.prediction.models.prediction_input import (
    PredictionInput,
)
from app.prediction.services.prediction_service import (
    PredictionService,
)
from app.services.environmental_service import (
    EnvironmentalService,
)


class RenewableIntelligenceService:
    """
    Coordinates environmental analysis and renewable
    energy prediction.

    Acts as the orchestration layer between the
    Environmental Intelligence Engine and the
    Prediction Engine.
    """

    def __init__(
        self,
        environmental_service: EnvironmentalService,
        prediction_service: PredictionService,
    ):
        self.environmental_service = environmental_service
        self.prediction_service = prediction_service

    def analyze_site(
        self,
        site_id: int,
    ):
        """
        Generate a complete renewable intelligence report
        for a site.
        """

        environment = (
            self.environmental_service.get_site_environment(
                site_id,
            )
        )

        site = environment["site"]

        prediction_input = PredictionInput(
            latitude=site.latitude,
            longitude=site.longitude,
            weather=environment["weather"],
            solar=environment["solar"],
            gis=environment["gis"],
        )

        predictions = (
            self.prediction_service.predict(
                prediction_input,
            )
        )

        return {
            "site": {
                "id": site.id,
                "name": site.name,
                "latitude": site.latitude,
                "longitude": site.longitude,
            },
            "environment": environment["assessment"],
            "predictions": predictions,
        }

    def analyze_project(
        self,
        project_id: int,
    ):
        """
        Generate renewable intelligence reports
        for every site in a project.
        """

        project = (
            self.environmental_service.get_project_environment(
                project_id,
            )
        )

        results = []

        for item in project["sites"]:

            site = item["site"]

            prediction_input = PredictionInput(
                latitude=site.latitude,
                longitude=site.longitude,
                weather=item["weather"],
                solar=item["solar"],
                gis=item["gis"],
            )

            prediction = (
                self.prediction_service.predict(
                    prediction_input,
                )
            )

            results.append(
                {
                    "site": {
                        "id": site.id,
                        "name": site.name,
                    },
                    "environment": item["assessment"],
                    "prediction": prediction,
                }
            )

        return {
            "project_id": project["project_id"],
            "project_name": project["project_name"],
            "sites": results,
        }