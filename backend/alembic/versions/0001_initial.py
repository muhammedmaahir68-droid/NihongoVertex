from alembic import op
import sqlalchemy as sa

revision = "0001_initial"
down_revision = None

def upgrade():
    # For production, generate migrations from the SQLAlchemy models:
    # alembic revision --autogenerate -m "initial"
    pass

def downgrade():
    pass
