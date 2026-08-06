from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.auth.dependencies import get_current_user
from app.auth.permissions import require_roles

from app.api.deps import get_gis_enrichment_service, get_gis_service

from app.gis.exceptions import GISException, InvalidCoordinatesError
from app.gis.models.gis_result import GISResult
from app.schemas.geojson import (
    Feature,
    FeatureCollection,
)
from app.schemas.map import MapConfigResponse

from app.services.gis_enrichment_service import GISEnrichmentService
from app.services.gis_service import GISService

router = APIRouter(
    prefix="/gis",
    tags=["GIS"],
)


@router.get(
    "/sites",
    response_model=FeatureCollection,
)
def get_all_sites(
    service: GISService = Depends(
        get_gis_service
    ),
    current_user=Depends(
        require_roles(
            "Admin",
            "GIS Analyst",
            "Project Manager",
            "Renewable Energy Planner",
        )
    ),
):
    return service.get_all_sites_geojson()


@router.get(
    "/sites/{site_id}",
    response_model=Feature,
)
def get_site(
    site_id: int,
    service: GISService = Depends(
        get_gis_service
    ),
    current_user=Depends(
        get_current_user
    ),
):
    try:
        return service.get_site_geojson(site_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get(
    "/projects/{project_id}/sites",
    response_model=FeatureCollection,
)
def get_project_sites(
    project_id: int,
    service: GISService = Depends(
        get_gis_service
    ),
    current_user=Depends(
        get_current_user
    ),
):
    try:
        return service.get_project_geojson(project_id)

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        )


@router.get("/bbox")
def get_bounding_box(
    service: GISService = Depends(
        get_gis_service
    ),
):
    return service.get_bounding_box()


@router.get("/summary")
def get_summary(
    service: GISService = Depends(
        get_gis_service
    ),
):
    return service.get_map_summary()


@router.get(
    "/config",
    response_model=MapConfigResponse,
)
def get_map_config(
    service: GISService = Depends(
        get_gis_service
    ),
    current_user=Depends(
        get_current_user
    ),
):
    return service.get_map_config()


@router.get(
    "/enrich",
    response_model=GISResult,
)
def enrich_coordinates(
    latitude: float = Query(
        ..., ge=-90, le=90
    ),
    longitude: float = Query(
        ..., ge=-180, le=180
    ),
    service: GISEnrichmentService = Depends(
        get_gis_enrichment_service
    ),
    current_user=Depends(
        require_roles(
            "Admin",
            "GIS Analyst",
            "Project Manager",
            "Renewable Energy Planner",
        )
    ),
):
    """
    Geographic Intelligence Engine: on-demand GIS enrichment
    for a candidate location (elevation, land slope,
    vegetation index, land use, and infrastructure/water/
    protected-area proximity) - used to evaluate a location
    before a Site is created.
    """

    try:
        return service.enrich_site(latitude, longitude)

    except InvalidCoordinatesError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        )

    except GISException as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=str(exc),
        )