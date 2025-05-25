from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate


def get_ticket(db: Session, ticket_id: str) -> Optional[Ticket]:
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()


def get_ticket_by_external_id(db: Session, external_id: str) -> Optional[Ticket]:
    return db.query(Ticket).filter(Ticket.external_id == external_id).first()


def get_tickets(db: Session, skip: int = 0, limit: int = 100) -> List[Ticket]:
    return db.query(Ticket).offset(skip).limit(limit).all()


def create_ticket(db: Session, ticket: TicketCreate) -> Ticket:
    db_ticket = Ticket(**ticket.model_dump())
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def update_ticket(db: Session, db_ticket: Ticket, ticket: TicketUpdate) -> Ticket:
    update_data = ticket.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_ticket, field, value)
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket


def delete_ticket(db: Session, ticket_id: str) -> Ticket:
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if ticket:
        db.delete(ticket)
        db.commit()
    return ticket


def create_or_update_tickets(db: Session, tickets: List[TicketCreate]) -> List[Ticket]:
    result = []
    for ticket_data in tickets:
        db_ticket = get_ticket_by_external_id(db, ticket_data.external_id)
        if db_ticket:
            db_ticket = update_ticket(db, db_ticket, TicketUpdate(**ticket_data.model_dump()))
        else:
            db_ticket = create_ticket(db, ticket_data)
        result.append(db_ticket)
    return result 