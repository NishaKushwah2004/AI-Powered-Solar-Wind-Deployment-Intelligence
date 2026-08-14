from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal

from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository

from app.environmental.clients.nasa_power_client import (
    NASAPowerClient,
)
from app.environmental.clients.weather_client import (
    WeatherClient,
)

from app.environmental.services.resource_assessment_service import (
    ResourceAssessmentService,
)
from app.core.config import settings
from app.services.environmental_service import (
    EnvironmentalService,
)
from app.services.gis_enrichment_service import (
    GISEnrichmentService,
)
from app.services.gis_service import (
    GISService,
)
from app.services.renewable_intelligence_service import (
    RenewableIntelligenceService,
)
from app.services.solar_service import (
    SolarService,
)
from app.services.wind_service import (
    WindService,
)

from functools import lru_cache

from app.prediction.predictors.solar_predictor import (
    SolarPredictor,
)

from app.prediction.predictors.wind_predictor import (
    WindPredictor,
)

from app.prediction.services.prediction_service import (
    PredictionService,
)
from app.ml.inference.model_loader import MLModelLoader

from app.core.config import settings

# ---------------------------------------------------------
# Database
# ---------------------------------------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ---------------------------------------------------------
# Repositories
# ---------------------------------------------------------

def get_site_repository(
    db: Session = Depends(get_db),
) -> SiteRepository:

    return SiteRepository(db)


def get_project_repository(
    db: Session = Depends(get_db),
) -> ProjectRepository:

    return ProjectRepository(db)


# ---------------------------------------------------------
# Core Services
# ---------------------------------------------------------

def get_gis_service(
    site_repository: SiteRepository = Depends(
        get_site_repository,
    ),
    project_repository: ProjectRepository = Depends(
        get_project_repository,
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


# ---------------------------------------------------------
# Assessment Service
# ---------------------------------------------------------

def get_resource_assessment_service(
    solar_service: SolarService = Depends(
        get_solar_service,
    ),
    wind_service: WindService = Depends(
        get_wind_service,
    ),
) -> ResourceAssessmentService:

    return ResourceAssessmentService(
        solar_service=solar_service,
        wind_service=wind_service,
    )


# ---------------------------------------------------------
# Environmental Service
# ---------------------------------------------------------

def get_environmental_service(
    site_repository: SiteRepository = Depends(
        get_site_repository,
    ),
    project_repository: ProjectRepository = Depends(
        get_project_repository,
    ),
    assessment_service: ResourceAssessmentService = Depends(
        get_resource_assessment_service,
    ),
    gis_enrichment_service: GISEnrichmentService = Depends(
        get_gis_enrichment_service,
    ),
) -> EnvironmentalService:

    return EnvironmentalService(
        site_repository=site_repository,
        project_repository=project_repository,
        weather_client=WeatherClient(),
        nasa_client=NASAPowerClient(),
        resource_assessment_service=assessment_service,
        gis_enrichment_service=gis_enrichment_service,
    )


# ---------------------------------------------------------
# Prediction / ML
# ---------------------------------------------------------

@lru_cache
def get_solar_model() -> MLModelLoader:
    """
    Load the solar ML model once.

    No heuristic fallback exists.
    """

    return MLModelLoader(
        domain="solar",
        version=settings.SOLAR_ML_MODEL_VERSION,
    )


@lru_cache
def get_wind_model() -> MLModelLoader:
    """
    Load the wind ML model once.

    No heuristic fallback exists.
    """

    return MLModelLoader(
        domain="wind",
        version=settings.WIND_ML_MODEL_VERSION,
    )


@lru_cache
def get_prediction_service() -> PredictionService:
    """
    Construct the single prediction orchestration service.

    API
      ↓
    PredictionService
      ↓
    SolarPredictor / WindPredictor
      ↓
    ML model
    """

    solar_predictor = SolarPredictor(
        model_loader=get_solar_model(),
    )

    wind_predictor = WindPredictor(
        model_loader=get_wind_model(),
    )

    return PredictionService(
        solar_predictor=solar_predictor,
        wind_predictor=wind_predictor,
    )
# ---------------------------------------------------------
# Renewable Intelligence Service
# ---------------------------------------------------------

def get_renewable_intelligence_service(
    environmental_service: EnvironmentalService = Depends(
        get_environmental_service,
    ),
    prediction_service: PredictionService = Depends(
        get_prediction_service,
    ),
) -> RenewableIntelligenceService:

    return RenewableIntelligenceService(
        environmental_service=environmental_service,
        prediction_service=prediction_service,
    )
