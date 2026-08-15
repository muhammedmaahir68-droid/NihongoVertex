# Phase 1 — JLPT platform architecture

## Scope

This phase establishes the target architecture only. It does not replace the
existing FastAPI service, create Django models, expose new APIs, or import any
textbook content. Those changes begin in Phase 2.

The application stores only original or properly licensed learning content.
Textbook names may be used as an external-study reference; textbook pages,
dialogues, exercises, answers, and audio must never be imported.

## Target stack

| Layer | Target |
| --- | --- |
| Frontend | React + TypeScript + Vite + Tailwind |
| API | Django + Django REST Framework, versioned at `/api/japanese/v1/` |
| Authentication | Django user model + JWT |
| Primary data | PostgreSQL |
| Async / cache | Redis |
| Deployment | Docker Compose locally, Kubernetes in production, Vercel for the frontend |

The current `backend/app` FastAPI service is retained during the migration so
the existing application remains runnable. Django is the intended replacement,
not a second production API. Phase 2 will add Django settings and migrate the
compose/Kubernetes API service deliberately.

## Canonical learning hierarchy

```text
Japanese Learning Platform
├── JLPT N5
│   ├── Core Curriculum
│   ├── Minna no Nihongo 1-1 (external-study alignment)
│   └── Minna no Nihongo 1-2 (external-study alignment)
├── JLPT N4
│   ├── Core Curriculum
│   ├── Minna no Nihongo 2-1 (external-study alignment)
│   └── Minna no Nihongo 2-2 (external-study alignment)
├── JLPT N3
│   ├── Core Curriculum
│   └── Intermediate Resources
├── JLPT N2
│   └── Advanced Intermediate Curriculum
└── JLPT N1
    └── Advanced Curriculum
```

Each branch is represented by a `courses` record and optionally a `books`
record. The Minna no Nihongo branches are alignment tracks only: lesson titles,
original explanations, and original practice may be authored there, but no
copyrighted textbook content is stored. This lets a learner choose either the
independent Core Curriculum or their matching external-study track.

## Backend layout

```text
backend/
├── config/                 # Django project settings, URLs, ASGI/WSGI (Phase 2)
├── api/v1/                 # API routers/views grouped by public resource
├── apps/
│   ├── accounts/           # user, roles, JWT and profile
│   ├── catalog/            # JLPT levels, courses, books, lessons, exam versions
│   ├── content/            # grammar, vocabulary, kanji, reading, listening, tasks
│   ├── assessments/        # questions, options, quizzes, mock exams, attempts
│   ├── progress/           # mastery, sessions, weak areas, achievements
│   ├── reviews/            # flashcards and spaced repetition schedules
│   └── speech/             # replaceable speech-recognition/provider boundary
├── tests/                  # API, model, permission, and integration tests
└── scripts/                # JSON validation and original-content import commands
```

Each Django app owns its model, admin configuration, migrations, serializers,
services, selectors, and tests. Views remain thin: validation and read/write
rules live in services, while query shaping stays in selectors.

## API resource boundaries

| Resource | Owner app | Phase 2 endpoint family |
| --- | --- | --- |
| Levels, courses, books, lessons, official exam metadata | `catalog` | `/levels/`, `/courses/`, `/lessons/` |
| Grammar, vocabulary, kanji, reading, listening, speaking, writing | `content` | matching content endpoints |
| Questions, quizzes, mock exams and attempts | `assessments` | `/questions/`, `/quizzes/`, `/mock-exams/` |
| Progress, sessions, weak areas, achievements | `progress` | `/progress/` |
| Flashcards and reviews | `reviews` | `/flashcards/`, `/reviews/` |

All routes will be nested under `/api/japanese/v1/`. The version keeps future
exam-format changes backward-compatible.

## Data design decisions

- `jlpt_exam_versions` and `test_sections` isolate time limits, scoring notes,
  question types, and pass requirements from application code.
- Content records use `source_type` and `license_note` so original/licensed
  material can be audited before publication.
- Questions are reusable across lessons, quizzes, daily practice, and mocks.
- `user_content_progress.mastery` uses the requested scale: 0 not started,
  1 learning, 2 practicing, 3 almost mastered, 4 mastered.
- JSONB is reserved for flexible metadata (speech scripts, answer payloads,
  SRS schedules), while queryable relationships remain normalized.

## Content-import pipeline

1. An author creates original content in the documented JSON shape.
2. `backend/scripts/validate_content.py` (Phase 2) validates level, required
   fields, Japanese readings, question answers, and licensing metadata.
3. A reviewer approves it in Django Admin.
4. An import command writes it transactionally and records source/license data.
5. Publication makes it visible through the API.

No importer may accept scanned textbook files, copied exercises, answer keys,
or unlicensed audio.

## Phase sequence

1. **Completed here:** target structure and PostgreSQL schema.
2. Django project, custom user, models, migrations, DRF, and JWT.
3. React dashboard and level/lesson API integration.
4. Grammar, vocabulary, and kanji authoring/delivery.
5. Reading, listening, speaking, and writing practice.
6. Quiz engine, daily challenge, and spaced repetition.
7. Configurable mock exams.
8. Analytics and weak-area detection.
9. Django Admin and bulk original-content import.
10. Docker, Kubernetes, Vercel/cloud deployment migration.
