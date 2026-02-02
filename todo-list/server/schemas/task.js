const { hasOwn } = require("./common");

function isValidDeadline(deadline) {
  if (typeof deadline !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
    return false;
  }

  const parsed = new Date(`${deadline}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === deadline;
}

function validateTaskCreatePayload(payload) {
  const body = payload && typeof payload === "object" ? payload : {};
  const { title, description, deadline } = body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return { error: "Título é obrigatório" };
  }

  if (description !== undefined && description !== null && typeof description !== "string") {
    return { error: "Descrição inválida" };
  }

  if (deadline !== undefined && deadline !== null && !isValidDeadline(deadline)) {
    return { error: "Deadline inválido. Use YYYY-MM-DD" };
  }

  return {
    data: {
      title: title.trim(),
      description: description ?? null,
      deadline: deadline ?? null,
    },
  };
}

function validateTaskUpdatePayload(payload) {
  const body = payload && typeof payload === "object" ? payload : {};
  const updates = {};

  if (hasOwn(body, "title")) {
    if (typeof body.title !== "string" || body.title.trim().length === 0) {
      return { error: "Título é obrigatório" };
    }
    updates.title = body.title.trim();
  }

  if (hasOwn(body, "description")) {
    if (body.description !== null && typeof body.description !== "string") {
      return { error: "Descrição inválida" };
    }
    updates.description = body.description;
  }

  if (hasOwn(body, "deadline")) {
    if (body.deadline !== null && !isValidDeadline(body.deadline)) {
      return { error: "Deadline inválido. Use YYYY-MM-DD" };
    }
    updates.deadline = body.deadline;
  }

  return { data: updates };
}

module.exports = {
  isValidDeadline,
  validateTaskCreatePayload,
  validateTaskUpdatePayload,
};
