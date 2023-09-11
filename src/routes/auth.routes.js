const express = require("express");
const {
  register,
  login,
  logout,
  profile,
  verifyToken,
} = require("../controllers/auth.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

const { authRequired } = require("../middlewares/validateToken");

const router = express.Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

module.exports = router;
