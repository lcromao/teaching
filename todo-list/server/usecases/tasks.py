"""Task related business logic."""
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from entities import Task, User
from schemas import TaskCreate, TaskUpdate


def _ensure_owner(task: Task, user: User) -> None:
    if task.owner_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado a esta tarefa")


def create_task(db: Session, payload: TaskCreate, user: User) -> Task:
    task = Task(
        title=payload.title,
        description=payload.description,
        deadline=payload.deadline,
        owner_id=user.id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def list_tasks(db: Session, user: User) -> list[Task]:
    return db.query(Task).filter(Task.owner_id == user.id).order_by(Task.created_at.desc()).all()


def get_task(db: Session, task_id: int, user: User) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada")
    _ensure_owner(task, user)
    return task


def update_task(db: Session, task_id: int, payload: TaskUpdate, user: User) -> Task:
    task = get_task(db, task_id, user)

    update_data = payload.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int, user: User) -> None:
    task = get_task(db, task_id, user)
    db.delete(task)
    db.commit()
