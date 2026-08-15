"""Distinct JLPT curriculum metadata.

This catalog is deliberately level-specific. It is a small, original bootstrap
dataset for the API; the PostgreSQL import pipeline will replace it with
versioned curriculum records as content is reviewed and published.
"""

CURRICULUM = {
    "N5": {
        "cefr": "A1", "difficulty": 1,
        "vocabulary_focus": ["daily life", "family", "school", "food and shopping"],
        "kanji_focus": "Foundational everyday kanji, numbers, time, people and places.",
        "modules": [
            ("kana-pronunciation", "Hiragana, Katakana and pronunciation", "script", 1),
            ("basic-sentences", "Particles and basic sentence construction", "grammar", 2),
            ("polite-verbs", "Polite verbs, adjectives and daily actions", "grammar", 3),
            ("beginner-vocabulary", "Essential everyday vocabulary", "vocabulary", 4),
            ("beginner-kanji", "Beginner kanji and reading", "kanji", 5),
            ("n5-practice", "Short reading, listening and JLPT practice", "assessment", 6),
        ],
    },
    "N4": {
        "cefr": "A2", "difficulty": 2,
        "vocabulary_focus": ["travel", "work", "health", "plans and requests"],
        "kanji_focus": "Everyday kanji for emails, notices, public information and short articles.",
        "modules": [
            ("plain-form", "Plain form and casual speech", "grammar", 1),
            ("ability-volitional", "Potential, volitional and ability", "grammar", 2),
            ("n4-conditionals", "Conditionals: たら, ば, と and なら", "grammar", 3),
            ("n4-requests", "Giving, receiving, permission and prohibition", "grammar", 4),
            ("n4-kanji-reading", "N4 kanji and practical reading", "kanji", 5),
            ("minna-26-50", "Original Beginner II preparation lessons 26–50", "curriculum_mapping", 6),
        ],
    },
    "N3": {
        "cefr": "B1", "difficulty": 3,
        "vocabulary_focus": ["community", "workplace", "news", "opinions and relationships"],
        "kanji_focus": "Intermediate kanji for public documents, articles and general media.",
        "modules": [
            ("n3-conjunctions", "Nuanced conjunctions and reasoning", "grammar", 1),
            ("n3-keigo", "Keigo introduction and social register", "grammar", 2),
            ("n3-voice", "Passive, causative and causative-passive", "grammar", 3),
            ("n3-reading", "Medium passages and information extraction", "reading", 4),
            ("n3-listening", "Conversation intent, dictation and summaries", "listening", 5),
        ],
    },
    "N2": {
        "cefr": "B2", "difficulty": 4,
        "vocabulary_focus": ["business", "society", "formal writing", "cause, contrast and evaluation"],
        "kanji_focus": "Formal and high-frequency kanji used in reports, editorials and workplace documents.",
        "modules": [
            ("n2-written-grammar", "Formal written grammar patterns", "grammar", 1),
            ("n2-business-keigo", "Business Japanese and advanced keigo", "speaking", 2),
            ("n2-nuance", "Nuanced modality, emphasis and inference", "grammar", 3),
            ("n2-long-reading", "Long-form reading and natural-speed listening", "reading", 4),
        ],
    },
    "N1": {
        "cefr": "C1", "difficulty": 5,
        "vocabulary_focus": ["academic", "newspaper", "rhetorical", "idiomatic and abstract language"],
        "kanji_focus": "Advanced literacy for academic arguments, formal notices and professional communication.",
        "modules": [
            ("n1-literary-grammar", "Literary and archaic grammar patterns", "grammar", 1),
            ("n1-rhetoric", "Rhetorical, emphatic and formal expressions", "grammar", 2),
            ("n1-academic-vocabulary", "Academic and abstract vocabulary", "vocabulary", 3),
            ("n1-advanced-comprehension", "Complex reading, rapid listening and implicit meaning", "assessment", 4),
        ],
    },
}


def curriculum_for(level: str) -> dict | None:
    curriculum = CURRICULUM.get(level.upper())
    if curriculum is None:
        return None
    return {
        "level": level.upper(),
        "cefr": curriculum["cefr"],
        "difficulty": curriculum["difficulty"],
        "vocabulary_focus": curriculum["vocabulary_focus"],
        "kanji_focus": curriculum["kanji_focus"],
        "modules": [
            {"slug": slug, "title": title, "category": category, "order": order}
            for slug, title, category, order in curriculum["modules"]
        ],
    }
