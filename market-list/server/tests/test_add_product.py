import pytest
from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.exceptions import ProductAlreadyExists
from src.core.interfaces.product_repository import ProductRepository
from src.core.use_cases.add_product import AddProductUseCase


class InMemoryProductRepository(ProductRepository):
    def __init__(self) -> None:
        self._products: list[Product] = []

    def add(self, product: Product) -> Product:
        product.id = len(self._products) + 1
        self._products.append(product)
        return product

    def list_all(self) -> list[Product]:
        return list(self._products)

    def get_by_id(self, product_id: int) -> Product | None:
        return next((p for p in self._products if p.id == product_id), None)

    def get_by_name(self, name: str) -> Product | None:
        return next((p for p in self._products if p.nome == name), None)

    def delete_by_name(self, name: str) -> bool:
        before = len(self._products)
        self._products = [p for p in self._products if p.nome != name]
        return len(self._products) != before

    def add_comment(self, product_id: int, comment: Comment) -> Product:
        raise NotImplementedError


def test_execute_adds_new_product() -> None:
    repository = InMemoryProductRepository()
    use_case = AddProductUseCase(repository)

    created = use_case.execute(nome="Arroz", quantidade=2, valor=10.5)

    assert created.id == 1
    assert created.nome == "Arroz"
    assert repository.get_by_name("Arroz") is created


def test_execute_raises_when_product_already_exists() -> None:
    repository = InMemoryProductRepository()
    repository.add(Product(nome="Arroz", quantidade=1, valor=5.0))
    use_case = AddProductUseCase(repository)

    with pytest.raises(ProductAlreadyExists):
        use_case.execute(nome="Arroz", quantidade=2, valor=10.5)
