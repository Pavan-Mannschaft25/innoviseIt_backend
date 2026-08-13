const { body } = require("express-validator");

exports.sendEmailValidation = [
  body("recipient").isEmail().withMessage("Valid recipient email is required"),

  body("subject").notEmpty().withMessage("Subject is required"),

  body("body").notEmpty().withMessage("Email body is required"),
];
