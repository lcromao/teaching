from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, scoped_session, sessionmaker
from sqlalchemy_utils import create_database, database_exists
from src.core.config.settings import DATABASE_DIR, DATABASE_URL
from src.infra.db.base import Base
from src.infra.db.models import (  # noqa: F401 - ensure metadata
    CommentModel,
    ProductModel,
)

DATABASE_DIR.mkdir(parents=True, exist_ok=True)

engine = create_engine(DATABASE_URL, echo=False, future=True)

if not database_exists(engine.url):
    create_database(engine.url)

Base.metadata.create_all(engine)

SessionLocal = scoped_session(
    sessionmaker(bind=engine, expire_on_commit=False)
)


@contextmanager
def session_scope() -> Session:
    """Provide a transactional scope for a series of operations."""
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
