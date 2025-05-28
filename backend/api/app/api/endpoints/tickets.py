from typing import Any, List
import requests
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_admin, get_current_user, get_db
from app.crud.ticket import (
    create_ticket,
    delete_ticket,
    get_ticket,
    get_tickets,
    update_ticket,
    create_or_update_tickets,
)
from app.models.user import User as UserModel
from app.schemas.ticket import Ticket, TicketCreate, TicketUpdate

router = APIRouter()


@router.get("", response_model=List[Ticket])
def read_tickets(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: UserModel = Depends(get_current_user),
) -> Any:
    """
    Retrieve tickets.
    """
    tickets = get_tickets(db, skip=skip, limit=limit)
    return tickets


@router.post("", response_model=Ticket)
def create_ticket_route(
    *,
    ticket_in: TicketCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
) -> Any:
    """
    Create new ticket.
    """
    return create_ticket(db, ticket_in)


@router.put("/{ticket_id}", response_model=Ticket)
def update_ticket_route(
    *,
    ticket_id: str,
    ticket_in: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
) -> Any:
    """
    Update a ticket.
    """
    ticket = get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return update_ticket(db, ticket, ticket_in)


@router.delete("/{ticket_id}", response_model=Ticket)
def delete_ticket_route(
    *,
    ticket_id: str,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_admin),
) -> Any:
    """
    Delete a ticket.
    """
    ticket = delete_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.post("/sync", response_model=List[Ticket])
def sync_tickets(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
) -> Any:
    """
    Sync tickets from external API.
    """
    # Mock external API call
    mock_tickets = [
        {
            "external_id": "EXT-001",
            "title": "Sample Ticket 1",
            "description": "This is a sample ticket",
            "status": "open"
        },
        {
            "external_id": "EXT-002",
            "title": "Sample Ticket 2",
            "description": "This is another sample ticket",
            "status": "in_progress"
        }
    ]
    
    tickets_data = [TicketCreate(**ticket) for ticket in mock_tickets]
    return create_or_update_tickets(db, tickets_data) 