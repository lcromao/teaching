import pytest
from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.exceptions import ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.use_cases.delete_product import DeleteProductUseCase


class MutableProductRepository(ProductRepository):
    def __init__(self, products: list[Product]) -> None:
        self._products = products

    def add(self, product: Product) -> Product:  # pragma: no cover - unused
        raise NotImplementedError

    def list_all(self) -> list[Product]:  # pragma: no cover - unused
        return list(self._products)

    def get_by_id(self, product_id: int) -> Product | None:  # pragma: no cover
        raise NotImplementedError

    def get_by_name(self, name: str) -> Product | None:  # pragma: no cover
        raise NotImplementedError

    def delete_by_name(self, name: str) -> bool:
        before = len(self._products)
        self._products = [p for p in self._products if p.nome != name]
        return len(self._products) != before

    def add_comment(
        self, product_id: int, comment: Comment
    ) -> Product:  # pragma: no cover - unused
        raise NotImplementedError


def test_execute_removes_existing_product() -> None:
    repository = MutableProductRepository(
        [Product(nome="Arroz", quantidade=2, valor=10.5, id=1)]
    )
    use_case = DeleteProductUseCase(repository)

    use_case.execute(nome="Arroz")

    assert repository.list_all() == []


def test_execute_raises_when_product_missing() -> None:
    repository = MutableProductRepository(products=[])
    use_case = DeleteProductUseCase(repository)

    with pytest.raises(ProductNotFound):
        use_case.execute(nome="Arroz")
