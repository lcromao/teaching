"""Task ORM entity."""
from datetime import datetime
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(140), nullable=False)
    description = Column(Text, nullable=True)
    deadline = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    owner = relationship("User", back_populates="tasks")

    # Expose a read-only alias used by response schemas
    @property
    def user_id(self) -> int:  # pragma: no cover - trivial alias
        return self.owner_id
