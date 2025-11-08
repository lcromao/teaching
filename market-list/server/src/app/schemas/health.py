from typing import Dict

from pydantic import BaseModel


class HealthChecksSchema(BaseModel):
    database: str
    cache: str
    external_services: str


class HealthCheckSchema(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str
    checks: HealthChecksSchema


def apresenta_health(payload: dict) -> dict:
    return payload
