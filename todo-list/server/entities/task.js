function createTaskEntity({ id, title, description, deadline, ownerId, createdAt }) {
  return {
    id,
    title,
    description,
    deadline,
    created_at: createdAt,
    owner_id: ownerId,
  };
}

function toPublicTask(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    deadline: task.deadline,
    user_id: task.owner_id,
    created_at: task.created_at,
  };
}

module.exports = {
  createTaskEntity,
  toPublicTask,
};
