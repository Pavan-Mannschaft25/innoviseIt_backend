const { body } = require("express-validator");

exports.createJobValidation = [
  body("department_id").isInt().withMessage("Department is required"),

  body("title").notEmpty().withMessage("Job title is required"),

  body("employment_type").notEmpty().withMessage("Employment type is required"),
];
