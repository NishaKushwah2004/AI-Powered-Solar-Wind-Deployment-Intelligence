from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.profile import router as profile_router
from app.api.v1.projects import router as project_router
from app.api.v1.sites import router as site_router
from app.api.v1.gis import router as gis_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(profile_router)
api_router.include_router(project_router)
api_router.include_router(site_router)
api_router.include_router(gis_router)