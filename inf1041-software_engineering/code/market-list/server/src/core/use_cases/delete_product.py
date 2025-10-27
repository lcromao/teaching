from src.core.exceptions import ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.interfaces.usecase_interface import UseCase


class DeleteProductUseCase(UseCase):
    """Use case responsible for removing a product by name."""

    def __init__(self, repository: ProductRepository):
        self._repository = repository

    def execute(self, nome: str) -> None:
        removed = self._repository.delete_by_name(nome)
        if not removed:
            raise ProductNotFound(f"Produto '{nome}' não encontrado.")
