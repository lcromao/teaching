"""Task schemas."""
from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    deadline: Optional[date] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    deadline: Optional[date] = None


class TaskRead(TaskBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskList(BaseModel):
    tasks: List[TaskRead]
