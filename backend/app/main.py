from fastapi import FastAPI
from app.core.config import settings
from sqlalchemy import text
from app.db.database import engine


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
    
    @app.get("/db-test")
    async def db_test():
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version();"))
            return {"database": result.scalar()}

    return app


app = create_application()