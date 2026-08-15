from alembic import op
import sqlalchemy as sa

revision = "0001_initial"
down_revision = None

def upgrade():
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("display_name", sa.String(length=120), nullable=True),
        sa.Column("target_level", sa.String(length=2), nullable=False, server_default="N5"),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.UniqueConstraint("email"),
    )
    op.create_index("ix_users_email", "users", ["email"])
    op.create_table(
        "course_modules",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("level", sa.String(length=2), nullable=False),
        sa.Column("slug", sa.String(length=160), nullable=False),
        sa.Column("title", sa.String(length=240), nullable=False),
        sa.Column("module_type", sa.String(length=50), nullable=False),
        sa.Column("order_index", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("content", sa.JSON(), nullable=False),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_course_modules_level", "course_modules", ["level"])
    op.create_index("ix_course_modules_module_type", "course_modules", ["module_type"])
    op.create_table(
        "lessons",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("module_id", sa.Integer(), sa.ForeignKey("course_modules.id"), nullable=False),
        sa.Column("slug", sa.String(length=180), nullable=False),
        sa.Column("title", sa.String(length=240), nullable=False),
        sa.Column("content", sa.JSON(), nullable=False),
        sa.Column("order_index", sa.Integer(), nullable=False, server_default="0"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index("ix_lessons_module_id", "lessons", ["module_id"])
    op.create_table(
        "vocabulary",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("level", sa.String(length=2), nullable=False),
        sa.Column("japanese", sa.String(length=120), nullable=False),
        sa.Column("romaji", sa.String(length=160), nullable=False),
        sa.Column("meaning", sa.String(length=300), nullable=False),
        sa.Column("audio_url", sa.Text(), nullable=True),
    )
    op.create_index("ix_vocabulary_level", "vocabulary", ["level"])
    op.create_index("ix_vocabulary_japanese", "vocabulary", ["japanese"])
    op.create_index("ix_vocabulary_romaji", "vocabulary", ["romaji"])
    op.create_index("ix_vocab_level_romaji", "vocabulary", ["level", "romaji"])
    op.create_table(
        "characters",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("script", sa.String(length=20), nullable=False),
        sa.Column("character", sa.String(length=20), nullable=False),
        sa.Column("romaji", sa.String(length=30), nullable=False),
        sa.Column("meaning", sa.String(length=200), nullable=True),
        sa.Column("stroke_data", sa.JSON(), nullable=True),
    )
    op.create_index("ix_characters_script", "characters", ["script"])
    op.create_index("ix_characters_character", "characters", ["character"])
    op.create_table(
        "progress",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("lesson_id", sa.Integer(), sa.ForeignKey("lessons.id"), nullable=True),
        sa.Column("status", sa.String(length=30), nullable=False, server_default="started"),
        sa.Column("score", sa.Integer(), nullable=True),
        sa.Column("last_seen", sa.DateTime(), nullable=False),
        sa.Column("metadata_json", sa.JSON(), nullable=False),
    )
    op.create_index("ix_progress_user_id", "progress", ["user_id"])
    op.create_index("ix_progress_lesson_id", "progress", ["lesson_id"])
    op.create_index("ix_progress_user_lesson", "progress", ["user_id", "lesson_id"])
    op.create_table(
        "daily_missions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("mission_date", sa.String(length=10), nullable=False),
        sa.Column("level", sa.String(length=2), nullable=False),
        sa.Column("tasks", sa.JSON(), nullable=False),
        sa.Column("completed", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.create_index("ix_daily_missions_user_id", "daily_missions", ["user_id"])
    op.create_index("ix_daily_missions_mission_date", "daily_missions", ["mission_date"])

def downgrade():
    op.drop_table("daily_missions")
    op.drop_table("progress")
    op.drop_table("characters")
    op.drop_table("vocabulary")
    op.drop_table("lessons")
    op.drop_table("course_modules")
    op.drop_table("users")
