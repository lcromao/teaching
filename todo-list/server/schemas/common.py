"""Shared schemas."""
from pydantic import BaseModel


class ErrorResponse(BaseModel):
    detail: str
