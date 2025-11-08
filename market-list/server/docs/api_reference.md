# Referência da API

## Autenticação
Atualmente, a API não exige autenticação. Futuras versões podem incluir JWT ou OAuth2.

## Endpoints

### Produtos
- `GET /produtos` — Lista todos os produtos
- `POST /produtos` — Cria um novo produto
- `GET /produtos/{id}` — Busca produto por ID
- `DELETE /produtos/{nome}` — Remove produto por nome

#### Exemplo de requisição (POST)
```json
{
  "nome": "Arroz",
  "quantidade": 2,
  "valor": 10.5
}
```

#### Exemplo de resposta (GET)
```json
[
  {
    "id": 1,
    "nome": "Arroz",
    "quantidade": 2,
    "valor": 10.5,
    "data_insercao": "2025-10-27T10:00:00"
  }
]
```

### Comentários
- `POST /produtos/{id}/comentarios` — Adiciona comentário a um produto

#### Exemplo de requisição
```json
{
  "texto": "Produto de qualidade!"
}
```

#### Exemplo de resposta
```json
{
  "id": 1,
  "texto": "Produto de qualidade!",
  "produto_id": 1,
  "data_insercao": "2025-10-27T10:05:00"
}
```

## Erros Padrão
- 400 Bad Request: Dados inválidos
- 404 Not Found: Produto/comentário não encontrado
- 500 Internal Server Error: Erro inesperado

## OpenAPI
A especificação OpenAPI 3.0 é gerada automaticamente em `/openapi/openapi.json`.
