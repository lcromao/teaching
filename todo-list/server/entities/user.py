"""User ORM entity."""
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False, index=True)
    password = Column(String(128), nullable=False)

    tasks = relationship(
        "Task",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
