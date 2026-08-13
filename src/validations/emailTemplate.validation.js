const { body } = require("express-validator");

exports.createTemplateValidation = [
  body("name").notEmpty().withMessage("Template name is required"),

  body("subject").notEmpty().withMessage("Subject is required"),

  body("body").notEmpty().withMessage("Body is required"),
];
