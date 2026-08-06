from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    APP_NAME: str
    APP_VERSION: str

    DEBUG: bool

    HOST: str
    PORT: int

    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ----------------------------
    # Environmental & GIS Data Providers (Milestone 2)
    # ----------------------------

    OPENWEATHER_API_KEY: str = ""

    # Copernicus Sentinel Hub (used for vegetation index /
    # land-cover analysis). Optional: when unset the
    # SentinelClient degrades gracefully and the platform
    # continues to operate using NASA POWER + OSM + Elevation.
    SENTINEL_CLIENT_ID: str | None = None
    SENTINEL_CLIENT_SECRET: str | None = None

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()