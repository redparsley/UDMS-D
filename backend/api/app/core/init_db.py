import logging
import secrets
import string
from datetime import date
from sqlalchemy.orm import Session

from app.crud.user import get_user_by_email, create_user
from app.schemas.user import UserCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_password(length: int = 12) -> str:
    """Generate a secure random password."""
    alphabet = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(alphabet) for _ in range(length))

def init_db(db: Session) -> None:
    """Initialize database with default red-admin user."""
    admin_email = "admin@ranepa.ru"
    admin = get_user_by_email(db, email=admin_email)
    
    if not admin:
        password = generate_password()
        user_in = UserCreate(
            email=admin_email,
            password=password,
            full_name="Default Red Admin",
            birth_date=date(2000, 1, 1),  # Default date
            phone="+1234567890",
            role="red-admin"
        )
        admin = create_user(db, user_in)
        logger.info(f"Created red-admin user with email: {admin_email}")
        logger.info(f"Generated password for red-admin: {password}")
        print(f"\n=== IMPORTANT: Red Admin Credentials ===")
        print(f"Email: {admin_email}")
        print(f"Password: {password}")
        print(f"=======================================\n")
    else:
        logger.info(f"Red-admin user already exists with email: {admin_email}") 