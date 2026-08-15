from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://nihongo:nihongo@postgres:5432/nihongo"
    redis_url: str = "redis://redis:6379/0"
    jwt_secret: str = "change-me"
    cors_origins: str = "http://localhost:5173"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
