from datetime import datetime, timezone
from typing import Callable, Dict

from src.core.interfaces.usecase_interface import UseCase


class HealthCheckUseCase(UseCase):
    """Gera o payload de health check da aplicação."""

    def __init__(
        self,
        service_name_provider: Callable[[], str],
        service_version_provider: Callable[[], str],
        timestamp_provider: Callable[[], datetime] | None = None,
        checks_provider: Callable[[], Dict[str, str]] | None = None,
    ) -> None:
        self._service_name_provider = service_name_provider
        self._service_version_provider = service_version_provider
        self._timestamp_provider = (
            timestamp_provider or self._default_timestamp
        )
        self._checks_provider = checks_provider or self._default_checks

    def _default_timestamp(self) -> datetime:
        return datetime.now(tz=timezone.utc)

    def _default_checks(self) -> Dict[str, str]:
        return {
            "database": "healthy",
            "cache": "healthy",
            "external_services": "healthy",
        }

    def execute(self) -> Dict[str, object]:
        timestamp = (
            self._timestamp_provider().replace(microsecond=0).isoformat()
        )
        if not timestamp.endswith("Z"):
            timestamp = f"{timestamp}Z"

        return {
            "status": "healthy",
            "service": self._service_name_provider(),
            "version": self._service_version_provider(),
            "timestamp": timestamp,
            "checks": self._checks_provider(),
        }
