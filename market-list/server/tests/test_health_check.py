from datetime import datetime, timezone

from src.core.use_cases.health_check import HealthCheckUseCase


def test_execute_returns_expected_payload() -> None:
    use_case = HealthCheckUseCase(
        service_name_provider=lambda: "Market List API",
        service_version_provider=lambda: "1.0.0",
        timestamp_provider=lambda: datetime(2025, 1, 1, tzinfo=timezone.utc),
        checks_provider=lambda: {"database": "ok"},
    )

    payload = use_case.execute()

    assert payload["status"] == "healthy"
    assert payload["service"] == "Market List API"
    assert payload["version"] == "1.0.0"
    assert payload["timestamp"] == "2025-01-01T00:00:00Z"
    assert payload["checks"] == {"database": "ok"}


def test_execute_normalizes_naive_timestamp() -> None:
    naive_timestamp = datetime(2025, 1, 1, 12, 30, 45)
    use_case = HealthCheckUseCase(
        service_name_provider=lambda: "service",
        service_version_provider=lambda: "version",
        timestamp_provider=lambda: naive_timestamp,
    )

    payload = use_case.execute()

    timestamp = payload["timestamp"]
    assert isinstance(timestamp, str)
    assert timestamp.endswith("Z")
