# Market List API

Uma API RESTful construída com **Flask** e **SQLAlchemy** para gerenciamento de uma lista de compras com suporte a comentários em produtos. A aplicação segue os princípios de **Clean Architecture** e **SOLID** para maior manutenibilidade e escalabilidade.

## 📋 Descrição do Projeto

**Market List** é uma API que permite aos usuários:
- ✅ Adicionar, listar, buscar e deletar produtos
- 💬 Adicionar comentários em produtos cadastrados
- 🛠️ Verificar a saúde da aplicação
- 📚 Documentação automática com Swagger/OpenAPI

A aplicação é ideal para gerenciamento de compras em mercados ou lista de produtos com feedback da comunidade.

---

## 📁 Estrutura do Projeto

```
market-list/server/
├── src/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # Aplicação principal e setup do Flask
│   │   ├── dependencies.py          # Injeção de dependências
│   │   ├── routes/                  # Endpoints da API
│   │   │   ├── product_routes.py    # Rotas de produtos
│   │   │   ├── comment_routes.py    # Rotas de comentários
│   │   │   ├── health_routes.py     # Rotas de health check
│   │   │   └── docs_routes.py       # Rotas de documentação
│   │   └── schemas/                 # Schemas de validação (Pydantic)
│   │       ├── product.py
│   │       ├── comment.py
│   │       ├── health.py
│   │       └── error.py
│   ├── core/
│   │   ├── entities/                # Entidades do negócio
│   │   │   ├── product.py
│   │   │   └── comment.py
│   │   ├── interfaces/              # Interfaces/contratos
│   │   │   ├── product_repository.py
│   │   │   └── usecase_interface.py
│   │   ├── use_cases/               # Casos de uso (lógica de negócio)
│   │   │   ├── add_product.py
│   │   │   ├── list_products.py
│   │   │   ├── get_product.py
│   │   │   ├── delete_product.py
│   │   │   ├── add_comment.py
│   │   │   └── health_check.py
│   │   ├── exceptions.py            # Exceções customizadas
│   │   └── config/                  # Configurações
│   │       ├── settings.py
│   │       ├── env_config_service.py
│   │       └── env_config_validation.py
│   └── infra/
│       ├── db/
│       │   ├── base.py              # Base de dados
│       │   ├── session.py           # Sessão SQLAlchemy
│       │   └── models/              # Modelos SQLAlchemy
│       │       ├── product_model.py
│       │       └── comment_model.py
│       ├── repositories/            # Implementações de repositórios
│       │   └── sqlalchemy_product_repository.py
│       ├── mappers/                 # Mapeadores (entidade <-> modelo)
│       │   ├── product_mapper.py
│       │   └── comment_mapper.py
│       └── logging/                 # Configuração de logs
│           └── config.py
├── tests/
│   ├── test_add_product.py
│   ├── test_list_products.py
│   ├── test_get_product.py
│   ├── test_delete_product.py
│   ├── test_add_comment.py
│   └── test_health_check.py
├── docs/
│   ├── api_reference.md             # Referência de APIs
│   ├── architecture.md              # Arquitetura do projeto
│   ├── data_model.md                # Modelo de dados
│   ├── setup_and_deploy.md          # Setup e deployment
│   ├── testing.md                   # Documentação de testes
│   └── design_decisions.md          # Decisões de design
├── requirements.txt                 # Dependências Python
├── scripts.sh                       # Scripts de desenvolvimento
└── README.md                        # Este arquivo
```

---

## 🛠️ Ferramentas e Pacotes

### Dependências Principal

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| **Flask** | 2.3.3 | Framework web leve para Python |
| **flask-openapi3** | 4.3.0 | Suporte OpenAPI 3.0 e Swagger automático |
| **Flask-Cors** | 4.0.0 | Suporte a CORS (Cross-Origin Resource Sharing) |
| **SQLAlchemy** | 1.4.41 | ORM para gerenciamento de banco de dados |
| **SQLAlchemy-Utils** | 0.38.3 | Utilitários e tipos adicionais para SQLAlchemy |
| **Pydantic** | 2.9.2 | Validação de dados com type hints |
| **Werkzeug** | 2.3.7 | Utilitários WSGI para Flask |
| **pytest** | 8.3.2 | Framework de testes unitários |

### Versão Recomendada do Python

**Python 3.10** ou superior

---

## 🚀 Como Rodar

### Opção 1: Via Scripts Automatizados (Recomendado)

```bash
# Setup inicial (cria venv e instala dependências)
./scripts.sh setup

# Executar servidor de desenvolvimento
./scripts.sh dev

# Rodar testes unitários
./scripts.sh test-unit

# Limpar arquivos temporários
./scripts.sh clean

# Ver todos os comandos disponíveis
./scripts.sh help
```

### Opção 2: Manualmente

#### 1. **Criar Virtual Environment**
```bash
python3.11 -m venv venv
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows
```

