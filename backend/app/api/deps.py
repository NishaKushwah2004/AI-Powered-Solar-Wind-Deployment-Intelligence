from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.repositories.site_repository import SiteRepository
from app.repositories.project_repository import ProjectRepository

from app.environmental.clients.weather_client import WeatherClient
from app.environmental.clients.nasa_power_client import NASAPowerClient

from app.services.gis_service import GISService
from app.services.environmental_service import EnvironmentalService
from app.services.solar_service import SolarService
from app.services.wind_service import WindService
from app.services.gis_enrichment_service import GISEnrichmentService
from app.environmental.services.resource_assessment_service import (
    ResourceAssessmentService,
)
from app.ml.features.feature_engineering import (
    FeatureEngineering,
)
from app.ml.models.solar_predictor import (
    SolarPredictor,
)
from app.ml.models.wind_predictor import (
    WindPredictor,
)
from app.ml.models.suitability_predictor import (
    SuitabilityPredictor,
)
from app.ml.services.prediction_service import (
    PredictionService,
)
from app.services.renewable_intelligence_service import (
    RenewableIntelligenceService,
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_site_repository(
    db: Session = Depends(get_db),
) -> SiteRepository:

    return SiteRepository(db)


def get_project_repository(
    db: Session = Depends(get_db),
) -> ProjectRepository:

    return ProjectRepository(db)


def get_gis_service(
    site_repository: SiteRepository = Depends(
        get_site_repository
    ),
    project_repository: ProjectRepository = Depends(
        get_project_repository
    ),
) -> GISService:

    return GISService(
        site_repository,
        project_repository,
    )


def get_gis_enrichment_service() -> GISEnrichmentService:

    return GISEnrichmentService()


def get_solar_service() -> SolarService:

    return SolarService()


def get_wind_service() -> WindService:

    return WindService()


def get_resource_assessment_service() -> ResourceAssessmentService:

    return ResourceAssessmentService()


def get_environmental_service(
    site_repository: SiteRepository = Depends(get_site_repository),
    project_repository: ProjectRepository = Depends(get_project_repository),
    solar_service: SolarService = Depends(get_solar_service),
    wind_service: WindService = Depends(get_wind_service),
    assessment_service: ResourceAssessmentService = Depends(
        get_resource_assessment_service
    ),
    gis_enrichment_service: GISEnrichmentService = Depends(
        get_gis_enrichment_service
    ),
) -> EnvironmentalService:

    return EnvironmentalService(
        site_repository=site_repository,
        project_repository=project_repository,
        weather_client=WeatherClient(),
        nasa_client=NASAPowerClient(),
        solar_service=solar_service,
        wind_service=wind_service,
        assessment_service=assessment_service,
        gis_enrichment_service=gis_enrichment_service,
    )


def get_resource_assessment_service(
    solar_service: SolarService = Depends(get_solar_service),
    wind_service: WindService = Depends(get_wind_service),
) -> ResourceAssessmentService:

    return ResourceAssessmentService(
        solar_service=solar_service,
        wind_service=wind_service,
    )


def get_prediction_service() -> PredictionService:
    return PredictionService(
        feature_engineering=FeatureEngineering(),
        solar_predictor=SolarPredictor(),
        wind_predictor=WindPredictor(),
        suitability_predictor=SuitabilityPredictor(),
    )

def get_renewable_intelligence_service(
    environmental_service: EnvironmentalService = Depends(
        get_environmental_service
    ),
    prediction_service: PredictionService = Depends(
        get_prediction_service
    ),
) -> RenewableIntelligenceService:

    return RenewableIntelligenceService(
        environmental_service=environmental_service,
        prediction_service=prediction_service,
    )