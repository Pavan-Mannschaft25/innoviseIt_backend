// const { body } = require("express-validator");

// exports.createAdminValidation = [
//   body("full_name").trim().notEmpty().withMessage("Full name is required"),

//   body("email").isEmail().withMessage("Valid email is required"),

//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters"),

//   body("role")
//     .isIn(["Super Admin", "Admin", "HR", "Recruiter", "Viewer"])
//     .withMessage("Invalid role"),
// ];

const { body } = require("express-validator");

const ROLES = [
  "Super Admin",
  "HR Administrator",
  "Talent Acquisition Manager",
  "Recruiter",
  "Talent Sourcer",
  "Hiring Manager",
  "Interview Panel",
  "HR Operations",
  "Management Viewer",
  "Auditor",
];

exports.createAdminValidation = [
  body("full_name").trim().notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role").optional().isIn(ROLES).withMessage("Invalid role"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive", "Suspended"])
    .withMessage("Invalid status"),
];

exports.updateAdminValidation = [
  body("full_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("status")
    .optional()
    .isIn(["Active", "Inactive", "Suspended"])
    .withMessage("Invalid status"),
];
