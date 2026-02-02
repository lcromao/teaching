function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSignupPayload(payload) {
  const body = payload && typeof payload === "object" ? payload : {};
  const { name, email, password } = body;

  if (typeof name !== "string" || name.trim().length === 0) {
    return { error: "Nome é obrigatório" };
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return { error: "E-mail inválido" };
  }

  if (typeof password !== "string" || password.length < 4 || password.length > 72) {
    return { error: "A senha deve ter entre 4 e 72 caracteres" };
  }

  return {
    data: {
      name: name.trim(),
      email: normalizeEmail(email),
      password,
    },
  };
}

function validateLoginPayload(payload) {
  const body = payload && typeof payload === "object" ? payload : {};
  const { email, password } = body;

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Credenciais inválidas" };
  }

  return {
    data: {
      email: normalizeEmail(email),
      password,
    },
  };
}

module.exports = {
  normalizeEmail,
  isValidEmail,
  validateSignupPayload,
  validateLoginPayload,
};
