const express = require("express");
const { signup, login, logout } = require("../../controllers/commonControllers/AuthController");
const { signUpValidation, loginValidation } = require("../../middlewares/AuthValidation")
const authMiddleware  = require("../../middlewares/AuthMiddleware")

const router = express.Router();

router.post("/signup", signUpValidation, signup);
router.post("/login",loginValidation, login)
router.post("/logout", logout)

module.exports = router;