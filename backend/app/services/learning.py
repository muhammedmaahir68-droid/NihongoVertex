"""Quality gates and adaptive-learning rules.

These deterministic checks run before a draft is handed to a human reviewer.
They are intentionally conservative: a generated item can be reviewed later,
but it must never skip validation and publish itself.
"""

from __future__ import annotations

import hashlib
import re
import unicodedata
from datetime import datetime, timedelta, timezone

from app.schemas.learning import (
    DailyChallengeItem,
    DailyChallengeRequest,
    DailyChallengeResponse,
    QualityIssue,
    QuestionCandidate,
    QuestionValidationReport,
    SrsScheduleRequest,
    SrsScheduleResponse,
)

_LEVEL_DIFFICULTY = {"N5": 1, "N4": 2, "N3": 3, "N2": 4, "N1": 5}
_TOKEN = re.compile(r"[\w\u3040-\u30ff\u3400-\u9fff]+", re.UNICODE)


def _normalise(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).lower()
    return " ".join(_TOKEN.findall(value))


def question_fingerprint(candidate: QuestionCandidate) -> str:
    """Stable key for exact duplicate prevention, insensitive to spacing/case."""
    material = "|".join((
        candidate.level, candidate.skill, candidate.question_type,
        _normalise(candidate.question_text), _normalise(candidate.correct_answer),
    ))
    return hashlib.sha256(material.encode("utf-8")).hexdigest()


def _similarity(left: QuestionCandidate, right: QuestionCandidate) -> float:
    left_tokens = set(_normalise(left.question_text).split())
    right_tokens = set(_normalise(right.question_text).split())
    if not left_tokens or not right_tokens:
        return 0.0
    return len(left_tokens & right_tokens) / len(left_tokens | right_tokens)


def validate_question(candidate: QuestionCandidate, existing: list[QuestionCandidate]) -> QuestionValidationReport:
    issues: list[QualityIssue] = []
    fingerprint = question_fingerprint(candidate)
    duplicate_of: str | None = None
    is_choice = candidate.question_type in {"multiple_choice", "grammar_selection", "vocabulary_selection", "particle_selection", "kanji_reading"}

    if is_choice and len(candidate.options) < 2:
        issues.append(QualityIssue(code="insufficient_options", severity="error", message="Selection questions need at least two options."))
    if candidate.options:
        canonical_options = [_normalise(option) for option in candidate.options]
        if len(canonical_options) != len(set(canonical_options)):
            issues.append(QualityIssue(code="duplicate_options", severity="error", message="Options must be unique after normalisation."))
        if _normalise(candidate.correct_answer) not in canonical_options:
            issues.append(QualityIssue(code="answer_not_in_options", severity="error", message="The correct answer must exactly match one option."))
    if candidate.difficulty > _LEVEL_DIFFICULTY[candidate.level] + 1:
        issues.append(QualityIssue(code="difficulty_out_of_band", severity="warning", message="Difficulty is unusually high for this JLPT level; review the level mapping."))
    if len(candidate.explanation.split()) < 5:
        issues.append(QualityIssue(code="thin_explanation", severity="warning", message="Add a learner-facing explanation with enough reasoning."))

    for other in existing:
        other_fingerprint = question_fingerprint(other)
        if other_fingerprint == fingerprint:
            duplicate_of = other_fingerprint
            issues.append(QualityIssue(code="exact_duplicate", severity="error", message="An identical question already exists."))
            break
        if other.level == candidate.level and other.skill == candidate.skill and _similarity(other, candidate) >= 0.9:
            duplicate_of = other_fingerprint
            issues.append(QualityIssue(code="near_duplicate", severity="error", message="This draft is too similar to an existing question."))
            break

    errors = sum(issue.severity == "error" for issue in issues)
    warnings = sum(issue.severity == "warning" for issue in issues)
    score = max(0, 100 - errors * 45 - warnings * 10)
    status = "REJECTED" if errors else "REVIEW" if warnings else "APPROVED"
    return QuestionValidationReport(fingerprint=fingerprint, quality_score=score, status=status, duplicate_of=duplicate_of, issues=issues)


def schedule_review(request: SrsScheduleRequest) -> SrsScheduleResponse:
    """A documented SM-2-style scheduler suitable for a first SRS implementation.

    Ratings map to a predictable interval and bounded ease adjustment; replacing
    this function with FSRS later does not change the public API contract.
    """
    reviewed_at = request.reviewed_at or datetime.now(timezone.utc)
    ease = request.ease_factor
    reps = request.repetitions
    if request.rating == "again":
        reps, interval, ease = 0, 1, max(1.3, ease - 0.2)
    elif request.rating == "hard":
        reps, interval, ease = reps + 1, max(1, round(max(1, request.interval_days) * 1.2)), max(1.3, ease - 0.15)
    elif request.rating == "good":
        reps = reps + 1
        interval = 1 if reps == 1 else 6 if reps == 2 else max(1, round(request.interval_days * ease))
    else:
        reps = reps + 1
        interval = 4 if reps == 1 else 10 if reps == 2 else max(1, round(request.interval_days * ease * 1.3))
        ease = min(3.5, ease + 0.15)
    next_review = reviewed_at + timedelta(days=interval)
    return SrsScheduleResponse(repetitions=reps, interval_days=interval, ease_factor=round(ease, 2), next_review=next_review)


def build_daily_challenge(request: DailyChallengeRequest) -> DailyChallengeResponse:
    focus = request.weak_topics[0] if request.weak_topics else "current curriculum"
    base = [
        DailyChallengeItem(skill="vocabulary", topic=focus, count=10, estimated_minutes=6, reason="Retention review"),
        DailyChallengeItem(skill="kanji", topic="recognition and reading", count=8, estimated_minutes=6, reason="Build reading fluency"),
        DailyChallengeItem(skill="grammar", topic=focus, count=8, estimated_minutes=7, reason="Target the weakest concept"),
        DailyChallengeItem(skill="reading", topic="level-appropriate comprehension", count=2, estimated_minutes=6, reason="Apply vocabulary and grammar in context"),
        DailyChallengeItem(skill="listening", topic="comprehension", count=2, estimated_minutes=5, reason="Practice real-time recognition"),
    ]
    budget = request.minutes_available
    selected: list[DailyChallengeItem] = []
    used = 0
    for item in base:
        if used + item.estimated_minutes <= budget:
            selected.append(item)
            used += item.estimated_minutes
    return DailyChallengeResponse(level=request.level, estimated_minutes=used, items=selected)
