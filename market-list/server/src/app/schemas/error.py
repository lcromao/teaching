from pydantic import BaseModel


class ErrorSchema(BaseModel):
    """Estrutura padrão para erros da API."""

    mesage: str
