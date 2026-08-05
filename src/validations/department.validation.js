const { body } = require("express-validator");

exports.createDepartmentValidation = [
  body("department_name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];
