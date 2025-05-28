from datetime import datetime, date
import uuid
from typing import List
from sqlalchemy import Column, String, DateTime, Integer, JSON, Date, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship

from app.db.base import Base


class Person(Base):
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    type = Column(String)  # 'user' or other types


class Attachment(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    size = Column(Integer)
    md5 = Column(String)
    url = Column(String)
    version = Column(Integer)
    root_id = Column(Integer)
    ticket_id = Column(UUID(as_uuid=True), ForeignKey('ticket.id'))
    ticket = relationship("Ticket", back_populates="attachments")


class Subscriber(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    person_id = Column(Integer, ForeignKey('person.id'))
    ticket_id = Column(UUID(as_uuid=True), ForeignKey('ticket.id'))
    approval_choice = Column(String)
    person = relationship("Person")
    ticket = relationship("Ticket", back_populates="subscribers")


class Ticket(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    external_id = Column(Integer, unique=True)  # Pyrus task ID
    text = Column(String, nullable=False)  # Task text
    create_date = Column(DateTime, nullable=False)
    last_modified_date = Column(DateTime, nullable=False)
    
    # Author
    author_id = Column(Integer, ForeignKey('person.id'))
    author = relationship("Person", foreign_keys=[author_id])
    
    # Dates
    due_date = Column(Date, nullable=True)
    due = Column(DateTime, nullable=True)
    duration = Column(Integer, nullable=True)  # in minutes
    close_date = Column(DateTime, nullable=True)
    
    # Task metadata
    current_step = Column(Integer)
    list_ids = Column(ARRAY(Integer))
    
    # Responsible person
    responsible_id = Column(Integer, ForeignKey('person.id'))
    responsible = relationship("Person", foreign_keys=[responsible_id])
    
    # Relationships
    participants = relationship("Person", secondary="ticket_participant")
    subscribers = relationship("Subscriber", back_populates="ticket")
    attachments = relationship("Attachment", back_populates="ticket")
    
    # Related tasks
    parent_task_id = Column(Integer, nullable=True)
    linked_task_ids = Column(ARRAY(Integer))
    
    # Status
    status = Column(String, nullable=False)  # draft, sent, signed, cancelled
    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)


# Association table for many-to-many relationship between Ticket and Person (participants)
ticket_participant = Table(
    'ticket_participant',
    Base.metadata,
    Column('ticket_id', UUID(as_uuid=True), ForeignKey('ticket.id')),
    Column('person_id', Integer, ForeignKey('person.id'))
) 