from datetime import datetime, date
from typing import Optional, List
from uuid import UUID
from pydantic import BaseModel, HttpUrl


class PersonBase(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    type: str


class AttachmentBase(BaseModel):
    id: int
    name: str
    size: int
    md5: str
    url: HttpUrl
    version: int
    root_id: int


class SubscriberBase(BaseModel):
    person: PersonBase
    approval_choice: str


class TicketBase(BaseModel):
    external_id: int
    text: str
    create_date: datetime
    last_modified_date: datetime
    author: PersonBase
    due_date: Optional[date] = None
    due: Optional[datetime] = None
    duration: Optional[int] = None
    close_date: Optional[datetime] = None
    current_step: Optional[int] = None
    list_ids: List[int] = []
    responsible: Optional[PersonBase] = None
    participants: List[PersonBase] = []
    subscribers: List[SubscriberBase] = []
    attachments: List[AttachmentBase] = []
    parent_task_id: Optional[int] = None
    linked_task_ids: List[int] = []
    status: str  # draft, sent, signed, cancelled


class TicketCreate(TicketBase):
    pass


class TicketUpdate(BaseModel):
    text: Optional[str] = None
    due_date: Optional[date] = None
    due: Optional[datetime] = None
    duration: Optional[int] = None
    current_step: Optional[int] = None
    list_ids: Optional[List[int]] = None
    responsible: Optional[PersonBase] = None
    participants: Optional[List[PersonBase]] = None
    subscribers: Optional[List[SubscriberBase]] = None
    status: Optional[str] = None


class TicketInDBBase(TicketBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Ticket(TicketInDBBase):
    pass


# Additional schemas for nested objects
class Person(PersonBase):
    class Config:
        from_attributes = True


class Attachment(AttachmentBase):
    ticket_id: UUID

    class Config:
        from_attributes = True


class Subscriber(BaseModel):
    id: UUID
    person: Person
    approval_choice: str
    ticket_id: UUID

    class Config:
        from_attributes = True 