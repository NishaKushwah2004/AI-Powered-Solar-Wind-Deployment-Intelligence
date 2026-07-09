from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.auth.permissions import require_roles
from app.api.deps import get_db
from app.schemas.geojson import Feature, FeatureCollection
from app.services.gis_service import GISService
from app.schemas.map import MapConfigResponse
from app.repositories.site_repository import SiteRepository
from app.repositories.project_repository import ProjectRepository

router = APIRouter(
    prefix="/gis",
    tags=["GIS"],
)


@router.get(
    "/sites",
    response_model=FeatureCollection,
)
def get_all_sites(
    db: Session = Depends(get_db),
    current_user=Depends(
        require_roles(
            "Admin",
            "GIS Analyst",
            "Project Manager",
            "Renewable Energy Planner",  
        )
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )
    return service.get_all_sites_geojson()


@router.get(
    "/sites/{site_id}",
    response_model=Feature,
)
def get_site(
    site_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )

    try:
        return service.get_site_geojson(site_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get(
    "/projects/{project_id}/sites",
    response_model=FeatureCollection,
)
def get_project_sites(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )

    try:
        return service.get_project_geojson(project_id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get("/bbox")
def get_bounding_box(
    db: Session = Depends(get_db),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )
    return service.get_bounding_box()


@router.get("/summary")
def get_summary(
    db: Session = Depends(get_db),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )
    return service.get_map_summary()

@router.get(
    "/config",
    response_model=MapConfigResponse,
)
def get_map_config(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = GISService(
        site_repository,
        project_repository,
    )
    return service.get_map_config()