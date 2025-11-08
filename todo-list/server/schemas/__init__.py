"""Pydantic schemas used by the FastAPI application."""
from .task import TaskCreate, TaskUpdate, TaskRead, TaskList
from .user import UserCreate, UserRead, UserList
from .common import ErrorResponse
from .auth import UserLogin, Token, AuthResponse

__all__ = [
    "TaskCreate",
    "TaskUpdate",
    "TaskRead",
    "TaskList",
    "UserCreate",
    "UserRead",
    "UserList",
    "UserLogin",
    "Token",
    "AuthResponse",
    "ErrorResponse",
]
