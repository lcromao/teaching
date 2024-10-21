# Objetivo da aula 1 é criar um CRUD de produtos com Flask e SQLAlchemy
# A API utilizada será a OpenAPI 3.0 para abrirmos diretamente no Swagger.

# Importando bibliotecas
from flask import redirect, render_template
from flask_openapi3 import OpenAPI, Info
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS

# Importando pacotes criados
from model import *
from schemas import *

# Configurando OpenAPI
info = Info(title="You-Do List's API", version="1.0.0")
app = OpenAPI(__name__, info=info)

# ----------Rotas----------

# Rota home
@app.route('/')
def home():
    return {"message": "Hello World"}
    # return render_template("home.html"), 200
    # return redirect('/openapi')

# Rota para documentação
@app.route('/doc')
def doc():
    """
    Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi'), 200

# POST Tarefa
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
    