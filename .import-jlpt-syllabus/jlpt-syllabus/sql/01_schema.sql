-- ============================================================
-- JLPT Complete Syllabus — PostgreSQL Schema (Supabase-ready)
-- Levels: N5, N4, N3, N2, N1
-- ============================================================

CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    code VARCHAR(2) UNIQUE NOT NULL,        -- N5, N4, N3, N2, N1
    title TEXT NOT NULL,
    description TEXT,
    estimated_hours INT,
    sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS modules (
    id SERIAL PRIMARY KEY,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    module_id INT REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sort_order INT NOT NULL
);

CREATE TABLE IF NOT EXISTS grammar_points (
    id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE,
    pattern TEXT NOT NULL,
    meaning TEXT NOT NULL,
    example_jp TEXT,
    example_romaji TEXT,
    example_en TEXT,
    formality VARCHAR(20)                    -- casual / polite / formal / literary
);

CREATE TABLE IF NOT EXISTS vocabulary (
    id SERIAL PRIMARY KEY,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE,
    module_id INT REFERENCES modules(id) ON DELETE SET NULL,
    word_jp TEXT NOT NULL,
    reading TEXT NOT NULL,                   -- hiragana reading
    romaji TEXT NOT NULL,
    meaning_en TEXT NOT NULL,
    part_of_speech VARCHAR(30),              -- noun, verb, i-adj, na-adj, adverb, particle...
    example_jp TEXT,
    example_en TEXT
);

CREATE TABLE IF NOT EXISTS kanji (
    id SERIAL PRIMARY KEY,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE,
    character VARCHAR(4) NOT NULL,
    onyomi TEXT,
    kunyomi TEXT,
    meaning_en TEXT NOT NULL,
    stroke_count INT,
    example_word TEXT,
    example_reading TEXT
);

CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE,
    module_id INT REFERENCES modules(id) ON DELETE SET NULL,
    source_type VARCHAR(20) NOT NULL,        -- grammar / vocabulary / kanji
    source_id INT,                           -- FK id into grammar_points/vocabulary/kanji (soft ref)
    question_type VARCHAR(20) NOT NULL,      -- multiple_choice / fill_blank / reading / meaning
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,                  -- array of 4 strings
    correct_index INT NOT NULL,
    explanation TEXT,
    difficulty VARCHAR(10) DEFAULT 'medium'  -- easy / medium / hard
);

-- Per-user progress tracking (this is the table that will actually grow to
-- millions of rows in production — one row per attempt, not per content item)
CREATE TABLE IF NOT EXISTS user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,                   -- references auth.users(id) in Supabase
    question_id INT REFERENCES quiz_questions(id) ON DELETE CASCADE,
    is_correct BOOLEAN NOT NULL,
    attempted_at TIMESTAMPTZ DEFAULT now(),
    time_taken_ms INT
);

CREATE TABLE IF NOT EXISTS user_srs_state (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    item_type VARCHAR(20) NOT NULL,          -- vocabulary / kanji / grammar
    item_id INT NOT NULL,
    ease_factor NUMERIC DEFAULT 2.5,
    interval_days INT DEFAULT 1,
    next_review_at TIMESTAMPTZ DEFAULT now(),
    review_count INT DEFAULT 0,
    UNIQUE(user_id, item_type, item_id)
);

CREATE INDEX IF NOT EXISTS idx_modules_level ON modules(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_grammar_level ON grammar_points(level_id);
CREATE INDEX IF NOT EXISTS idx_vocab_level ON vocabulary(level_id);
CREATE INDEX IF NOT EXISTS idx_kanji_level ON kanji(level_id);
CREATE INDEX IF NOT EXISTS idx_quiz_level ON quiz_questions(level_id);
CREATE INDEX IF NOT EXISTS idx_quiz_module ON quiz_questions(module_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_question ON user_progress(question_id);
CREATE INDEX IF NOT EXISTS idx_srs_user_due ON user_srs_state(user_id, next_review_at);

-- Row Level Security (Supabase pattern) — content tables public read,
-- progress tables locked to the owning user.
-- auth.uid() only exists on Supabase (it provides the `auth` schema).
-- On plain Postgres/Docker/Kubernetes this block is skipped automatically
-- so the same schema file works in both environments; enforce ownership
-- at the application layer there instead.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
        ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
        ALTER TABLE user_srs_state ENABLE ROW LEVEL SECURITY;

        EXECUTE 'CREATE POLICY "Users read own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id)';
        EXECUTE 'CREATE POLICY "Users insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id)';
        EXECUTE 'CREATE POLICY "Users read own srs" ON user_srs_state FOR SELECT USING (auth.uid() = user_id)';
        EXECUTE 'CREATE POLICY "Users upsert own srs" ON user_srs_state FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)';
    END IF;
END $$;
