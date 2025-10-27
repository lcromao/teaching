from functools import lru_cache

from src.core.config import EnvConfigService
from src.core.use_cases.add_comment import AddCommentUseCase
from src.core.use_cases.add_product import AddProductUseCase
from src.core.use_cases.delete_product import DeleteProductUseCase
from src.core.use_cases.get_product import GetProductUseCase
from src.core.use_cases.health_check import HealthCheckUseCase
from src.core.use_cases.list_products import ListProductsUseCase
from src.infra.db import SessionLocal
from src.infra.repositories import SqlAlchemyProductRepository


@lru_cache
def get_env_config_service() -> EnvConfigService:
    return EnvConfigService()


@lru_cache
def get_product_repository() -> SqlAlchemyProductRepository:
    return SqlAlchemyProductRepository(SessionLocal)


@lru_cache
def get_add_product_use_case() -> AddProductUseCase:
    return AddProductUseCase(get_product_repository())


@lru_cache
def get_list_products_use_case() -> ListProductsUseCase:
    return ListProductsUseCase(get_product_repository())


@lru_cache
def get_get_product_use_case() -> GetProductUseCase:
    return GetProductUseCase(get_product_repository())


@lru_cache
def get_delete_product_use_case() -> DeleteProductUseCase:
    return DeleteProductUseCase(get_product_repository())


@lru_cache
def get_add_comment_use_case() -> AddCommentUseCase:
    return AddCommentUseCase(get_product_repository())


@lru_cache
def get_health_check_use_case() -> HealthCheckUseCase:
    config_service = get_env_config_service()
    return HealthCheckUseCase(
        service_name_provider=config_service.get_service_name,
        service_version_provider=config_service.get_service_version,
    )
