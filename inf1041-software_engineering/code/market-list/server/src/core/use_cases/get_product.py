from src.core.entities.product import Product
from src.core.exceptions import ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.interfaces.usecase_interface import UseCase


class GetProductUseCase(UseCase):
    """Use case responsible for retrieving a single product by id."""

    def __init__(self, repository: ProductRepository):
        self._repository = repository

    def execute(self, product_id: int) -> Product:
        product = self._repository.get_by_id(product_id)
        if not product:
            raise ProductNotFound(
                f"Produto com id '{product_id}' não encontrado."
            )
        return product
