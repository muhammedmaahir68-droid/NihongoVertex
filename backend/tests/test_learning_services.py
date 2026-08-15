from app.schemas.learning import QuestionCandidate, SrsScheduleRequest
from app.services.learning import question_fingerprint, schedule_review, validate_question


def question(**changes):
    data = {
        "level": "N5", "skill": "grammar", "topic": "particles", "question_type": "particle_selection",
        "question_text": "Choose the correct particle: わたし ___ 学生です。",
        "options": ["は", "を", "に", "で"], "correct_answer": "は",
        "explanation": "は marks the topic of this basic identification sentence.", "difficulty": 1,
    }
    data.update(changes)
    return QuestionCandidate(**data)


def test_fingerprint_ignores_spacing_and_case():
    first = question(question_text="Choose the correct particle")
    second = question(question_text=" choose   THE correct particle ")
    assert question_fingerprint(first) == question_fingerprint(second)


def test_duplicate_question_is_rejected():
    item = question()
    report = validate_question(item, [item])
    assert report.status == "REJECTED"
    assert any(issue.code == "exact_duplicate" for issue in report.issues)


def test_srs_good_answer_increases_interval():
    result = schedule_review(SrsScheduleRequest(rating="good", repetitions=2, interval_days=6))
    assert result.repetitions == 3
    assert result.interval_days == 15
