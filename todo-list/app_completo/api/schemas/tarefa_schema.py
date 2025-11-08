from pydantic import BaseModel
from datetime import date
from model import Tarefa
from typing import List, Optional

class TarefaSchema(BaseModel):
    """ 
    Esqueleto para a criação de uma nova tarefa
    
    Args:
        titulo (str): Título da tarefa
        descricao (str): Descrição da tarefa
        status (str): Status da tarefa
        prazo (date): Prazo para realização da tarefa
    """
    titulo: str = "Preparar aula 1"
    descricao: str = "Preparar aula 1 de desenvolvimento full stack básico"
    status: str = "Pendente"
    prazo: Optional[date] = "2024-04-14"   
    

class TarefaBuscaSchema(BaseModel):
    """ 
    Esqueleto para a busca de uma tarefa
    
    Args:
        titulo (str): Título da tarefa
    """
    titulo: str = "Preparar aula 1"
    
class ListagemTarefasSchema(BaseModel):
    """ 
    Define como uma listagem de tarefas será retornada.
    
    Returns:
        tarefas (List[TarefaSchema]): Lista de tarefas
    """
    tarefas:List[TarefaSchema]
    
def apresenta_tarefas(tarefas: List[Tarefa]):
    """ 
    Método para apresentar todas tarefas.
    
    Lógica: Para cada tarefa, cria-se um dicionário com os atributos da tarefa e\ 
    adiciona-se a uma lista de tarefas.
    
    Returns:
        \tdict: Dicionário com todas as tarefas cadastradas
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
    
def apresenta_tarefa(tarefa: Tarefa):
    """ 
    Método para apresentar uma tarefa.
    
    Returns:
        \tdict: Dicionário com a tarefa cadastrada
    """
    
    tarefa_json = {
        "id": tarefa.id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status,
        "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None
    }
    
    return tarefa_json    


class TarefaUpdateSchema(BaseModel):
    """ 
    Esqueleto para a atualização de uma tarefa
    """
    tarefa: str = "Preparar aula 1"
    novo_titulo: str = "Preparar aula 1 - Desenvolvendo APIs"
    nova_descricao: str = "Preparar aula 1 de desenvolvimento full stack básico. Tema: Desenvolvimento API"
    novo_status: str = "Urgente"
    novo_prazo: Optional[date] = "2024-04-14"
    
class TarefaDeleteSchema(BaseModel):
    """ 
    Define como deve ser a estrutura do dado retornado após uma requisição de remoção.
    
    Returns:
        \tmensagem (str): Mensagem de confirmação da deleção
        \ttitulo (str): Título da tarefa deletada
    """
    mensagem: str = "Tarefa deletada com sucesso"
    titulo: str = "Preparar aula 1 - Desenvolvendo APIs"