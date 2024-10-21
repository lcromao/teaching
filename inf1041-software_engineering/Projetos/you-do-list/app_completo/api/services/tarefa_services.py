# Importando bibliotecas
from sqlalchemy.exc import IntegrityError
from urllib.parse import unquote

# Importando pacotes criados
from model import *
from schemas import *


def adicionar_tarefa(form: TarefaSchema):
    """ 
    Método para adicionar uma nova tarefa
    
    Input: Formulário com os dados da tarefa
    Returns: Dicionário com a tarefa cadastrada
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
        # como a duplicidade do nome é a provável razão do IntegrityError
        error_msg = "Tarefa de mesmo nome já salvo na base :/"
        return {"mensagem": error_msg}, 409
 
def buscar_tarefas():
    """ 
    Método para buscar todas as tarefas cadastradas
    
    Returns: Dicionário com todas as tarefas cadastradas
    """
    session = Session()
    tarefas = session.query(Tarefa).all()
    
    if not tarefas:
        error_msg = "Nenhuma tarefa encontrada na base :/"
        return {"mensagem": error_msg}, 404
    else:
        return apresenta_tarefas(tarefas), 200
        # return render_template("tarefas.html", tarefas = apresenta_tarefas(tarefas)['tarefas']), 200
    

def buscar_tarefa(query: TarefaBuscaSchema):
    """ 
    Busca uma tarefa cadastrada por nome
    
    Inputs: Formulário com o título da tarefa  
    Returns: dict: Dicionário com a tarefa encontrada
    """
    
    # Título da tarefa a ser buscada
    tarefa_titulo = query.titulo
    # Conectando com a base
    session = Session()
    # Realizando busca
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).first()
    
    if not tarefa:
        error_msg = "Tarefa não encontrada na base :/"
        return {"mensagem": error_msg}, 404
    else:
        return apresenta_tarefa(tarefa), 200


def atualizar_tarefa(query: TarefaBuscaSchema, form: TarefaSchema):
    """
    Método para atualizar uma tarefa cadastrada
    
    Inputs: 
    - Tarefa a ser atualizada
    - Formulário com os novos dados da tarefa 
    Returns: Dicionário com a tarefa atualizada
    """
    
    # Tarefa a ser atualizada
    tarefa_titulo = query.titulo
    
    # Fazendo query para buscar tarefa e verificando existência
    session = Session()
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).first()
    
    if not tarefa:
        error_msg = f"Tarefa '{tarefa_titulo}' não encontrada na base :/"
        return {"mensagem": error_msg}, 404
    else:
        tarefa.titulo = form.titulo
        tarefa.descricao = form.descricao
        tarefa.status = form.status
        tarefa.prazo = form.prazo
        
        try:
            session.commit()
            return apresenta_tarefa(tarefa), 200
        except IntegrityError as e:
            session.rollback()
            error_msg = "Não foi possível atualizar a tarefa :/"
            return {"mensagem": error_msg}, 409

def deletar_tarefa(form: TarefaBuscaSchema):
    """
    Método para deletar uma tarefa cadastrada
    
    Inputs: Formulário com o título da tarefa
    Returns: Dicionário com a mensagem de sucesso ou erro
    """
    
    tarefa_titulo = form.titulo
    # Fazendo query para buscar tarefa
    session = Session()
    tarefa = session.query(Tarefa).filter(Tarefa.titulo == tarefa_titulo).delete()
    session.commit()
    
    if tarefa:
        return {"mensagem": "Tarefa removida", "titulo": tarefa_titulo}
    else:
        # se o produto não foi encontrado
        error_msg = f"Tarefa '{tarefa_titulo}' não encontrada na base :/"
        return {"mensagem": error_msg}, 404
    
    