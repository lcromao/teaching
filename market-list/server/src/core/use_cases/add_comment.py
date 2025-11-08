from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.exceptions import CommentCreationError, ProductNotFound
from src.core.interfaces.product_repository import ProductRepository
from src.core.interfaces.usecase_interface import UseCase


class AddCommentUseCase(UseCase):
    """Use case responsible for attaching a comment to an existing product."""

    def __init__(self, repository: ProductRepository):
        self._repository = repository

    def execute(self, produto_id: int, texto: str) -> Product:
        product = self._repository.get_by_id(produto_id)
        if not product:
            raise ProductNotFound(
                f"Produto com id '{produto_id}' não encontrado."
            )

        comment = Comment(texto=texto, produto_id=produto_id)

        try:
            return self._repository.add_comment(produto_id, comment)
        except (
            Exception
        ) as exc:  # pragma: no cover - safeguard against infra errors
            raise CommentCreationError(
                "Não foi possível adicionar o comentário."
            ) from exc
