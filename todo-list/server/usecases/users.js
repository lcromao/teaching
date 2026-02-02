const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getNextId, loadDatabase, saveDatabase } = require("../database");
const { createUserEntity, toPublicUser } = require("../entities/user");
const { sendDetail } = require("../schemas/common");
const { validateLoginPayload, validateSignupPayload } = require("../schemas/user");

function createAccessToken(userId, secretKey, accessTokenExpire) {
  return jwt.sign({ sub: String(userId) }, secretKey, { expiresIn: accessTokenExpire });
}

async function signupUser(payload, { secretKey, accessTokenExpire }) {
  const parsed = validateSignupPayload(payload);
  if (parsed.error) {
    return { statusCode: 400, error: parsed.error };
  }

  const db = loadDatabase();
  if (db.users.some((user) => user.email === parsed.data.email)) {
    return { statusCode: 409, error: "E-mail já cadastrado" };
  }

  const userId = getNextId(db.users, "id", db.lastUserId);
  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = createUserEntity({
    id: userId,
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
  });

  db.lastUserId = userId;
  db.users.push(user);
  saveDatabase(db);

  const token = createAccessToken(user.id, secretKey, accessTokenExpire);
  return {
    statusCode: 201,
    data: {
      access_token: token,
      token_type: "bearer",
      user: toPublicUser(user),
    },
  };
}

async function loginUser(payload, { secretKey, accessTokenExpire }) {
  const parsed = validateLoginPayload(payload);
  if (parsed.error) {
    return { statusCode: 401, error: parsed.error };
  }

  const db = loadDatabase();
  const user = db.users.find((item) => item.email === parsed.data.email);
  if (!user) {
    return { statusCode: 401, error: "Credenciais inválidas" };
  }

  const matches = await bcrypt.compare(parsed.data.password, user.password_hash);
  if (!matches) {
    return { statusCode: 401, error: "Credenciais inválidas" };
  }

  const token = createAccessToken(user.id, secretKey, accessTokenExpire);
  return {
    statusCode: 200,
    data: {
      access_token: token,
      token_type: "bearer",
      user: toPublicUser(user),
    },
  };
}

function authenticateRequest(authHeader, { secretKey }) {
  if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
    return { statusCode: 401, error: "Token não informado" };
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return { statusCode: 401, error: "Token não informado" };
  }

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (_error) {
    return { statusCode: 401, error: "Token inválido" };
  }

  const userId = Number.parseInt(payload.sub, 10);
  if (!Number.isInteger(userId)) {
    return { statusCode: 401, error: "Token inválido" };
  }

  const db = loadDatabase();
  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return { statusCode: 404, error: "Usuário não encontrado" };
  }

  return { db, user };
}

function createAuthMiddleware(options) {
  return (req, res, next) => {
    const result = authenticateRequest(req.header("authorization"), options);
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }

    req.db = result.db;
    req.currentUser = result.user;
    return next();
  };
}

module.exports = {
  signupUser,
  loginUser,
  createAuthMiddleware,
};
