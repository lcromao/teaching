from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from src.infra.db.base import Base


class CommentModel(Base):
    __tablename__ = "comentario"

    id: Optional[int] = Column(Integer, primary_key=True)
    texto = Column(String(4000), nullable=False)
    data_insercao = Column(DateTime, default=datetime.utcnow)
    produto_id = Column(
        Integer, ForeignKey("produto.pk_produto"), nullable=False
    )

    produto = relationship("ProductModel", back_populates="comentarios")
