import os
from pathlib import Path
from typing import Dict, Optional

from src.core.config.env_config_validation import EnvConfigValidation
from src.core.config.settings import DATABASE_URL, LOG_DIR, PROJECT_ROOT


class EnvConfigService:
    """Serviço responsável por carregar e validar as configurações de ambiente."""

    _instance: Optional["EnvConfigService"] = None
    _config: Optional[EnvConfigValidation] = None

    def __new__(cls) -> "EnvConfigService":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self) -> None:
        if self._config is None:
            self._load_config()

    def _load_config(self) -> None:
        env_vars = self._read_env_file()
        config_data = {
            "SERVICE_NAME": self._get_env(
                "SERVICE_NAME", env_vars, "market-list-api"
            ),
            "SERVICE_VERSION": self._get_env(
                "SERVICE_VERSION", env_vars, "1.0.0"
            ),
            "SERVICE_HOST": self._get_env("SERVICE_HOST", env_vars, "0.0.0.0"),
            "SERVICE_PORT": int(self._get_env("SERVICE_PORT", env_vars, 5000)),
            "LOG_LEVEL": self._get_env("LOG_LEVEL", env_vars, "INFO"),
            "DATABASE_URL": self._get_env(
                "DATABASE_URL", env_vars, DATABASE_URL
            ),
            "ENVIRONMENT": self._get_env(
                "ENVIRONMENT", env_vars, "development"
            ),
        }

        self._config = EnvConfigValidation(**config_data)

    def _read_env_file(self) -> Dict[str, str]:
        env_vars: Dict[str, str] = {}
        env_file_path = PROJECT_ROOT / ".env"
        if env_file_path.exists():
            with env_file_path.open("r", encoding="utf-8") as handler:
                for line in handler:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        key, value = line.split("=", 1)
                        env_vars[key.strip()] = value.strip()
        return env_vars

    def _get_env(self, key: str, env_vars: Dict[str, str], default):
        return os.getenv(key, env_vars.get(key, default))

    @property
    def config(self) -> EnvConfigValidation:
        if self._config is None:
            self._load_config()
        return self._config

    def get_service_name(self) -> str:
        return self.config.SERVICE_NAME

    def get_service_version(self) -> str:
        return self.config.SERVICE_VERSION

    def get_service_host(self) -> str:
        return self.config.SERVICE_HOST

    def get_service_port(self) -> int:
        return self.config.SERVICE_PORT

    def get_log_level(self) -> str:
        return self.config.LOG_LEVEL

    def get_database_url(self) -> str:
        return self.config.DATABASE_URL

    def get_environment(self) -> str:
        return self.config.ENVIRONMENT

    def get_log_directory(self) -> Path:
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        return LOG_DIR
