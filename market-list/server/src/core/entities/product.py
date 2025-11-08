from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional

from src.core.entities.comment import Comment


@dataclass
class Product:
    """Domain representation of a product."""

    nome: str
    quantidade: Optional[int]
    valor: float
    data_insercao: datetime = field(default_factory=datetime.utcnow)
    id: Optional[int] = None
    comentarios: List[Comment] = field(default_factory=list)

    def add_comment(self, comment: Comment) -> None:
        """Attach a comment to this product."""
        self.comentarios.append(comment)
