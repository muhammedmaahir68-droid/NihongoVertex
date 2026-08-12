from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.config import settings
from app.db.session import engine

app = FastAPI(title="Nihongo Vertex API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[x.strip() for x in settings.cors_origins.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok", "service": "nihongo-vertex-api"}

@app.get("/health/db")
async def health_db():
    async with engine.connect() as conn:
        await conn.execute(text("SELECT 1"))
    return {"status": "ok", "database": "postgresql"}

@app.get("/api/v1/levels")
async def levels():
    return {"levels": ["N5", "N4", "N3", "N2", "N1"]}

@app.get("/api/v1/modules/{level}")
async def modules(level: str):
    return {"level": level.upper(), "modules": [
        "Hiragana", "Katakana", "Kanji", "Vocabulary", "Grammar",
        "Listening", "Speaking", "Writing", "Revision", "Quiz", "Mock Exam"
    ]}
