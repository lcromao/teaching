# O __init__.py é um arquivo que indica que a pasta em que ele está é um pacote 
# Python. permite uma estruturação clara do código em pacotes e subpacotes, 
# além de oferecer um meio de executar código de inicialização e controlar 
# o que é exportado pelo pacote.

from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os

from model.base import Base
from model.tarefa import Tarefa

# Definindo path para o banco de dados
db_path = "database/"

# Verificando a exitência do diretório
if not os.path.exists(db_path):
    os.makedirs(db_path)
    
# Definindo URL para o banco de dados
db_url = f'sqlite:///{db_path}/db.sqlite3' 

# Criando engine para realizar a conexão com o bd
# echo=False para não exibir as queries executadas
engine = create_engine(db_url, echo=False)

# Instancia um criador de seção com o banco
Session = sessionmaker(bind=engine)

# Criando o banco de dados se ele não existir
if not database_exists(engine.url):
    create_database(engine.url)
    
# Criando as tabelas do banco de dados, caso não existam
Base.metadata.create_all(engine)