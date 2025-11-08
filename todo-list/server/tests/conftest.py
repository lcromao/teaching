import os
import sys
from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

# Ensure project root (directory that contains main.py) is on sys.path
CURRENT_DIR = os.path.dirname(__file__)
ROOT_DIR = os.path.abspath(os.path.join(CURRENT_DIR, os.pardir))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

import main as app_module  # noqa: E402
from database import Base  # noqa: E402


# Create an in-memory SQLite that persists across connections within the process
# StaticPool ensures the same connection is reused so the schema created via
# Base.metadata.create_all() remains visible to sessions.
engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db() -> Generator:
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(autouse=True)
def setup_db() -> Generator[None, None, None]:
    # Ensure models are imported so tables are registered
    from entities import task, user  # noqa: F401
    # Recreate schema before each test function to isolate state
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield


@pytest.fixture()
def client() -> Generator[TestClient, None, None]:
    # Override the app's DB dependency
    app_module.app.dependency_overrides[app_module.get_db] = override_get_db
    with TestClient(app_module.app) as c:
        yield c


def auth_headers(token: str) -> dict[str, str]:
    return {"Authorization": f"Bearer {token}"}
