from sqlmodel import SQLModel, Field, Column
import sqlalchemy.dialects.postgresql as pg
from sqlalchemy import Date, Integer
from typing import Optional
from datetime import datetime, date
import uuid


class Book(SQLModel, table=True):
    """This module defines the Book model for your FastAPI application using SQLModel, which integrates SQLAlchemy and Pydantic for ORM and data validation."""
    __tablename__ = "books"

    id: Optional[int] = Field(
        default=None,
        sa_column=Column(Integer, primary_key=True, autoincrement=True)
    )
    uid: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        sa_column=Column(pg.UUID, nullable=False, unique=True)
    )
    title: str
    author: str
    publisher: str
    published_date: date 
    page_count: int
    language: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self):
        return (
            f"Book(id={self.id}, title={self.title}, author={self.author}, "
            f"publisher={self.publisher}, published_date={self.published_date}, "
            f"page_count={self.page_count}, language={self.language})"
        )