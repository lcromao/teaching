# Setup e Deploy

## Requisitos
- Python 3.12+
- pip, virtualenv ou conda
- SQLite (default) ou outro banco suportado pelo SQLAlchemy

## Instalação Local
```bash
git clone <repo-url>
cd code/market-list/server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m src.app.main
```

## Variáveis de Ambiente
- `DATABASE_URL`: URL do banco de dados
- `LOG_DIR`: Diretório de logs (opcional)
- `PROJECT_ROOT`: Raiz do projeto

## Deploy em Produção
- Use Gunicorn, uWSGI ou outro WSGI server
- Configure variáveis de ambiente
- Utilize Docker se desejado

## Exemplo Dockerfile
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
CMD ["python", "-m", "src.app.main"]
```

## Monitoramento e Rollback
- A implementar
