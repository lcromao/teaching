const express = require("express");

const { sendDetail } = require("../schemas/common");
const { createTask, deleteTask, getTask, listTasks, updateTask } = require("../usecases/tasks");

function createTaskRouter({ authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.post("/", (req, res) => {
    const result = createTask(req.body, req.db, req.currentUser);
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).json(result.data);
  });

  router.get("/", (req, res) => {
    const result = listTasks(req.db, req.currentUser);
    return res.status(result.statusCode).json(result.data);
  });

  router.get("/:taskId", (req, res) => {
    const result = getTask(req.params.taskId, req.db, req.currentUser);
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).json(result.data);
  });

  router.put("/:taskId", (req, res) => {
    const result = updateTask(req.params.taskId, req.body, req.db, req.currentUser);
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).json(result.data);
  });

  router.delete("/:taskId", (req, res) => {
    const result = deleteTask(req.params.taskId, req.db, req.currentUser);
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).send();
  });

  return router;
}

module.exports = {
  createTaskRouter,
};
