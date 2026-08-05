const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../validations/auth.validation");

router.post("/login", loginValidation, validate, authController.login);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  validate,
  authController.forgotPassword,
);
router.post(
  "/reset-password",
  resetPasswordValidation,
  validate,
  authController.resetPassword,
);

module.exports = router;
