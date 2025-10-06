const express = require("express");
const { signup } = require("../../controllers/commonControllers/AuthController");
const { signUpValidation } = require("../../middlewares/AuthValidation")

const router = express.Router();

router.post("/signup", signUpValidation, signup);

module.exports = router;