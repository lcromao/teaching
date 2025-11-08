from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.interfaces.product_repository import ProductRepository
from src.core.use_cases.list_products import ListProductsUseCase


class StubProductRepository(ProductRepository):
    def __init__(self, products: list[Product]) -> None:
        self._products = products

    def add(self, product: Product) -> Product:  # pragma: no cover - unused
        raise NotImplementedError

    def list_all(self) -> list[Product]:
        return list(self._products)

    def get_by_id(self, product_id: int) -> Product | None:  # pragma: no cover
        raise NotImplementedError

    def get_by_name(self, name: str) -> Product | None:  # pragma: no cover
        raise NotImplementedError

    def delete_by_name(self, name: str) -> bool:  # pragma: no cover - unused
        raise NotImplementedError

    def add_comment(
        self, product_id: int, comment: Comment
    ) -> Product:  # pragma: no cover - unused
        raise NotImplementedError


def test_execute_returns_products_from_repository() -> None:
    products = [
        Product(nome="Arroz", quantidade=2, valor=10.5, id=1),
        Product(nome="Feijão", quantidade=1, valor=8.0, id=2),
    ]
    repository = StubProductRepository(products)
    use_case = ListProductsUseCase(repository)

    result = use_case.execute()

    assert result == products
    assert all(isinstance(item, Product) for item in result)
