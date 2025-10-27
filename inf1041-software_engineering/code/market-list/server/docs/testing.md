# Testes

## Estratégia
- Testes unitários para casos de uso e entidades
- Testes de integração para rotas e persistência
- Testes end-to-end opcionais

## Frameworks
- pytest
- coverage.py

## Como executar
```bash
pytest tests/
coverage run -m pytest
coverage report -m
```

## Estrutura de Pastas
- `tests/` — testes unitários e integração
- Relatórios de cobertura em `htmlcov/` (após `coverage html`)
