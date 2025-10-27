# Arquitetura do Sistema

## Visão Geral

O sistema segue uma arquitetura em camadas, separando responsabilidades entre API, domínio, persistência e infraestrutura. Utiliza o padrão Clean Architecture para facilitar manutenção e testes.

- **Componentes:**
  - API Flask (camada de apresentação)
  - Casos de uso (domínio)
  - Repositórios (infra/persistência)
  - Banco de dados relacional (SQLite, adaptável)

## Diagrama de Componentes

```mermaid
flowchart TD
    subgraph API
        A1[Rotas Flask]
    end
    subgraph Dominio
        B1[Use Cases]
        B2[Entidades]
    end
    subgraph Infra
        C1[Repositórios]
        C2[ORM SQLAlchemy]
    end
    A1 --> B1
    B1 --> B2
    B1 --> C1
    C1 --> C2
    C2 --> DB[(Banco de Dados)]
```

## Diagrama de Sequência (Exemplo: Criação de Produto)

```mermaid
sequenceDiagram
    participant C as Cliente
    participant API as API Flask
    participant UC as UseCase
    participant Repo as Repositório
    participant DB as Banco de Dados
    C->>API: POST /produtos
    API->>UC: Executa caso de uso
    UC->>Repo: Salva produto
    Repo->>DB: INSERT
    DB-->>Repo: Confirmação
    Repo-->>UC: Produto salvo
    UC-->>API: Resposta
    API-->>C: 201 Created
```

## Tecnologias e Justificativa
- **Flask + Flask-OpenAPI3:** Simplicidade, extensibilidade e documentação automática.
- **SQLAlchemy:** ORM robusto e flexível.
- **Pydantic:** Validação de dados e schemas.

## Requisitos Não Funcionais
- Segurança: Validação de entrada, CORS, autenticação futura (ToDo).
- Escalabilidade: Modularização, fácil deploy em containers.
- Tolerância a falhas: Tratamento de exceções, logs estruturados (ToDo).
