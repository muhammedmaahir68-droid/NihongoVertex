from pydantic_settings import BaseSettings, SettingsConfigDict


def async_postgres_url(url: str) -> str:
    """Accept managed-Postgres URLs (including Neon) in asyncpg safely."""
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
    # asyncpg uses `ssl`, while provider snippets commonly use libpq's `sslmode`.
    url = url.replace("sslmode=require", "ssl=require")
    url = url.replace("?channel_binding=require&", "?")
    url = url.replace("&channel_binding=require", "")
    return url

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://nihongo:nihongo@postgres:5432/nihongo"
    redis_url: str = "redis://redis:6379/0"
    jwt_secret: str = "change-me"
    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
settings.database_url = async_postgres_url(settings.database_url)
