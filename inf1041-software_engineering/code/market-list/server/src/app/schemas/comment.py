from pydantic import BaseModel


class ComentarioSchema(BaseModel):
    """Payload para criação de comentários."""

    produto_id: int
    texto: str
