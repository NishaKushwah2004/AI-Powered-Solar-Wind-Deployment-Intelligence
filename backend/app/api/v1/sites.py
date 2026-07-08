from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.auth.dependencies import get_current_user
from app.auth.permissions import require_roles
from app.models.user import User
from app.repositories.project_repository import ProjectRepository
from app.repositories.site_repository import SiteRepository
from app.schemas.site import (
    SiteCreate,
    SiteUpdate,
    SiteResponse,
)
from app.services.site_service import SiteService

router = APIRouter(
    prefix="/sites",
    tags=["Sites"],
)

@router.post(
    "",
    response_model=SiteResponse,
)
def create_site(
    site_data: SiteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "Admin",
            "Project Manager",
        )
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.create_site(site_data)

@router.get(
    "",
    response_model=list[SiteResponse],
)
def get_all_sites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.get_all_sites()

@router.get(
    "/{site_id}",
    response_model=SiteResponse,
)
def get_site(
    site_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.get_site_by_id(site_id)

@router.get(
    "/project/{project_id}",
    response_model=list[SiteResponse],
)
def get_sites_by_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.get_sites_by_project(project_id)

@router.put(
    "/{site_id}",
    response_model=SiteResponse,
)
def update_site(
    site_id: int,
    site_data: SiteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(
            "Admin",
            "Project Manager",
        )
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.update_site(
        site_id,
        site_data,
    )

@router.delete("/{site_id}")
def delete_site(
    site_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles("Admin")
    ),
):
    site_repository = SiteRepository(db)
    project_repository = ProjectRepository(db)

    service = SiteService(
        site_repository=site_repository,
        project_repository=project_repository,
    )

    return service.delete_site(site_id)