const { body } = require("express-validator");

exports.updateStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Pending", "Reviewed", "Interview", "Rejected", "Selected"])
    .withMessage("Invalid status"),
];