#### 2. **Instalar Dependências**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 3. **Rodar Servidor**
```bash
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
python -m src.app.main
```

#### 4. **Rodar Testes**
```bash
pytest tests/
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (ou `src/app/.env`):

```env
# Banco de dados
DATABASE_URL=sqlite:///./market_list.db

# Configuração da aplicação
SERVICE_NAME=Market List API
SERVICE_VERSION=1.0.0
DEBUG=False
```

---

## 📡 Rotas Disponíveis

### Health Check
Verificar disponibilidade do serviço.

| Método | Rota | Descrição | Status |
|--------|------|-----------|--------|
| `GET` | `/health` | Verifica saúde da aplicação | 200 |

**Exemplo:**
```bash
curl http://localhost:5000/health
```

---

### Produtos

#### 1. Listar Todos os Produtos
```http
GET /produtos
```
**Resposta (200):**
```json
{
  "produtos": [
    {
      "id": 1,
      "nome": "Maçã",
      "quantidade": 5,
      "valor": 2.50,
      "data_cadastro": "2024-01-15",
      "comentarios": []
    }
  ]
}
```

---

#### 2. Buscar Produto por ID
```http
GET /produto?id=1
```
**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Maçã",
  "quantidade": 5,
  "valor": 2.50,
  "data_cadastro": "2024-01-15",
  "comentarios": []
}
```

**Erros:**
- `404`: Produto não encontrado

---

#### 3. Adicionar Novo Produto
```http
POST /produto
Content-Type: application/json

{
  "nome": "Banana",
  "quantidade": 10,
  "valor": 1.50
}
```

**Resposta (200):**
```json
{
  "id": 2,
  "nome": "Banana",
  "quantidade": 10,
  "valor": 1.50,
  "data_cadastro": "2024-01-20",
  "comentarios": []
}
```

**Erros:**
- `409`: Produto já existe
- `400`: Dados inválidos

---

#### 4. Deletar Produto
```http
DELETE /produto?nome=Banana
```

**Resposta (200):**
```json
{
  "mesage": "Produto removido",
  "nome": "Banana"
}
```

**Erros:**
- `404`: Produto não encontrado

---

### Comentários

#### Adicionar Comentário em Produto
```http
POST /comentario
Content-Type: application/json

{
  "produto_id": 1,
  "texto": "Ótima qualidade!"
}
```

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Maçã",
  "quantidade": 5,
  "valor": 2.50,
  "data_cadastro": "2024-01-15",
  "comentarios": [
    {
      "id": 1,
      "texto": "Ótima qualidade!",
      "data_criacao": "2024-01-20"
    }
  ]
}
```

**Erros:**
- `404`: Produto não encontrado
- `400`: Não foi possível adicionar comentário

> **Nota**: Há dois endpoints para comentários: `/comentario` e `/cometario` (com typo), ambos funcionam.

---

## 📚 Documentação Adicional

Consulte os arquivos na pasta `docs/` para mais informações:

- [API Reference](docs/api_reference.md) - Referência completa da API
- [Architecture](docs/architecture.md) - Detalhes da arquitetura
- [Data Model](docs/data_model.md) - Estrutura do banco de dados
- [Testing](docs/testing.md) - Estratégia de testes
- [Design Decisions](docs/design_decisions.md) - Decisões arquiteturais
- [Setup & Deploy](docs/setup_and_deploy.md) - Instruções de deployment

---

## 🧪 Testes

```bash
# Rodar todos os testes
pytest tests/

# Rodar com verbose
pytest tests/ -v

# Rodar testes específicos
pytest tests/test_add_product.py -v

# Gerar relatório de cobertura
pytest tests/ --cov=src
```

---

## 🔗 Documentação Interativa

Após iniciar o servidor, acesse:
- **Swagger UI**: http://localhost:5000/openapi/swagger
- **ReDoc**: http://localhost:5000/openapi/redoc
- **JSON Schema**: http://localhost:5000/openapi.json

---

## 📝 Licença

Ver arquivo [LICENSE](../LICENSE) na raiz do projeto.

---

## 👨‍💻 Desenvolvimento

### Arquitetura

O projeto segue **Clean Architecture** com separação clara de responsabilidades:

- **Domain** (`core/`): Lógica de negócio, entidades e interfaces
- **Application** (`app/`): Controllers, schemas e orquestração
- **Infrastructure** (`infra/`): Implementações de repositórios, banco de dados e logs

### Princípios SOLID

- ✅ **S**ingle Responsibility: Cada classe tem uma única responsabilidade
- ✅ **O**pen/Closed: Aberto para extensão, fechado para modificação
- ✅ **L**iskov Substitution: Implementações respeitam contratos
- ✅ **I**nterface Segregation: Interfaces específicas e enxutas
- ✅ **D**ependency Inversion: Dependência em abstrações, não em implementações

---

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
