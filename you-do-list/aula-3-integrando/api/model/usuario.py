from sqlalchemy import Column, String, Integer, DateTime, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union
from datetime import date

from model import Base

# Criando estrutura de dados para o modelo de usuario.
class Usuario(Base):
    __tablename__ = 'usuarios'
    
    # Configrando cada coluna da tabela de produtos.
    id = Column("id_usuario", Integer, primary_key=True, autoincrement=True)
    nome = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)
    
    # Criando método construtor para a classe Usuario.
    # Ele é opcional quando se utiliza o SQLALCHEMY, mas é uma boa prática para garantir que os dados necessários sejam passados.
    def __init__(self, nome:str, email:str, password_hash:str):
        """
        Cria um Usuario

        Arguments:
            nome: nome do usuario.
            email: email do usuario
            password_hash: senha do usuario
        """
        self.nome = nome
        self.email = email
        self.password_hash = password_hash