import pytest
from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.exceptions import CommentCreationError, ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.use_cases.add_comment import AddCommentUseCase


class CommentingRepository(ProductRepository):
    def __init__(self, products: list[Product], fail_on_add: bool = False):
        self._products = products
        self._fail_on_add = fail_on_add

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

    def add_comment(self, product_id: int, comment: Comment) -> Product:
        if self._fail_on_add:
            raise RuntimeError("database unavailable")

        product = self.get_by_id(product_id)
        if product is None:  # pragma: no cover - safeguarded by use case
            raise ProductNotFound("Produto não encontrado")

        product.add_comment(comment)
        return product


def test_execute_attaches_comment_to_product() -> None:
    product = Product(nome="Arroz", quantidade=2, valor=10.5, id=1)
    repository = CommentingRepository([product])
    use_case = AddCommentUseCase(repository)

    updated = use_case.execute(produto_id=1, texto="Ótimo produto")

    assert len(updated.comentarios) == 1
    assert updated.comentarios[0].texto == "Ótimo produto"


def test_execute_raises_when_product_missing() -> None:
    repository = CommentingRepository(products=[])
    use_case = AddCommentUseCase(repository)

    with pytest.raises(ProductNotFound):
        use_case.execute(produto_id=99, texto="Teste")


def test_execute_wraps_infrastructure_errors() -> None:
    product = Product(nome="Arroz", quantidade=2, valor=10.5, id=1)
    repository = CommentingRepository([product], fail_on_add=True)
    use_case = AddCommentUseCase(repository)

    with pytest.raises(CommentCreationError):
        use_case.execute(produto_id=1, texto="Falha")
