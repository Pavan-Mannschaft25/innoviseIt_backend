// const { body } = require("express-validator");

// exports.createApplicationValidation = [
//   body("job_id")
//     .notEmpty()
//     .withMessage("Job ID is required")
//     .isInt({ min: 1 })
//     .withMessage("Job ID must be a valid number"),

//   body("first_name")
//     .trim()
//     .notEmpty()
//     .withMessage("First name is required")
//     .isLength({ min: 2, max: 100 })
//     .withMessage("First name must be between 2 and 100 characters"),

//   body("last_name")
//     .trim()
//     .notEmpty()
//     .withMessage("Last name is required")
//     .isLength({ min: 2, max: 100 })
//     .withMessage("Last name must be between 2 and 100 characters"),

//   body("email")
//     .trim()
//     .notEmpty()
//     .withMessage("Email is required")
//     .isEmail()
//     .withMessage("Please enter a valid email address"),

//   body("phone")
//     .trim()
//     .notEmpty()
//     .withMessage("Phone number is required")
//     .matches(/^[6-9]\d{9}$/)
//     .withMessage("Please enter a valid 10-digit mobile number"),

//   body("linkedin")
//     .optional({ checkFalsy: true })
//     .isURL()
//     .withMessage("LinkedIn must be a valid URL"),

//   body("portfolio")
//     .optional({ checkFalsy: true })
//     .isURL()
//     .withMessage("Portfolio must be a valid URL"),

//   body("experience")
//     .optional({ checkFalsy: true })
//     .isLength({ max: 50 })
//     .withMessage("Experience cannot exceed 50 characters"),

//   body("resume").notEmpty().withMessage("Resume is required"),

//   body("cover_letter")
//     .optional({ checkFalsy: true })
//     .isLength({ max: 5000 })
//     .withMessage("Cover letter cannot exceed 5000 characters"),
// ];

const { body } = require("express-validator");

exports.createApplicationValidation = [
  body("job_id")
    .notEmpty()
    .withMessage("Job ID is required")
    .isInt({ min: 1 })
    .withMessage("Job ID must be a valid number"),

  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("First name must be between 2 and 100 characters"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Last name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  // Updated phone validation to support US/Global formats
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[0-9\s\-()]{7,20}$/)
    .withMessage("Please enter a valid phone number"),

  // New Fields Validation
  body("current_location")
    .optional({ checkFalsy: true })
    .isLength({ max: 255 })
    .withMessage("Location cannot exceed 255 characters"),

  body("salary_expectation")
    .optional({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage("Salary expectation cannot exceed 100 characters"),

  body("availability")
    .optional({ checkFalsy: true })
    .isIn(["Immediately", "2 weeks", "1 month", "3 months"])
    .withMessage("Invalid availability option"),

  body("source")
    .optional({ checkFalsy: true })
    .isIn(["LinkedIn", "Referral", "Company Website"])
    .withMessage("Invalid source option"),

  body("authorized_to_work")
    .notEmpty()
    .withMessage("Work authorization status is required")
    .isIn(["Yes", "No"])
    .withMessage("Authorization must be Yes or No"),

  body("requires_sponsorship")
    .notEmpty()
    .withMessage("Sponsorship status is required")
    .isIn(["Yes", "No"])
    .withMessage("Sponsorship must be Yes or No"),

  body("linkedin")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("portfolio")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Portfolio must be a valid URL"),

  body("experience")
    .optional({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Experience cannot exceed 50 characters"),

  body("resume").notEmpty().withMessage("Resume is required"),

  body("cover_letter")
    .optional({ checkFalsy: true })
    .isLength({ max: 5000 })
    .withMessage("Cover letter cannot exceed 5000 characters"),
];
