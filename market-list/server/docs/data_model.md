# Modelo de Dados

## Entidades Principais

- **Produto**: id, nome, quantidade, valor, data_insercao
- **Comentário**: id, texto, produto_id, data_insercao

## Diagrama ER (simplificado)

```mermaid
erDiagram
    PRODUTO ||--o{ COMENTARIO : possui
    PRODUTO {
        int id PK
        string nome
        int quantidade
        float valor
        datetime data_insercao
    }
    COMENTARIO {
        int id PK
        string texto
        int produto_id FK
        datetime data_insercao
    }
```

## Regras de Negócio
- Produto deve ter nome único.
- Quantidade deve ser >= 0.
- Comentário só pode ser adicionado a produto existente.
