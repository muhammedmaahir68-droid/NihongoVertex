from datetime import datetime
from sqlalchemy import String, Text, Integer, DateTime, Boolean, ForeignKey, JSON, Index
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    display_name: Mapped[str | None] = mapped_column(String(120))
    target_level: Mapped[str] = mapped_column(String(2), default="N5")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class CourseModule(Base):
    __tablename__ = "course_modules"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    level: Mapped[str] = mapped_column(String(2), index=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True)
    title: Mapped[str] = mapped_column(String(240))
    module_type: Mapped[str] = mapped_column(String(50), index=True)
    order_index: Mapped[int] = mapped_column(Integer, default=0)
    content: Mapped[dict] = mapped_column(JSON, default=dict)

class Lesson(Base):
    __tablename__ = "lessons"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    module_id: Mapped[int] = mapped_column(ForeignKey("course_modules.id"), index=True)
    slug: Mapped[str] = mapped_column(String(180), unique=True)
    title: Mapped[str] = mapped_column(String(240))
    content: Mapped[dict] = mapped_column(JSON, default=dict)
    order_index: Mapped[int] = mapped_column(Integer, default=0)

class Vocabulary(Base):
    __tablename__ = "vocabulary"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    level: Mapped[str] = mapped_column(String(2), index=True)
    japanese: Mapped[str] = mapped_column(String(120), index=True)
    romaji: Mapped[str] = mapped_column(String(160), index=True)
    meaning: Mapped[str] = mapped_column(String(300))
    audio_url: Mapped[str | None] = mapped_column(Text)

class Character(Base):
    __tablename__ = "characters"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    script: Mapped[str] = mapped_column(String(20), index=True)
    character: Mapped[str] = mapped_column(String(20), index=True)
    romaji: Mapped[str] = mapped_column(String(30))
    meaning: Mapped[str | None] = mapped_column(String(200))
    stroke_data: Mapped[dict | None] = mapped_column(JSON)

class Progress(Base):
    __tablename__ = "progress"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    lesson_id: Mapped[int | None] = mapped_column(ForeignKey("lessons.id"), index=True)
    status: Mapped[str] = mapped_column(String(30), default="started")
    score: Mapped[int | None] = mapped_column(Integer)
    last_seen: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    metadata_json: Mapped[dict] = mapped_column(JSON, default=dict)

class DailyMission(Base):
    __tablename__ = "daily_missions"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    mission_date: Mapped[str] = mapped_column(String(10), index=True)
    level: Mapped[str] = mapped_column(String(2))
    tasks: Mapped[list] = mapped_column(JSON, default=list)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

Index("ix_progress_user_lesson", Progress.user_id, Progress.lesson_id)
Index("ix_vocab_level_romaji", Vocabulary.level, Vocabulary.romaji)
