from typing import List, Optional

from pydantic import BaseModel
from src.app.schemas.comment import ComentarioSchema
from src.core.entities.product import Product


class ProdutoSchema(BaseModel):
    """Payload esperado para criação de produtos."""

    nome: str
    quantidade: Optional[int] = None
    valor: float


class ProdutoBuscaSchema(BaseModel):
    """Estrutura de busca por produto usando o identificador."""

    id: int


class ProdutoBuscaPorNomeSchema(BaseModel):
    """Estrutura para operações que utilizam o nome do produto."""

    nome: str


class ListagemProdutosSchema(BaseModel):
    """Listagem de produtos."""

    produtos: List[ProdutoSchema]


class ProdutoViewSchema(BaseModel):
    """Representação de um produto com seus comentários."""

    id: int
    nome: str
    quantidade: Optional[int]
    valor: float
    total_cometarios: int
    comentarios: List[ComentarioSchema]


class ProdutoDelSchema(BaseModel):
    """Retorno após remoção de um produto."""

    mesage: str
    nome: str


def apresenta_produto(produto: Product) -> dict:
    """Converte a entidade de domínio para resposta JSON."""
    return {
        "id": produto.id,
        "nome": produto.nome,
        "quantidade": produto.quantidade,
        "valor": produto.valor,
        "total_cometarios": len(produto.comentarios),
        "comentarios": [
            {"texto": comentario.texto} for comentario in produto.comentarios
        ],
    }


def apresenta_produtos(produtos: List[Product]) -> dict:
    """Converte a lista de produtos para resposta JSON."""
    return {
        "produtos": [
            {
                "nome": produto.nome,
                "quantidade": produto.quantidade,
                "valor": produto.valor,
            }
            for produto in produtos
        ]
    }
