from sqlalchemy import Column, String, Integer, DateTime, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Union
from datetime import date

from model import Base

# Criando estrutura de dados para o modelo de produto.
class Tarefa(Base):
    """Classe para representar uma tarefa.

    Args:
        Base ()
        
    Attributes:
        id (int): Identificador único da tarefa
        titulo (str): Título da tarefa
        descricao (str): Descrição da tarefa
        status (str): Status da tarefa
        data_criacao (datetime): Data de criação da tarefa
        prazo (date): Prazo para realização da tarefa
    """
    
    __tablename__ = 'tarefas'
    
    # Configrando cada coluna da tabela de produtos.
    id = Column("id_tarefa", Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(140), unique=True)
    descricao = Column(String(4000))
    status = Column(Enum('Pendente', 'Concluida', 'Em Andamento', 'Urgente',
                         name='status_tarefa'))
    data_criacao = Column(DateTime, default=datetime.now())
    prazo = Column(DateTime)
    
    # Criando método construtor para a classe Produto.
    # Ele é opcional quando se utiliza o SQLALCHEMY, mas é uma boa prática para garantir que os dados necessários sejam passados.
    def __init__(self, titulo:str, descricao:str, status:str, prazo:DateTime,
                 data_criacao:Union[DateTime, None] = None):
        """
        Cria um Produto

        Arguments:
            nome: nome do produto.
            quantidade: quantidade que se espera comprar daquele produto
            valor: valor esperado para o produto
        """
        self.titulo = titulo
        self.descricao = descricao
        self.status = status
        self.prazo = prazo
        
        # se não for informada, será o data exata da inserção no banco
        if data_criacao:
            self.data_insercao = data_criacao