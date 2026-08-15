from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator


JlptLevel = Literal["N5", "N4", "N3", "N2", "N1"]
QuestionType = Literal[
    "multiple_choice", "fill_blank", "sentence_ordering", "grammar_selection",
    "vocabulary_selection", "kanji_reading", "kanji_writing", "particle_selection",
    "conjugation", "error_correction", "translation", "matching", "dictation",
]


class QuestionCandidate(BaseModel):
    """A draft question, deliberately separate from publishable question-bank data."""

    level: JlptLevel
    skill: Literal["vocabulary", "kanji", "grammar", "reading", "listening", "writing", "speaking"]
    topic: str = Field(min_length=2, max_length=160)
    question_type: QuestionType
    question_text: str = Field(min_length=4, max_length=10_000)
    options: list[str] = Field(default_factory=list, max_length=8)
    correct_answer: str = Field(min_length=1, max_length=2_000)
    explanation: str = Field(min_length=8, max_length=10_000)
    difficulty: int = Field(ge=1, le=5)
    vocabulary_references: list[str] = Field(default_factory=list, max_length=32)
    grammar_references: list[str] = Field(default_factory=list, max_length=16)
    kanji_references: list[str] = Field(default_factory=list, max_length=32)
    tags: list[str] = Field(default_factory=list, max_length=24)

    @field_validator("options")
    @classmethod
    def strip_options(cls, options: list[str]) -> list[str]:
        return [option.strip() for option in options if option.strip()]


class QuestionValidationRequest(BaseModel):
    candidate: QuestionCandidate
    existing_questions: list[QuestionCandidate] = Field(default_factory=list, max_length=500)


class QualityIssue(BaseModel):
    code: str
    message: str
    severity: Literal["error", "warning"]


class QuestionValidationReport(BaseModel):
    fingerprint: str
    quality_score: int = Field(ge=0, le=100)
    status: Literal["DRAFT", "VALIDATING", "REVIEW", "APPROVED", "REJECTED"]
    duplicate_of: str | None = None
    issues: list[QualityIssue]


class SrsScheduleRequest(BaseModel):
    rating: Literal["again", "hard", "good", "easy"]
    repetitions: int = Field(default=0, ge=0)
    interval_days: int = Field(default=0, ge=0, le=36_500)
    ease_factor: float = Field(default=2.5, ge=1.3, le=3.5)
    reviewed_at: datetime | None = None


class SrsScheduleResponse(BaseModel):
    repetitions: int
    interval_days: int
    ease_factor: float
    next_review: datetime


class DailyChallengeRequest(BaseModel):
    level: JlptLevel
    weak_topics: list[str] = Field(default_factory=list, max_length=8)
    minutes_available: int = Field(default=30, ge=10, le=180)


class DailyChallengeItem(BaseModel):
    skill: str
    topic: str
    count: int
    estimated_minutes: int
    reason: str


class DailyChallengeResponse(BaseModel):
    level: JlptLevel
    estimated_minutes: int
    items: list[DailyChallengeItem]
