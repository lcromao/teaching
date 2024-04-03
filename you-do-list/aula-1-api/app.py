# Objetivo da aula 1 é criar um CRUD de produtos com Flask e SQLAlchemy
# A API utilizada será a OpenAPI 3.0 para abrirmos diretamente no Swagger.

# Importando bibliotecas
from flask import redirect, render_template
from flask_openapi3 import OpenAPI, Info
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from datetime import date
from typing import List
from pydantic import BaseModel

from model import *

# Configurando OpenAPI
info = Info(title="API - Organizador de tarefas", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# ---------Rotas----------

# Home 
@app.route('/')
def home():
    return {"message": "Hello World!"}
    # return render_template("home.html"), 200
    # return redirect('/openapi')


# Open API
@app.route('/api')
def api():
    """Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')
 
# POST tarefa 
class TarefaSchema(BaseModel):
    """ 
    Esqueleto para a criação de uma nova tarefa
    """
    titulo: str = "Preparar aula 1"
    descricao: str = "Preparar aula 1 de desenvolvimento full stack básico"
    status: str = "Pendente"
    prazo: date = "2024-04-14"
    
def apresenta_tarefa(tarefa: Tarefa):
    """ Método para apresentar uma tarefa.
    """
    
    tarefa_json = {
        "id": tarefa.id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status,
        "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None,  # Assume-se que prazo é um objeto date
    }
    
    return tarefa_json    
    
@app.post('/tarefa')
def add_tarefa(form: TarefaSchema):
    """ 
    Método para adicionar uma nova tarefa
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
        session.rollback() 
        return {"message": "Não foi possível salvar nova tarefa :/"}, 400
 
# GET múltiplas tarefas 
def apresenta_tarefas(tarefas: List[Tarefa]):
    """ Método para apresentar todas tarefas.
    """
    tarefas_json = []
    for tarefa in tarefas:
        tarefas_json.append({
            "id": tarefa.id,
            "titulo": tarefa.titulo,
            "descricao": tarefa.descricao,
            "status": tarefa.status,
            "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None  # Assume-se que prazo é um objeto date
        })

    return {"tarefas": tarefas_json}    
   
@app.get('/tarefas')
def get_tarefas():
    """ 
    Método para buscar todas as tarefas cadastradas
    """
    session = Session()
    tarefas = session.query(Tarefa).all()
    
    if not tarefas:
        return {"message": "Nenhuma tarefa cadastrada"}, 404
    else:
        return apresenta_tarefas(tarefas), 200
        # return render_template("tarefas.html", tarefas = apresenta_tarefas(tarefas)['tarefas']), 200
    

# GET tarefa única
class TarefaBuscaSchema(BaseModel):
    """ 
    Esqueleto para a busca de uma tarefa
    """
    titulo: str = "Preparar aula 1"

@app.get('/tarefa')
def get_tarefa(form: TarefaBuscaSchema):
    """ 
    Busca uma tarefa cadastrada por nome
    """
    
    session = Session()
    tarefa_titulo = form.titulo
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).first()
    
    if not tarefa:
        return {"message": "Tarefa não encontrada"}, 404
    else:
        return apresenta_tarefa(tarefa), 200


# PUT tarefa
class TarefaUpdateSchema(BaseModel):
    """ 
    Esqueleto para a atualização de uma tarefa
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
    
# DELETE tarefa
class TarefaDeleteSchema(BaseModel):
    """ 
    Esqueleto para a deleção de uma tarefa
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
    
# Inicializando a aplicação
if __name__ == '__main__':
    app.run(debug=True)