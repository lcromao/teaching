# Importando bibliotecas
from flask import redirect, render_template
from flask_openapi3 import OpenAPI, Info, Tag
from flask_cors import CORS

# Importando pacotes criados
from schemas import *
from services import *

# ----------Configurando OpenAPI----------
info = Info(title="You-Do List's API", version="2.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# Tags
tag_home = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
tag_tarefa = Tag(name="Tarefa", description="Adição, visualização e remoção de tarefas à base")
tag_usuario = Tag(name="Usuário", description="Adição, visualização e remoção de usuários à base")

# ----------Rotas----------

# Rota Inicial
@app.get('/', tags=[tag_home])
def main():
    """
    Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')

# Rota home de exemplo da utilização do render_template
@app.get('/home', tags=[tag_home])
def home():
    """
    Rota home de exemplo da utilização do render_template
    """
    return render_template("home.html"), 200

# POST Tarefa
@app.post('/tarefa', tags=[tag_tarefa],
          responses={"200": TarefaSchema, "409": ErrorSchema, "400": ErrorSchema})
def add_tarefa(form: TarefaSchema):
    """ 
    Rota para adicionar uma nova tarefa
    
    Form Args:
        - titulo (str): Título da tarefa
        - descricao (str): Descrição da tarefa
        - status (str): Status da tarefa
        - prazo (date): Prazo para realização da tarefa
    """
    
    return adicionar_tarefa(form)
 
# GET múltiplas tarefas     
@app.get('/tarefas', tags=[tag_tarefa],
         responses={"200": ListagemTarefasSchema, "404": ErrorSchema})
def get_tarefas():
    """ 
    Rota para buscar todas as tarefas cadastradas
    """
    return buscar_tarefas()
    

# GET única tarefa
@app.get('/tarefa', tags=[tag_tarefa],
         responses={"200": TarefaSchema, "404": ErrorSchema})
def get_tarefa(query: TarefaBuscaSchema):
    """
    Rota para buscar uma tarefa cadastrada
    
    Form Args: Titulo da tarefa
    """
    
    return buscar_tarefa(query)


# PUT tarefa
@app.put('/tarefa', tags=[tag_tarefa],
         responses={"200": TarefaSchema, "409": ErrorSchema})
def update_produto(query: TarefaBuscaSchema, form: TarefaSchema):
    """
    Rota para atualizar uma tarefa cadastrada
    Para testagem: Preparar aula 1 - Desenvolvendo APIs
    
    Form Args:
        - tarefa (str): Título da tarefa
        - novo_titulo (str): Novo título da tarefa
        - nova_descricao (str): Nova descrição da tarefa
        - novo_status (str): Novo status da tarefa
        - novo_prazo (date): Novo prazo para realização da tarefa
    """
    
    return atualizar_tarefa(query, form)

    
# DELETE tarefa
@app.delete('/tarefa', tags=[tag_tarefa], 
            responses={"200": TarefaDeleteSchema, "404": ErrorSchema})
def delete_tarefa(form: TarefaBuscaSchema):
    """
    Rota para deletar uma tarefa cadastrada
    
    Form Args: Titulo da tarefa
    """
    
    return deletar_tarefa(form)
    
    
# ----------Inicializando a aplicação----------
if __name__ == '__main__':
    app.run(debug=True)
    