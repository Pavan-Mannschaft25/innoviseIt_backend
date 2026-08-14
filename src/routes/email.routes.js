// // const express = require("express");

// // const router = express.Router();

// // const controller = require("../controllers/email.controller");

// // const validate = require("../middleware/validate.middleware");

// // const authenticate = require("../middleware/auth.middleware");

// // const authorize = require("../middleware/role.middleware");

// // const { sendEmailValidation } = require("../validations/email.validation");

// // router.get("/", controller.getAll);

// // router.get("/:id", controller.getById);

// // router.post("/send", sendEmailValidation, validate, emailController.send);

// // router.post("/", sendEmailValidation, validate, controller.create);

// // router.put("/:id", sendEmailValidation, validate, controller.update);

// // router.delete("/:id", controller.remove);

// // router.post(
// //   "/test",
// //   authenticate,
// //   authorize("Super Admin"),
// //   controller.sendTestEmail,
// // );

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/email.controller");

// const validate = require("../middleware/validate.middleware");

// const authenticate = require("../middleware/auth.middleware");

// const authorize = require("../middleware/role.middleware");

// const { sendEmailValidation } = require("../validations/email.validation");

// // =======================
// // Email Actions
// // =======================

// router.post(
//   "/send",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   sendEmailValidation,
//   validate,
//   controller.send,
// );

// router.post(
//   "/resend/:id",

//   controller.resend,
// );

// router.post(
//   "/test",
//   authenticate,
//   authorize("Super Admin"),
//   controller.sendTestEmail,
// );

// // =======================
// // CRUD
// // =======================

// router.get(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   controller.getAll,
// );

// router.get(
//   "/:id",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   controller.getById,
// );

// router.post(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin"),
//   sendEmailValidation,
//   validate,
//   controller.create,
// );

// router.put(
//   "/:id",
//   authenticate,
//   authorize("Super Admin", "Admin"),
//   sendEmailValidation,
//   validate,
//   controller.update,
// );

// router.delete(
//   "/:id",
//   authenticate,
//   authorize("Super Admin"),
//   controller.remove,
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/email.controller");
const validate = require("../middleware/validate.middleware");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const { sendEmailValidation } = require("../validations/email.validation");

/**
 * Roles allowed to send and view emails
 */
const EMAIL_USER_ROLES = [
  "Super Admin",
  "HR Administrator",
  "Talent Acquisition Manager",
  "Recruiter",
  "Talent Sourcer",
  "HR Operations",
];

/**
 * Roles allowed to manage (create/update) email templates
 */
const EMAIL_MANAGER_ROLES = [
  "Super Admin",
  "HR Administrator",
  "HR Operations",
];

// =======================
// Email Actions
// =======================

/**
 * @route   POST /api/emails/send
 * @desc    Send an email
 * @access  Private (HR & Recruitment Roles)
 */
router.post(
  "/send",
  authenticate,
  authorize(...EMAIL_USER_ROLES),
  sendEmailValidation,
  validate,
  controller.send,
);

/**
 * @route   POST /api/emails/resend/:id
 * @desc    Resend an email
 * @access  Private (HR & Recruitment Roles)
 */
router.post(
  "/resend/:id",
  authenticate,
  authorize(...EMAIL_USER_ROLES),
  controller.resend,
);

/**
 * @route   POST /api/emails/test
 * @desc    Send a test email
 * @access  Private (Super Admin Only)
 */
router.post(
  "/test",
  authenticate,
  authorize("Super Admin"),
  controller.sendTestEmail,
);

// =======================
// CRUD (Templates/Logs)
// =======================

/**
 * @route   GET /api/emails
 * @desc    Get all emails/templates
 * @access  Private (HR & Recruitment Roles)
 */
router.get(
  "/",
  authenticate,
  authorize(...EMAIL_USER_ROLES),
  controller.getAll,
);

/**
 * @route   GET /api/emails/:id
 * @desc    Get email/template by ID
 * @access  Private (HR & Recruitment Roles)
 */
router.get(
  "/:id",
  authenticate,
  authorize(...EMAIL_USER_ROLES),
  controller.getById,
);

/**
 * @route   POST /api/emails
 * @desc    Create email template
 * @access  Private (HR Admins Only)
 */
router.post(
  "/",
  authenticate,
  authorize(...EMAIL_MANAGER_ROLES),
  sendEmailValidation,
  validate,
  controller.create,
);

/**
 * @route   PUT /api/emails/:id
 * @desc    Update email template
 * @access  Private (HR Admins Only)
 */
router.put(
  "/:id",
  authenticate,
  authorize(...EMAIL_MANAGER_ROLES),
  sendEmailValidation,
  validate,
  controller.update,
);

/**
 * @route   DELETE /api/emails/:id
 * @desc    Delete email template
 * @access  Private (Super Admin Only)
 */
router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
