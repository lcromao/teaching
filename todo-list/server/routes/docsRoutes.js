const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Todo List API",
    version: "2.0.0",
    description: "API de gerenciamento de tarefas com autenticação JWT",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "string", example: "abc123" },
          title: { type: "string", example: "Estudar Node.js" },
          description: { type: "string", nullable: true, example: "Capítulo 3 do livro" },
          deadline: { type: "string", format: "date", nullable: true, example: "2026-12-31" },
          completed: { type: "boolean", example: false },
        },
      },
      TaskInput: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string", example: "Estudar Node.js" },
          description: { type: "string", nullable: true, example: "Capítulo 3 do livro" },
          deadline: { type: "string", format: "date", nullable: true, example: "2026-12-31" },
        },
      },
      UserSignup: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "Lucas" },
          email: { type: "string", format: "email", example: "lucas@exemplo.com" },
          password: { type: "string", format: "password", example: "senha123" },
        },
      },
      UserLogin: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "lucas@exemplo.com" },
          password: { type: "string", format: "password", example: "senha123" },
        },
      },
      PublicUser: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Lucas" },
          email: { type: "string", format: "email", example: "lucas@exemplo.com" },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          access_token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          token_type: { type: "string", example: "bearer" },
          user: { $ref: "#/components/schemas/PublicUser" },
        },
      },
      Error: {
        type: "object",
        properties: {
          detail: { type: "string", example: "Mensagem de erro" },
        },
      },
    },
  },
  paths: {
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Registrar novo usuário",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/UserSignup" } } },
        },
        responses: {
          201: { description: "Usuário criado", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          400: { description: "Dados inválidos", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          409: { description: "Usuário já existe", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Fazer login",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/UserLogin" } } },
        },
        responses: {
          200: { description: "Login bem-sucedido", content: { "application/json": { schema: { $ref: "#/components/schemas/AuthResponse" } } } },
          401: { description: "Credenciais inválidas", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Obter usuário autenticado",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Dados do usuário atual", content: { "application/json": { schema: { $ref: "#/components/schemas/PublicUser" } } } },
          401: { description: "Não autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/tasks": {
      post: {
        tags: ["Tasks"],
        summary: "Criar tarefa",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/TaskInput" } } },
        },
        responses: {
          201: { description: "Tarefa criada", content: { "application/json": { schema: { $ref: "#/components/schemas/Task" } } } },
          400: { description: "Dados inválidos", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          401: { description: "Não autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      get: {
        tags: ["Tasks"],
        summary: "Listar tarefas",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de tarefas", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Task" } } } } },
          401: { description: "Não autorizado", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
    "/tasks/{taskId}": {
      get: {
        tags: ["Tasks"],
        summary: "Buscar tarefa por ID",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "taskId", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Tarefa encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Task" } } } },
          404: { description: "Não encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Atualizar tarefa",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "taskId", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/TaskInput" } } },
        },
        responses: {
          200: { description: "Tarefa atualizada", content: { "application/json": { schema: { $ref: "#/components/schemas/Task" } } } },
          404: { description: "Não encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Deletar tarefa",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "taskId", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          204: { description: "Tarefa deletada" },
          404: { description: "Não encontrada", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
        },
      },
    },
  },
};

function createDocsRouter() {
  const router = express.Router();

  router.get("/", (_req, res) => {
    res.redirect("/docs");
  });

  router.use("/docs", swaggerUi.serve);
  router.get("/docs", swaggerUi.setup(swaggerSpec));

  router.get("/docs.json", (_req, res) => {
    res.json(swaggerSpec);
  });

  return router;
}

module.exports = {
  createDocsRouter,
};
