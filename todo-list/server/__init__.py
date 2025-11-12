"""Database configuration and helpers for the todo list app."""
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

BASE_DIR = Path(__file__).resolve().parent
BASE_DIR.mkdir(parents=True, exist_ok=True)
DB_FILE = BASE_DIR / "db.sqlite"
DATABASE_URL = f"sqlite:///{DB_FILE}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def init_db() -> None:
    """Create database tables if they do not exist."""
    from entities import task, user  # noqa: F401  # ensure models are imported

    Base.metadata.create_all(bind=engine)
