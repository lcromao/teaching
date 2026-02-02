const cors = require("cors");
const express = require("express");
const { ensureDatabaseFile } = require("./database");
const { createAuthRouter } = require("./routes/authRoutes");
const { createDocsRouter } = require("./routes/docsRoutes");
const { createTaskRouter } = require("./routes/taskRoutes");
const { sendDetail } = require("./schemas/common");
const { createAuthMiddleware } = require("./usecases/users");

const app = express();

const PORT = Number.parseInt(process.env.PORT || "8000", 10);
const SECRET_KEY = process.env.TODO_SECRET_KEY || "super-secret-key-change-me";
const ACCESS_TOKEN_EXPIRE = "24h";

app.use(cors());
app.use(express.json());

const authMiddleware = createAuthMiddleware({ secretKey: SECRET_KEY });

app.use("/", createDocsRouter());
app.use(
  "/auth",
  createAuthRouter({
    authMiddleware,
    secretKey: SECRET_KEY,
    accessTokenExpire: ACCESS_TOKEN_EXPIRE,
  }),
);
app.use("/tasks", createTaskRouter({ authMiddleware }));
app.use((_req, res) => sendDetail(res, 404, "Rota não encontrada"));

if (require.main === module) {
  ensureDatabaseFile();
  app.listen(PORT, () => {
    console.log(`Todo List API rodando em http://localhost:${PORT}`);
  });
}

module.exports = { app };
