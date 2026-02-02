const express = require("express");

const { toPublicUser } = require("../entities/user");
const { sendDetail } = require("../schemas/common");
const { loginUser, signupUser } = require("../usecases/users");

function createAuthRouter({ secretKey, accessTokenExpire, authMiddleware }) {
  const router = express.Router();

  router.post("/signup", async (req, res) => {
    const result = await signupUser(req.body, { secretKey, accessTokenExpire });
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).json(result.data);
  });

  router.post("/login", async (req, res) => {
    const result = await loginUser(req.body, { secretKey, accessTokenExpire });
    if (result.error) {
      return sendDetail(res, result.statusCode, result.error);
    }
    return res.status(result.statusCode).json(result.data);
  });

  router.get("/me", authMiddleware, (req, res) => {
    return res.json(toPublicUser(req.currentUser));
  });

  return router;
}

module.exports = {
  createAuthRouter,
};
