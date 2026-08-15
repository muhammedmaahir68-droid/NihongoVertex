-- Phase 1 PostgreSQL schema blueprint. Django models/migrations are created in Phase 2.
-- Content must be original or properly licensed; source_type and license_note are mandatory.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(254) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, display_name VARCHAR(120), is_staff BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE jlpt_levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(2) UNIQUE NOT NULL CHECK (code IN ('N5','N4','N3','N2','N1')),
  name VARCHAR(80) NOT NULL, rank SMALLINT UNIQUE NOT NULL CHECK (rank BETWEEN 1 AND 5), description TEXT
);
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id),
  slug VARCHAR(120) UNIQUE NOT NULL, title VARCHAR(200) NOT NULL, course_type VARCHAR(32) NOT NULL CHECK (course_type IN ('core','resource','alignment','advanced')),
  description TEXT, is_published BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL, external_reference BOOLEAN NOT NULL DEFAULT FALSE, copyright_notice TEXT,
  UNIQUE(course_id, title)
);
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE SET NULL, sequence SMALLINT NOT NULL, title VARCHAR(240) NOT NULL,
  summary TEXT, estimated_minutes SMALLINT, is_published BOOLEAN NOT NULL DEFAULT FALSE,
  source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('original','licensed')), license_note TEXT NOT NULL,
  UNIQUE(course_id, sequence)
);

-- Configurable official exam metadata; no exam structure is hard-coded in the application.
CREATE TABLE jlpt_exam_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id),
  label VARCHAR(120) NOT NULL, official_information_url TEXT, scoring_information TEXT, pass_requirements TEXT,
  effective_from DATE, effective_to DATE, is_current BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE test_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), exam_version_id UUID NOT NULL REFERENCES jlpt_exam_versions(id) ON DELETE CASCADE,
  sequence SMALLINT NOT NULL, name VARCHAR(120) NOT NULL, duration_minutes SMALLINT, question_types JSONB NOT NULL DEFAULT '[]',
  UNIQUE(exam_version_id, sequence)
);

CREATE TABLE grammar_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  slug VARCHAR(150) UNIQUE NOT NULL, title VARCHAR(200) NOT NULL, explanation TEXT NOT NULL, formation TEXT NOT NULL,
  usage_notes TEXT, similar_grammar JSONB NOT NULL DEFAULT '[]', common_mistakes JSONB NOT NULL DEFAULT '[]', source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  japanese VARCHAR(200) NOT NULL, reading VARCHAR(200), romaji VARCHAR(250), meaning TEXT NOT NULL, part_of_speech VARCHAR(80),
  frequency_rank INTEGER, difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5), example_sentence TEXT, audio_url TEXT,
  tags JSONB NOT NULL DEFAULT '[]', source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE kanji (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), character VARCHAR(1) UNIQUE NOT NULL, meaning TEXT NOT NULL,
  onyomi JSONB NOT NULL DEFAULT '[]', kunyomi JSONB NOT NULL DEFAULT '[]', stroke_count SMALLINT, jlpt_level_id UUID REFERENCES jlpt_levels(id),
  stroke_order JSONB, audio_url TEXT, source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE kanji_vocabulary (kanji_id UUID REFERENCES kanji(id) ON DELETE CASCADE, vocabulary_id UUID REFERENCES vocabulary(id) ON DELETE CASCADE, PRIMARY KEY(kanji_id, vocabulary_id));
CREATE TABLE reading_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title VARCHAR(240) NOT NULL, body TEXT NOT NULL, difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5), source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE listening_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title VARCHAR(240) NOT NULL, script TEXT NOT NULL, audio_url TEXT, duration_seconds INTEGER, source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE speaking_tasks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id), prompt TEXT NOT NULL, model_response TEXT, rubric JSONB NOT NULL DEFAULT '{}');
CREATE TABLE writing_tasks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id), prompt TEXT NOT NULL, rubric JSONB NOT NULL DEFAULT '{}');

CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  section_id UUID REFERENCES test_sections(id) ON DELETE SET NULL, question_type VARCHAR(40) NOT NULL, skill VARCHAR(40) NOT NULL,
  topic VARCHAR(160), prompt TEXT NOT NULL, payload JSONB NOT NULL DEFAULT '{}', correct_answer JSONB NOT NULL, explanation TEXT NOT NULL,
  difficulty SMALLINT CHECK (difficulty BETWEEN 1 AND 5), source_type VARCHAR(20) NOT NULL, license_note TEXT NOT NULL
);
CREATE TABLE question_options (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE, sequence SMALLINT NOT NULL, value TEXT NOT NULL, UNIQUE(question_id, sequence));
CREATE TABLE answers (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE, attempt_id UUID, response JSONB NOT NULL, is_correct BOOLEAN, elapsed_seconds INTEGER, answered_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE mock_exams (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), jlpt_level_id UUID NOT NULL REFERENCES jlpt_levels(id), exam_version_id UUID REFERENCES jlpt_exam_versions(id), title VARCHAR(240) NOT NULL, is_published BOOLEAN NOT NULL DEFAULT FALSE);
CREATE TABLE mock_exam_questions (mock_exam_id UUID REFERENCES mock_exams(id) ON DELETE CASCADE, question_id UUID REFERENCES questions(id) ON DELETE CASCADE, section_id UUID REFERENCES test_sections(id), sequence SMALLINT NOT NULL, PRIMARY KEY(mock_exam_id, question_id));

CREATE TABLE user_content_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_kind VARCHAR(32) NOT NULL, content_id UUID NOT NULL, mastery SMALLINT NOT NULL DEFAULT 0 CHECK (mastery BETWEEN 0 AND 4),
  accuracy NUMERIC(5,2), last_studied_at TIMESTAMPTZ, UNIQUE(user_id, content_kind, content_id)
);
CREATE TABLE user_progress (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, active_jlpt_level_id UUID REFERENCES jlpt_levels(id),
  level_progress JSONB NOT NULL DEFAULT '{}', quiz_accuracy NUMERIC(5,2), mock_exam_score NUMERIC(6,2),
  study_seconds BIGINT NOT NULL DEFAULT 0, current_streak INTEGER NOT NULL DEFAULT 0, weak_areas JSONB NOT NULL DEFAULT '[]', mastered_topics JSONB NOT NULL DEFAULT '[]', updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE quiz_attempts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, question_id UUID REFERENCES questions(id), answer JSONB NOT NULL, is_correct BOOLEAN, elapsed_seconds INTEGER, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE mock_exam_attempts (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, mock_exam_id UUID NOT NULL REFERENCES mock_exams(id), status VARCHAR(20) NOT NULL DEFAULT 'in_progress', answer_payload JSONB NOT NULL DEFAULT '{}', score NUMERIC(6,2), started_at TIMESTAMPTZ NOT NULL DEFAULT now(), submitted_at TIMESTAMPTZ);
CREATE TABLE study_sessions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, jlpt_level_id UUID REFERENCES jlpt_levels(id), started_at TIMESTAMPTZ NOT NULL DEFAULT now(), ended_at TIMESTAMPTZ, activity_summary JSONB NOT NULL DEFAULT '{}');
CREATE TABLE flashcards (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, content_kind VARCHAR(32) NOT NULL, content_id UUID NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE spaced_repetition_reviews (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, rating SMALLINT NOT NULL CHECK (rating BETWEEN 0 AND 5), due_at TIMESTAMPTZ NOT NULL, interval_days INTEGER NOT NULL DEFAULT 0, ease_factor NUMERIC(4,2) NOT NULL DEFAULT 2.50, reviewed_at TIMESTAMPTZ NOT NULL DEFAULT now());
CREATE TABLE bookmarks (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, content_kind VARCHAR(32) NOT NULL, content_id UUID NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(user_id, content_kind, content_id));
CREATE TABLE achievements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), code VARCHAR(100) UNIQUE NOT NULL, title VARCHAR(160) NOT NULL, rule JSONB NOT NULL DEFAULT '{}');
CREATE TABLE user_achievements (user_id UUID REFERENCES users(id) ON DELETE CASCADE, achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE, earned_at TIMESTAMPTZ NOT NULL DEFAULT now(), PRIMARY KEY(user_id, achievement_id));

CREATE INDEX vocabulary_level_lesson_idx ON vocabulary(jlpt_level_id, lesson_id);
CREATE INDEX questions_level_skill_idx ON questions(jlpt_level_id, skill, difficulty);
CREATE INDEX progress_user_kind_idx ON user_content_progress(user_id, content_kind, mastery);
CREATE INDEX reviews_due_idx ON spaced_repetition_reviews(user_id, due_at);
