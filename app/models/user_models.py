from sqlmodel import SQLModel, Field, Column
import uuid
from sqlalchemy.dialects import postgresql as pg
from datetime import datetime

class User(SQLModel, table=True):
    __tablename__ = "users"

    uid: uuid.UUID = Field(
        default_factory=uuid.uuid4,
        sa_column=Column(pg.UUID(as_uuid=True), primary_key=True)
    )
    username: str
    email: str
    first_name: str
    last_name: str
    is_verified: bool = Field(default=False)
    password_hash: str = Field(exclude=True)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self):
        return (
            f"User(uid={self.uid}, username={self.username}, email={self.email}, "
            f"first_name={self.first_name}, last_name={self.last_name}, "
            f"is_verified={self.is_verified})"
        )