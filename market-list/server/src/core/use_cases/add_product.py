from typing import Optional

from src.core.entities.product import Product
from src.core.exceptions import ProductAlreadyExists
from src.core.interfaces.product_repository import ProductRepository
from src.core.interfaces.usecase_interface import UseCase


class AddProductUseCase(UseCase):
    """Use case responsible for registering a new product."""

    def __init__(self, repository: ProductRepository):
        self._repository = repository

    def execute(
        self, nome: str, quantidade: Optional[int], valor: float
    ) -> Product:
        if self._repository.get_by_name(nome):
            raise ProductAlreadyExists(f"Produto '{nome}' já existe.")

        product = Product(nome=nome, quantidade=quantidade, valor=valor)
        return self._repository.add(product)
