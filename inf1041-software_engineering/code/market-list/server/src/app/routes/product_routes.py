from urllib.parse import unquote

from flask_openapi3 import Tag
from src.app.schemas import (
    ErrorSchema,
    ListagemProdutosSchema,
    ProdutoBuscaPorNomeSchema,
    ProdutoBuscaSchema,
    ProdutoDelSchema,
    ProdutoSchema,
    ProdutoViewSchema,
    apresenta_produto,
    apresenta_produtos,
)
from src.core.exceptions import ProductAlreadyExists, ProductNotFound
from src.core.use_cases.add_product import AddProductUseCase
from src.core.use_cases.delete_product import DeleteProductUseCase
from src.core.use_cases.get_product import GetProductUseCase
from src.core.use_cases.list_products import ListProductsUseCase

produto_tag = Tag(
    name="Produto",
    description="Adição, visualização e remoção de produtos à base",
)


def register_product_routes(
    app,
    add_use_case: AddProductUseCase,
    list_use_case: ListProductsUseCase,
    get_use_case: GetProductUseCase,
    delete_use_case: DeleteProductUseCase,
) -> None:
    @app.post(
        "/produto",
        tags=[produto_tag],
        responses={
            "200": ProdutoViewSchema,
            "409": ErrorSchema,
            "400": ErrorSchema,
        },
    )
    def add_produto(form: ProdutoSchema):
        try:
            produto = add_use_case.execute(
                form.nome, form.quantidade, form.valor
            )
            return apresenta_produto(produto), 200
        except ProductAlreadyExists as error:
            return {"mesage": str(error)}, 409
        except Exception:
            return {"mesage": "Não foi possível salvar novo item :/"}, 400

    @app.get(
        "/produtos",
        tags=[produto_tag],
        responses={"200": ListagemProdutosSchema, "404": ErrorSchema},
    )
    def get_produtos():
        produtos = list_use_case.execute()
        if not produtos:
            return {"produtos": []}, 200
        return apresenta_produtos(produtos), 200

    @app.get(
        "/produto",
        tags=[produto_tag],
        responses={"200": ProdutoViewSchema, "404": ErrorSchema},
    )
    def get_produto(query: ProdutoBuscaSchema):
        try:
            produto = get_use_case.execute(query.id)
            return apresenta_produto(produto), 200
        except ProductNotFound as error:
            return {"mesage": str(error)}, 404

    @app.delete(
        "/produto",
        tags=[produto_tag],
        responses={"200": ProdutoDelSchema, "404": ErrorSchema},
    )
    def del_produto(query: ProdutoBuscaPorNomeSchema):
        nome = unquote(unquote(query.nome))
        try:
            delete_use_case.execute(nome)
            return {"mesage": "Produto removido", "nome": nome}, 200
        except ProductNotFound as error:
            return {"mesage": str(error)}, 404
