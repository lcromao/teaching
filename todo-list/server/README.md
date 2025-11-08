# Todo List Server

Este é o servidor da aplicação Todo List, construído com FastAPI.

## Pré-requisitos

- Python 3.8 ou superior
- Git (opcional, para clonar o repositório)

## Como Rodar a Aplicação

### Opção 1: Usando o Script Automatizado

O script `scripts.sh` automatiza a configuração e execução da aplicação.

1. Torne o script executável (se necessário):
   ```bash
   chmod +x scripts.sh
   ```

2. Configure o ambiente e instale as dependências:
   ```bash
   ./scripts.sh setup
   ```

3. Execute a aplicação em modo de desenvolvimento:
   ```bash
   ./scripts.sh dev
   ```

4. A aplicação estará rodando em `http://localhost:8000`

Outros comandos disponíveis:
- `./scripts.sh test-unit`: Executa os testes unitários
- `./scripts.sh clean`: Limpa arquivos temporários
- `./scripts.sh help`: Mostra ajuda

### Opção 2: Execução Manual

Se preferir configurar manualmente:

1. Crie um ambiente virtual:
   ```bash
   python3 -m venv venv
   ```

2. Ative o ambiente virtual:
   - No macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - No Windows:
     ```bash
     venv\Scripts\activate
     ```

3. Instale as dependências:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```bash
   uvicorn main:app --reload
   ```

5. A aplicação estará rodando em `http://localhost:8000`

## API Documentation

Após iniciar o servidor, acesse a documentação interativa da API em:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Estrutura do Projeto

- `main.py`: Ponto de entrada da aplicação FastAPI
- `entities/`: Definições das entidades do banco de dados
- `schemas/`: Schemas Pydantic para validação
- `usecases/`: Lógica de negócio
- `security.py`: Utilitários de segurança e autenticação
- `database/`: Configurações do banco de dados
- `tests/`: Testes unitários

## Desenvolvimento

Para contribuir com o desenvolvimento:

1. Siga as instruções de setup acima
2. Execute os testes antes de commitar: `./scripts.sh test-unit`
3. Mantenha o código limpo e documentado