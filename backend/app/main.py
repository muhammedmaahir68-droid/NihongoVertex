import os
import json
import sqlite3
from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(title="Nihongo Vertex API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "nihongo.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "nihongo-vertex-api",
        "version": "2.0.0",
        "database": "sqlite",
        "db_file": DB_PATH,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health/db")
async def health_db():
    return {"status": "ok", "database": "sqlite", "file": DB_PATH, "connected": True}

@app.get("/api/v1/levels")
async def levels():
    return {"levels": ["N5", "N4", "N3", "N2", "N1"]}

@app.get("/api/v1/modules/{level}")
async def modules(level: str):
    modules_map = {
        "N5": ["Hiragana", "Katakana", "Kanji", "Vocabulary", "Grammar", "Listening", "Speaking", "Writing", "Revision", "Quiz", "Mock Exam"],
        "N4": ["Kanji N4", "Vocabulary N4", "Grammar N4", "Listening N4", "Reading N4", "Quiz N4", "Mock Exam N4"],
        "N3": ["Kanji N3", "Vocabulary N3", "Grammar N3", "Listening N3", "Reading N3", "Quiz N3", "Mock Exam N3"],
        "N2": ["Kanji N2", "Vocabulary N2", "Grammar N2", "Listening N2", "Reading N2", "Quiz N2", "Mock Exam N2"],
        "N1": ["Kanji N1", "Vocabulary N1", "Grammar N1", "Listening N1", "Reading N1", "Quiz N1", "Mock Exam N1"]
    }
    lvl = level.upper()
    return {"level": lvl, "modules": modules_map.get(lvl, modules_map["N5"])}

@app.get("/api/v1/progress")
async def get_progress():
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts FROM progress WHERE user_id = 'default_user'")
    row = c.fetchone()
    conn.close()
    if row:
        def safe_json(val, fallback):
            try:
                return json.loads(val) if val else fallback
            except Exception:
                return fallback
        return {
            "level": row["level"] or "N5",
            "streak": row["streak"] or 1,
            "xp": row["xp"] or 0,
            "lastStudyDate": row["last_study_date"] or "",
            "completedLessons": safe_json(row["completed_lessons"], {}),
            "mistakes": safe_json(row["mistakes"], []),
            "mockAttempts": safe_json(row["mock_attempts"], [])
        }
    return {
        "level": "N5", "streak": 1, "xp": 0, "lastStudyDate": "",
        "completedLessons": {}, "mistakes": [], "mockAttempts": []
    }

class ProgressPayload(BaseModel):
    level: Optional[str] = "N5"
    streak: Optional[int] = 1
    xp: Optional[int] = 0
    lastStudyDate: Optional[str] = ""
    completedLessons: Optional[Dict[str, Any]] = {}
    mistakes: Optional[List[Any]] = []
    mockAttempts: Optional[List[Any]] = []

@app.post("/api/v1/progress")
async def save_progress(data: ProgressPayload):
    conn = get_db()
    c = conn.cursor()
    c.execute("""
    INSERT INTO progress (user_id, level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts, updated_at)
    VALUES ('default_user', ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET
        level = excluded.level,
        streak = excluded.streak,
        xp = excluded.xp,
        last_study_date = excluded.last_study_date,
        completed_lessons = excluded.completed_lessons,
        mistakes = excluded.mistakes,
        mock_attempts = excluded.mock_attempts,
        updated_at = CURRENT_TIMESTAMP
    """, (
        data.level,
        data.streak,
        data.xp,
        data.lastStudyDate or datetime.utcnow().strftime("%Y-%m-%d"),
        json.dumps(data.completedLessons or {}),
        json.dumps(data.mistakes or []),
        json.dumps(data.mockAttempts or [])
    ))
    conn.commit()
    conn.close()
    return {"status": "saved", "xp": data.xp, "streak": data.streak}

class ChatPayload(BaseModel):
    message: str
    level: Optional[str] = "N5"
    context: Optional[str] = ""

@app.post("/api/v1/ai/chat")
async def ai_chat(data: ChatPayload):
    from backend.server import generate_ai_response
    reply = generate_ai_response(data.message, data.level, data.context)
    return {"reply": reply, "level": data.level, "timestamp": datetime.utcnow().isoformat()}
