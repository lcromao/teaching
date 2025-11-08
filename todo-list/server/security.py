"""Authentication helpers for the Todo API."""
from datetime import datetime, timedelta
import os

import bcrypt
from fastapi import HTTPException, status
from jose import JWTError, jwt

SECRET_KEY = os.getenv("TODO_SECRET_KEY", "super-secret-key-change-me")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24


def _ensure_bytes(password: str) -> bytes:
    value = password.encode("utf-8")
    # bcrypt only considers the first 72 bytes; truncate to avoid ValueError on some builds
    return value[:72]


def hash_password(password: str) -> str:
    password_bytes = _ensure_bytes(password)
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(_ensure_bytes(plain_password), hashed_password.encode("utf-8"))
    except ValueError:
        # hashed_password not valid bcrypt hash
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Senha inválida")


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido") from exc
