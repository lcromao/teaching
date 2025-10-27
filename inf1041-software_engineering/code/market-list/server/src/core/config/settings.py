import os
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[3]
DATABASE_DIR = Path(os.getenv("DATABASE_DIR", PROJECT_ROOT / "database"))
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DATABASE_DIR / 'db.sqlite3'}")
LOG_DIR = Path(os.getenv("LOG_DIR", PROJECT_ROOT / "log"))
