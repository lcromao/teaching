from typing import List

from src.core.entities.product import Product
from src.infra.db.models.product_model import ProductModel
from src.infra.mappers import comment_mapper


def to_domain(model: ProductModel) -> Product:
    comentarios = [comment_mapper.to_domain(c) for c in model.comentarios]
    return Product(
        id=model.id,
        nome=model.nome,
        quantidade=model.quantidade,
        valor=model.valor,
        data_insercao=model.data_insercao,
        comentarios=comentarios,
    )


def to_domain_list(models: List[ProductModel]) -> List[Product]:
    return [to_domain(model) for model in models]
