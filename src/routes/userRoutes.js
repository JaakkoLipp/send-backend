const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/validateToken");
const {
  login,
  register,
  userFiles,
  forgotPasswd,
} = require("../controllers/userController");

router.get("/login", login);
router.get("/register", register);
router.get("/userfiles", validateToken, userFiles);
router.get("/forgot-password", forgotPasswd);

module.exports = router;
