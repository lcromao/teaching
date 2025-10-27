from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class Comment:
    """Domain representation of a product comment."""

    texto: str
    produto_id: int
    data_insercao: datetime = field(default_factory=datetime.utcnow)
    id: Optional[int] = None
