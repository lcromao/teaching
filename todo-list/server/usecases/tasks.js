const { getNextId, saveDatabase } = require("../database");
const { createTaskEntity, toPublicTask } = require("../entities/task");
const { validateTaskCreatePayload, validateTaskUpdatePayload } = require("../schemas/task");

function getTaskById(taskIdParam, db, user) {
  if (!/^\d+$/.test(String(taskIdParam))) {
    return { statusCode: 404, error: "Tarefa não encontrada" };
  }

  const taskId = Number.parseInt(String(taskIdParam), 10);
  const task = db.tasks.find((item) => item.id === taskId);
  if (!task) {
    return { statusCode: 404, error: "Tarefa não encontrada" };
  }

  if (task.owner_id !== user.id) {
    return { statusCode: 403, error: "Acesso negado a esta tarefa" };
  }

  return { task };
}

function createTask(payload, db, user) {
  const parsed = validateTaskCreatePayload(payload);
  if (parsed.error) {
    return { statusCode: 400, error: parsed.error };
  }

  const taskId = getNextId(db.tasks, "id", db.lastTaskId);
  db.lastTaskId = taskId;

  const task = createTaskEntity({
    id: taskId,
    title: parsed.data.title,
    description: parsed.data.description,
    deadline: parsed.data.deadline,
    ownerId: user.id,
    createdAt: new Date().toISOString(),
  });

  db.tasks.push(task);
  saveDatabase(db);

  return {
    statusCode: 201,
    data: toPublicTask(task),
  };
}

function listTasks(db, user) {
  const tasks = db.tasks
    .filter((task) => task.owner_id === user.id)
    .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    .map(toPublicTask);

  return { statusCode: 200, data: { tasks } };
}

function getTask(taskIdParam, db, user) {
  const found = getTaskById(taskIdParam, db, user);
  if (found.error) {
    return found;
  }

  return { statusCode: 200, data: toPublicTask(found.task) };
}

function updateTask(taskIdParam, payload, db, user) {
  const found = getTaskById(taskIdParam, db, user);
  if (found.error) {
    return found;
  }

  const parsed = validateTaskUpdatePayload(payload);
  if (parsed.error) {
    return { statusCode: 400, error: parsed.error };
  }

  Object.assign(found.task, parsed.data);
  saveDatabase(db);

  return { statusCode: 200, data: toPublicTask(found.task) };
}

function deleteTask(taskIdParam, db, user) {
  const found = getTaskById(taskIdParam, db, user);
  if (found.error) {
    return found;
  }

  db.tasks = db.tasks.filter((item) => item.id !== found.task.id);
  saveDatabase(db);

  return { statusCode: 204 };
}

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask,
};
