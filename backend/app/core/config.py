import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./nihongo.db")
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    jwt_secret: str = os.getenv("JWT_SECRET", "nihongo-vertex-dev-secret-key-2026")
    cors_origins: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000")

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def __init__(self, **values):
        super().__init__(**values)
        if self.database_url.startswith("postgres://"):
            self.database_url = self.database_url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif self.database_url.startswith("postgresql://") and not self.database_url.startswith("postgresql+asyncpg://"):
            self.database_url = self.database_url.replace("postgresql://", "postgresql+asyncpg://", 1)

settings = Settings()


