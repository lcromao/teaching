# Decisões de Design (ADRs)

## ADR-001: Escolha do framework Flask-OpenAPI3
- **Contexto:** Necessidade de documentação automática e integração fácil com Flask.
- **Decisão:** Utilizar Flask-OpenAPI3 para geração de documentação Swagger/OpenAPI.
- **Alternativas:** Flask puro, FastAPI, Django Rest Framework.
- **Consequências:** Documentação sempre atualizada, menor curva de aprendizado.

## ADR-002: Arquitetura em camadas (Clean Architecture)
- **Contexto:** Manutenção, testes e separação de responsabilidades.
- **Decisão:** Adotar Clean Architecture com camadas bem definidas.
- **Alternativas:** MVC tradicional, monolito sem separação.
- **Consequências:** Código mais testável, fácil de evoluir.

## ADR-003: SQLAlchemy como ORM
- **Contexto:** Persistência relacional e flexibilidade.
- **Decisão:** Usar SQLAlchemy para abstração do banco.
- **Alternativas:** ORM nativo do Flask, raw SQL.
- **Consequências:** Facilidade de troca de banco, queries mais seguras.
