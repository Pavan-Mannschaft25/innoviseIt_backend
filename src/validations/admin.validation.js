const { body } = require("express-validator");

exports.createAdminValidation = [
  body("full_name").trim().notEmpty().withMessage("Full name is required"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .isIn(["Super Admin", "Admin", "HR", "Recruiter", "Viewer"])
    .withMessage("Invalid role"),
];
