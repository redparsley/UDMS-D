"""Add red-admin role

Revision ID: add_red_admin_role
Revises: a549d44c2319
Create Date: 2024-03-19 10:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'add_red_admin_role'
down_revision = 'a549d44c2319'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create a new enum type with the additional role
    op.execute("ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'red-admin'")


def downgrade() -> None:
    # Note: PostgreSQL does not support removing values from enums
    # We would need to create a new enum type and migrate the data
    pass 