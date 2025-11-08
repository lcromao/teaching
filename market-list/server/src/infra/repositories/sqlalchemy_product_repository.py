from typing import Callable, List, Optional

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from src.core.entities.comment import Comment
from src.core.entities.product import Product
from src.core.interfaces.product_repository import ProductRepository
from src.infra.db.models.comment_model import CommentModel
from src.infra.db.models.product_model import ProductModel
from src.infra.mappers import product_mapper


class SqlAlchemyProductRepository(ProductRepository):
    """SQLAlchemy implementation of the product repository port."""

    def __init__(self, session_factory: Callable[[], Session]):
        self._session_factory = session_factory

    def add(self, product: Product) -> Product:
        session = self._session_factory()
        try:
            model = ProductModel(
                nome=product.nome,
                quantidade=product.quantidade,
                valor=product.valor,
                data_insercao=product.data_insercao,
            )
            session.add(model)
            session.commit()
            session.refresh(model)
            return product_mapper.to_domain(model)
        except IntegrityError:
            session.rollback()
            raise
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    def list_all(self) -> List[Product]:
        session = self._session_factory()
        try:
            models = session.query(ProductModel).all()
            return product_mapper.to_domain_list(models)
        finally:
            session.close()

    def get_by_id(self, product_id: int) -> Optional[Product]:
        session = self._session_factory()
        try:
            model = (
                session.query(ProductModel)
                .filter(ProductModel.id == product_id)
                .first()
            )
            return product_mapper.to_domain(model) if model else None
        finally:
            session.close()

    def get_by_name(self, name: str) -> Optional[Product]:
        session = self._session_factory()
        try:
            model = (
                session.query(ProductModel)
                .filter(ProductModel.nome == name)
                .first()
            )
            return product_mapper.to_domain(model) if model else None
        finally:
            session.close()

    def delete_by_name(self, name: str) -> bool:
        session = self._session_factory()
        try:
            count = (
                session.query(ProductModel)
                .filter(ProductModel.nome == name)
                .delete()
            )
            session.commit()
            return bool(count)
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

    def add_comment(self, product_id: int, comment: Comment) -> Product:
        session = self._session_factory()
        try:
            product_model = (
                session.query(ProductModel)
                .filter(ProductModel.id == product_id)
                .first()
            )
            if not product_model:
                raise ValueError(
                    "Produto não encontrado para adicionar comentário."
                )

            comment_model = CommentModel(
                texto=comment.texto,
                data_insercao=comment.data_insercao,
                produto_id=product_id,
            )
            session.add(comment_model)
            session.commit()
            session.refresh(product_model)
            # reload comments for consistent mapping
            session.refresh(product_model, attribute_names=["comentarios"])
            return product_mapper.to_domain(product_model)
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
