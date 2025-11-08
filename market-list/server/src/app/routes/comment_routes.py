from flask_openapi3 import Tag
from src.app.schemas import (
    ComentarioSchema,
    ErrorSchema,
    ProdutoViewSchema,
    apresenta_produto,
)
from src.core.exceptions import CommentCreationError, ProductNotFound
from src.core.use_cases.add_comment import AddCommentUseCase

comentario_tag = Tag(
    name="Comentario",
    description="Adição de um comentário à um produtos cadastrado na base",
)


def register_comment_routes(
    app, add_comment_use_case: AddCommentUseCase
) -> None:
    def _handle_comment(form: ComentarioSchema):
        try:
            produto = add_comment_use_case.execute(form.produto_id, form.texto)
            return apresenta_produto(produto), 200
        except ProductNotFound as error:
            return {"mesage": str(error)}, 404
        except CommentCreationError:
            return {"mesage": "Não foi possível adicionar o comentário."}, 400

    @app.post(
        "/comentario",
        tags=[comentario_tag],
        responses={
            "200": ProdutoViewSchema,
            "404": ErrorSchema,
            "400": ErrorSchema,
        },
    )
    def add_comentario(form: ComentarioSchema):
        return _handle_comment(form)

    @app.post(
        "/cometario",
        tags=[comentario_tag],
        responses={
            "200": ProdutoViewSchema,
            "404": ErrorSchema,
            "400": ErrorSchema,
        },
    )
    def add_cometario(form: ComentarioSchema):
        return _handle_comment(form)
