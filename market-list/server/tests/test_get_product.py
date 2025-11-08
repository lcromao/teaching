import pytest
from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.exceptions import ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.use_cases.get_product import GetProductUseCase


class InMemoryProductRepository(ProductRepository):
    def __init__(self, products: list[Product]) -> None:
        self._products = products

    def add(self, product: Product) -> Product:  # pragma: no cover - unused
        raise NotImplementedError

    def list_all(self) -> list[Product]:  # pragma: no cover - unused
        raise NotImplementedError

    def get_by_id(self, product_id: int) -> Product | None:
        return next((p for p in self._products if p.id == product_id), None)

    def get_by_name(self, name: str) -> Product | None:  # pragma: no cover
        raise NotImplementedError

    def delete_by_name(self, name: str) -> bool:  # pragma: no cover - unused
        raise NotImplementedError

    def add_comment(
        self, product_id: int, comment: Comment
    ) -> Product:  # pragma: no cover - unused
        raise NotImplementedError


def test_execute_returns_product_when_found() -> None:
    products = [Product(nome="Arroz", quantidade=2, valor=10.5, id=1)]
    repository = InMemoryProductRepository(products)
    use_case = GetProductUseCase(repository)

    product = use_case.execute(product_id=1)

    assert product.id == 1
    assert product.nome == "Arroz"


def test_execute_raises_when_product_not_found() -> None:
    repository = InMemoryProductRepository(products=[])
    use_case = GetProductUseCase(repository)

    with pytest.raises(ProductNotFound):
        use_case.execute(product_id=42)
