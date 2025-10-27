from datetime import datetime
from typing import Optional

from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.orm import relationship
from src.infra.db.base import Base


class ProductModel(Base):
    __tablename__ = "produto"

    id: Optional[int] = Column("pk_produto", Integer, primary_key=True)
    nome = Column(String(140), unique=True, nullable=False)
    quantidade = Column(Integer)
    valor = Column(Float, nullable=False)
    data_insercao = Column(DateTime, default=datetime.utcnow)

    comentarios = relationship(
        "CommentModel",
        back_populates="produto",
        cascade="all, delete-orphan",
        lazy="joined",
    )
