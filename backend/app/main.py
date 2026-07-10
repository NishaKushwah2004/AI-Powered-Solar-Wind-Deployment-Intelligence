from fastapi import FastAPI
from app.core.config import settings
from sqlalchemy import text
from app.db.database import engine
from app.api.v1 import api_router
from fastapi.middleware.cors import CORSMiddleware


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/", tags=["Health"])
    async def root():
        return {
            "message": "Welcome to the Solar & Wind Deployment Intelligence Platform",
            "version": settings.APP_VERSION,
        }

    @app.get("/health", tags=["Health"])
    async def health():
        return {
            "status": "healthy",
            "application": settings.APP_NAME,
        }
        
    app.include_router(
        api_router,
        prefix="/api/v1",
    )

    return app


app = create_application()