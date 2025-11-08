"""User schemas."""
from typing import List

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(min_length=4, max_length=72)


class UserRead(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UserList(BaseModel):
    users: List[UserRead]
