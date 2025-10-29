from typing import Optional

from pydantic import BaseModel, validator


class EnvConfigValidation(BaseModel):
    SERVICE_NAME: str = "market-list-api"
    SERVICE_VERSION: str = "1.0.0"
    SERVICE_HOST: str = "0.0.0.0"
    SERVICE_PORT: int = 5000
    LOG_LEVEL: str = "INFO"
    DATABASE_URL: str
    ENVIRONMENT: str = "development"

    @validator("SERVICE_NAME", "SERVICE_VERSION", "SERVICE_HOST", "DATABASE_URL", pre=True)
    def _strip_values(cls, value: Optional[str]) -> str:
        if value is None:
            raise ValueError("Valor obrigatório ausente")
        value = str(value).strip()
        if not value:
            raise ValueError("Valor obrigatório ausente")
        return value

    @validator("LOG_LEVEL")
    def _validate_log_level(cls, value: str) -> str:
        valid_levels = {"DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"}
        upper = value.upper()
        if upper not in valid_levels:
            raise ValueError(
                f"LOG_LEVEL deve ser um dos seguintes valores: {', '.join(sorted(valid_levels))}"
            )
        return upper

    @validator("SERVICE_PORT")
    def _validate_port(cls, value: int) -> int:
        if not (1 <= int(value) <= 65535):
            raise ValueError("SERVICE_PORT deve estar entre 1 e 65535")
        return int(value)

    @validator("ENVIRONMENT")
    def _validate_environment(cls, value: str) -> str:
        valid_envs = {"development", "staging", "production", "test"}
        value = value.lower()
        if value not in valid_envs:
            raise ValueError(
                f"ENVIRONMENT deve ser um dos seguintes valores: {', '.join(sorted(valid_envs))}"
            )
        return value
