# Objetivo da aula 1 é criar um CRUD de produtos com Flask e SQLAlchemy
# A API utilizada será a OpenAPI 3.0 para abrirmos diretamente no Swagger.

# Importando bibliotecas
from flask import Flask, request, send_from_directory, render_template, redirect, jsonify, render_template
from flask_openapi3 import OpenAPI, Info, Tag
from sqlalchemy.exc import IntegrityError
from flask_restful import Api
from flask_cors import CORS
from datetime import date, datetime
from typing import List

from model import *

from pydantic import BaseModel
from typing import Optional, List



info = Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# Rotas

# Home 
@app.route('/')
def home():
    return {"message": "Hello World!"}
    # return render_template("home.html"), 200
    # return redirect('/openapi')


# Api testing
@app.route('/api')
def api():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')
 
# Criando rota para cadastro de tarefa 
   
class TarefaSchema(BaseModel):
    """ Adiciona uma nova Tarefa à base de dados
    """
    titulo: str = "Preparar aula 1"
    descricao: str = "Preparar aula 1 de desenvolvimento full stack básico"
    status: str = "Pendente"
    prazo: date = "2024-04-14"
    
# Cadastrar uma tarefa
@app.post('/tarefa')
def add_tarefa(form: TarefaSchema):
    """ 
    Adiciona uma nova Tarefa à base de dados
    """
    # Instanciando sessão para conexão com o banco
    session = Session()
    
    # Obtendo os dados do formulãrio de uma forma ligeramente diferente
    titulo=form.titulo
    descricao=form.descricao
    status=form.status
    prazo_str=form.prazo
    # Criando um objeto 
    tarefa = Tarefa(titulo, descricao, status, prazo_str)
    
    # Realizando cadastro da tarefa
    try:
        session.add(tarefa)
        session.commit()
        return apresenta_tarefa(tarefa), 200
    except IntegrityError as e:
        session.rollback()  # Importante fazer rollback da sessão se ocorrer um erro
        return {"message": "Tarefa de mesmo título já salva na base :/"}, 409
    except Exception as e:
        session.rollback()  # Importante fazer rollback da sessão se ocorrer um erro
        return {"message": "Não foi possível salvar nova tarefa :/"}, 400
 
# Criando rota para listar todas as tarefas 
    
def apresenta_tarefas(tarefas: List[Tarefa]):
    """ Retorna uma representação das tarefas seguindo o schema definido em
        TarefaViewSchema.
    """
    result = []
    for tarefa in tarefas:
        result.append({
            "id": tarefa.id,
            "titulo": tarefa.titulo,
            "descricao": tarefa.descricao,
            "status": tarefa.status,
            "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None  # Assume-se que prazo é um objeto date
        })

    return {"tarefas": result}    

# Get tarefas    
@app.get('/tarefas')
def get_tarefas():
    """ 
    Busca todas as tarefas cadastradas
    """
    session = Session()
    tarefas = session.query(Tarefa).all()
    
    if not tarefas:
        return {"message": "Nenhuma tarefa cadastrada"}, 404
    else:
        return apresenta_tarefas(tarefas), 200

# Criando rota para listar somente uma tarefa
class TarefaBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome da tarefa.
    """
    titulo: str = "Preparar aula 1"

def apresenta_tarefa(tarefa: Tarefa):
    """ Retorna uma representação da tarefa seguindo um schema definido.
    """
    
    tarefa_json = {
        "id": tarefa.id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status,
        "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None,  # Assume-se que prazo é um objeto date
    }
    
    return tarefa_json

    
# Get tarefa por titulo
@app.get('/tarefa')
def get_tarefa(form: TarefaBuscaSchema):
    """ 
    Busca uma tarefa cadastrada por nome
    """
    
    session = Session()
    tarefa_titulo = form.titulo
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).first()
    
    print("-------------------------------------------------")
    print(tarefa)
    print("-------------------------------------------------")
    
    if not tarefa:
        return {"message": "Tarefa não encontrada"}, 404
    else:
        return apresenta_tarefa(tarefa), 200


# Criando rota para atualizar tarefa
class TarefaUpdateSchema(BaseModel):
    """ Define como uma tarefa a ser atualizada deve ser representada
    """
    tarefa: str = "Preparar aula 1"
    novo_titulo: str = "Preparar aula 1 - Desenvolvendo APIs"
    nova_descricao: str = "Preparar aula 1 de desenvolvimento full stack básico. Tema: Desenvolvimento API"
    novo_status: str = "Urgente"
    novo_prazo: date = "2024-04-14"
    
@app.put('/tarefa')
def update_produto(form: TarefaUpdateSchema):
    
    tarefa_old = form.tarefa
    # Fazendo query para buscar tarefa
    session = Session()
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_old).first()
    
    # editando tarefa
    tarefa.titulo = form.novo_titulo
    tarefa.descricao = form.nova_descricao
    tarefa.status = form.novo_status
    tarefa.prazo = form.novo_prazo
    
    try:
        session.commit()
        return apresenta_tarefa(tarefa), 200
    except IntegrityError as e:
        session.rollback()
        return {"message": "Tarefa de mesmo título já salva na base :/"}, 409
    
# Criando rota para deletar tarefa
class TarefaDeleteSchema(BaseModel):
    """ Define como uma tarefa a ser deletada deve ser representada
    """
    titulo: str = "Preparar aula 1 - Desenvolvendo APIs"
    
@app.delete('/tarefa')
def delete_tarefa(form: TarefaDeleteSchema):
    
    tarefa_titulo = form.titulo
    # Fazendo query para buscar tarefa
    session = Session()
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).first()
    
    try:
        session.delete(tarefa)
        session.commit()
        return {"message": f"Tarefa '{tarefa_titulo}' deletada com sucesso!"}, 200
    except IntegrityError as e:
        session.rollback()
        return {"message": "Erro ao deletar tarefa"}, 409
    



if __name__ == '__main__':
    app.run(debug=True)