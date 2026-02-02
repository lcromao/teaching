# Todo List Server

Servidor da aplicação Todo List migrado para **Node.js + Express**.

## Pré-requisitos

- Node.js 18+ (recomendado)
- npm

## Como rodar

### Opção 1: Manual

```bash
npm install
npm run dev
```

## Rotas principais

- `POST /auth/signup`
- `POST /auth/login`
- `GET /auth/me`
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:taskId`
- `PUT /tasks/:taskId`
- `DELETE /tasks/:taskId`

## Banco local

Os dados são salvos automaticamente em `database/db.json` quando o servidor sobe.
