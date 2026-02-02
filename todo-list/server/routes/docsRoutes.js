const express = require("express");

function createDocsRouter() {
  const router = express.Router();

  router.get("/", (_req, res) => {
    res.redirect("/docs");
  });

  router.get("/docs", (_req, res) => {
    res.json({
      name: "Todo List API",
      version: "2.0.0",
      routes: [
        "POST /auth/signup",
        "POST /auth/login",
        "GET /auth/me",
        "POST /tasks",
        "GET /tasks",
        "GET /tasks/:taskId",
        "PUT /tasks/:taskId",
        "DELETE /tasks/:taskId",
      ],
    });
  });

  return router;
}

module.exports = {
  createDocsRouter,
};
