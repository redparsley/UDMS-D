from datetime import date, datetime
import uuid
from sqlalchemy import Column, String, Date, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID

from app.db.base import Base


class User(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String, nullable=False)
    birth_date = Column(Date, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=False)
    role = Column(Enum('admin', 'specialist', name='user_role'), nullable=False)
    last_login_ip = Column(String, nullable=True)
    last_login_at = Column(DateTime, nullable=True)
    hashed_password = Column(String, nullable=False) 