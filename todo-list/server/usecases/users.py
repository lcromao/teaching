"""User related business logic."""
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from entities import User
from schemas import UserCreate
from security import hash_password, verify_password


def create_user(db: Session, payload: UserCreate) -> User:
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="E-mail já cadastrado")

    user = User(
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def list_users(db: Session) -> list[User]:
    return db.query(User).order_by(User.name).all()


def get_user(db: Session, user_id: int) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    return user


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def authenticate_user(db: Session, email: str, password: str) -> User:
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
    return user
