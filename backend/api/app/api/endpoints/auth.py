from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.security import create_access_token, verify_password
from app.crud.user import get_user_by_email, update_user
from app.schemas.user import User, UserUpdate

router = APIRouter()


@router.post("/login")
def login(
    request: Request,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Update last login information
    update_data = UserUpdate(
        last_login_ip=request.client.host,
        last_login_at=None  # Will be set automatically by the database
    )
    user = update_user(db, user, update_data)
    
    access_token = create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
    } 