from pydantic import BaseModel
from datetime import date
from model import Tarefa
from typing import List

class TarefaSchema(BaseModel):
    """ 
    Esqueleto para a criação de uma nova tarefa
    """
    titulo: str = "Preparar aula 1"
    descricao: str = "Preparar aula 1 de desenvolvimento full stack básico"
    status: str = "Pendente"
    prazo: date = "2024-04-14"   
    

class TarefaBuscaSchema(BaseModel):
    """ 
    Esqueleto para a busca de uma tarefa
    """
    titulo: str = "Preparar aula 1"


class TarefaUpdateSchema(BaseModel):
    """ 
    Esqueleto para a atualização de uma tarefa
    """
    tarefa: str = "Preparar aula 1"
    novo_titulo: str = "Preparar aula 1 - Desenvolvendo APIs"
    nova_descricao: str = "Preparar aula 1 de desenvolvimento full stack básico. Tema: Desenvolvimento API"
    novo_status: str = "Urgente"
    novo_prazo: date = "2024-04-14"
    
class TarefaDeleteSchema(BaseModel):
    """ 
    Esqueleto para a deleção de uma tarefa
    """
    titulo: str = "Preparar aula 1 - Desenvolvendo APIs"
  
    
def apresenta_tarefa(tarefa: Tarefa):
    """ 
    Método para apresentar uma tarefa.
    """
    
    tarefa_json = {
        "id": tarefa.id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status,
        "prazo": tarefa.prazo.isoformat() if tarefa.prazo else None,  # Assume-se que prazo é um objeto date
    }
    
    return tarefa_json    
     
def apresenta_tarefas(tarefas: List[Tarefa]):
    """ 
    Método para apresentar todas tarefas.
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
    

