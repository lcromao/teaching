"""Authentication related schemas."""
from pydantic import BaseModel, EmailStr

from .user import UserRead


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(Token):
    user: UserRead
