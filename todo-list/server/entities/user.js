function createUserEntity({ id, name, email, passwordHash }) {
  return {
    id,
    name,
    email,
    password_hash: passwordHash,
  };
}

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

module.exports = {
  createUserEntity,
  toPublicUser,
};
