import logging
from datetime import date
from sqlalchemy.orm import Session

from app.crud.user import get_user_by_email, create_user
from app.schemas.user import UserCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    """Initialize database with default admin user."""
    admin_email = "admin@edis-lite.com"
    admin = get_user_by_email(db, email=admin_email)
    
    if not admin:
        user_in = UserCreate(
            email=admin_email,
            password="admin",  # This should be changed immediately in production
            full_name="Default Admin",
            birth_date=date(2000, 1, 1),  # Default date
            phone="+1234567890",
            role="admin"
        )
        admin = create_user(db, user_in)
        logger.info(f"Created admin user with email: {admin_email}")
    else:
        logger.info(f"Admin user already exists with email: {admin_email}") 