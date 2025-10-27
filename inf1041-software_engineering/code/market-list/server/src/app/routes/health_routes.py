from flask_openapi3 import Tag
from src.app.schemas import HealthCheckSchema
from src.core.use_cases.health_check import HealthCheckUseCase

health_tag = Tag(
    name="Health",
    description="Verificação de disponibilidade do serviço",
)


def register_health_routes(app, health_use_case: HealthCheckUseCase) -> None:
    @app.get(
        "/health",
        tags=[health_tag],
        responses={"200": HealthCheckSchema},
    )
    def get_health():
        return health_use_case.execute(), 200
