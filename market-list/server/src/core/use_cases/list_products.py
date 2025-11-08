from typing import List

from src.core.entities.product import Product
from src.core.interfaces.product_repository import ProductRepository
from src.core.interfaces.usecase_interface import UseCase


class ListProductsUseCase(UseCase):
    """Use case responsible for listing all products."""

    def __init__(self, repository: ProductRepository):
        self._repository = repository

    def execute(self) -> List[Product]:
        return self._repository.list_all()
