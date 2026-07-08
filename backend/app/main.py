from fastapi import FastAPI
from app.core.config import settings


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
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

    return app


app = create_application()