from sqlmodel import SQLModel, Field, Column, Relationship
import sqlalchemy.dialects.postgresql as pg
import uuid
from datetime import datetime
from typing import List, Optional

class User(SQLModel, table=True):
    __tablename__ = "users"
    uid: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            primary_key=True,
            nullable=False,
            default=uuid.uuid4
        )
    )
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    password_hash: str = Field(exclude=True)
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            pg.TIMESTAMP(timezone=True),
            nullable=False
        )
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            pg.TIMESTAMP(timezone=True),
            nullable=False,
            onupdate=datetime.utcnow
        )
    )
    posts: List["Post"] = Relationship(back_populates="owner", sa_relationship_kwargs={"lazy": "selectin"})

    def __repr__(self):
        return f"<User {self.username}>"


class Post(SQLModel, table=True):
    __tablename__ = "posts"
    uid: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            primary_key=True,
            nullable=False,
            default=uuid.uuid4
        )
    )
    title: str
    content: str
    tags: str | None = None
    owner_id: Optional[uuid.UUID] = Field(default=None, foreign_key="users.uid")
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            pg.TIMESTAMP(timezone=True),
            nullable=False
        )
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(
            pg.TIMESTAMP(timezone=True),
            nullable=False,
            onupdate=datetime.utcnow
        )
    )
    owner: Optional["User"] = Relationship(back_populates="posts")
    images: List["Image"] = Relationship( back_populates="post",sa_relationship_kwargs={"lazy": "selectin"})

    def __repr__(self):
        return f"<Post {self.uid}>"


class Image(SQLModel, table=True):
    __tablename__ = "images"
    uid: uuid.UUID = Field(
        sa_column=Column(
            pg.UUID,
            nullable=False,
            primary_key=True,
            default=uuid.uuid4
        )
    )
    image_url: str
    public_id: Optional[str] = None
    post_id: Optional[uuid.UUID] = Field( default=None,foreign_key="posts.uid")
    created_at: datetime = Field(
        sa_column=Column(
            pg.TIMESTAMP,
            default=datetime.utcnow
        )
    )
    post: Optional["Post"] = Relationship(back_populates="images")

    def __repr__(self):
        return f"<Image {self.uid}>"
