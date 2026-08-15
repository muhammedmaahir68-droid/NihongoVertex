import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.db.base import Base
from app.models.learning import User, CourseModule, Lesson, Vocabulary, Character, Progress, DailyMission

config = context.config

def migration_database_url() -> str:
    """Use the production DATABASE_URL while Alembic runs with a sync driver."""
    url = os.getenv("DATABASE_URL", config.get_main_option("sqlalchemy.url"))
    if url.startswith("postgresql+asyncpg://"):
        return url.replace("postgresql+asyncpg://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url

config.set_main_option("sqlalchemy.url", migration_database_url())
if config.config_file_name and config.file_config.has_section("formatters"):
    fileConfig(config.config_file_name)
target_metadata = Base.metadata

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

run_migrations_online()
