from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_admin, get_current_user, get_db
from app.crud.user import create_user, delete_user, get_user_by_email, get_users, update_user
from app.models.user import User as UserModel
from app.schemas.user import User, UserCreate, UserUpdate

router = APIRouter()


@router.get("/me", response_model=User)
def read_user_me(
    current_user: UserModel = Depends(get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.put("/me", response_model=User)
def update_user_me(
    *,
    user_in: UserUpdate,
    current_user: UserModel = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Any:
    """
    Update own user.
    """
    return update_user(db, current_user, user_in)


@router.get("", response_model=List[User])
def read_users(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: UserModel = Depends(get_current_active_admin),
) -> Any:
    """
    Retrieve users.
    """
    users = get_users(db, skip=skip, limit=limit)
    return users


@router.post("", response_model=User)
def create_user_route(
    *,
    user_in: UserCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_admin),
) -> Any:
    """
    Create new user.
    """
    user = get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    return create_user(db, user_in)


@router.delete("/{user_id}", response_model=User)
def delete_user_route(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_admin),
) -> Any:
    """
    Delete a user.
    """
    user = delete_user(db, user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    return user 