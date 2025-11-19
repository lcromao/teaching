from database import SessionLocal, init_db
from entities import User
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from schemas import (
    AuthResponse,
    ErrorResponse,
    TaskCreate,
    TaskList,
    TaskRead,
    TaskUpdate,
    UserCreate,
    UserLogin,
    UserRead,
)
from security import create_access_token, decode_access_token
from sqlalchemy.orm import Session
from usecases import (
    authenticate_user,
    create_task,
    create_user,
    delete_task,
    get_task,
    get_user,
    list_tasks,
    update_task,
)

app = FastAPI(title="Todo List API", version="2.0.0")
http_bearer = HTTPBearer()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token não informado",
        )
    payload = decode_access_token(credentials.credentials)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido"
        )
    user = get_user(db, int(user_id))
    return user


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/", tags=["health"])
def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")


@app.post(
    "/auth/signup",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["auth"],
)
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, payload)
    token = create_access_token({"sub": str(user.id)})
    return AuthResponse(access_token=token, token_type="bearer", user=user)


@app.post("/auth/login", response_model=AuthResponse, tags=["auth"])
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    token = create_access_token({"sub": str(user.id)})
    return AuthResponse(access_token=token, token_type="bearer", user=user)


@app.get("/auth/me", response_model=UserRead, tags=["auth"])
def me(current_user: User = Depends(get_current_user)):
    return current_user


@app.post(
    "/tasks",
    response_model=TaskRead,
    status_code=status.HTTP_201_CREATED,
    tags=["tasks"],
)
def create_task_endpoint(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_task(db, payload, current_user)


@app.get(
    "/tasks",
    response_model=TaskList,
    tags=["tasks"],
)
def list_tasks_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tasks = list_tasks(db, current_user)
    return TaskList(tasks=tasks)


@app.get(
    "/tasks/{task_id}",
    response_model=TaskRead,
    tags=["tasks"],
    responses={404: {"model": ErrorResponse}},
)
def get_task_endpoint(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_task(db, task_id, current_user)


@app.put(
    "/tasks/{task_id}",
    response_model=TaskRead,
    tags=["tasks"],
    responses={404: {"model": ErrorResponse}},
)
def update_task_endpoint(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_task(db, task_id, payload, current_user)


@app.delete(
    "/tasks/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["tasks"],
    responses={404: {"model": ErrorResponse}},
)
def delete_task_endpoint(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_task(db, task_id, current_user)
    return None
