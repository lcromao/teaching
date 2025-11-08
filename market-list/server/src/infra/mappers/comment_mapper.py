from src.core.entities.comment import Comment
from src.infra.db.models.comment_model import CommentModel


def to_domain(model: CommentModel) -> Comment:
    return Comment(
        id=model.id,
        texto=model.texto,
        produto_id=model.produto_id,
        data_insercao=model.data_insercao,
    )


def to_model(comment: Comment) -> CommentModel:
    return CommentModel(
        texto=comment.texto,
        data_insercao=comment.data_insercao,
        produto_id=comment.produto_id,
    )
