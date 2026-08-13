// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/email.controller");

// const validate = require("../middleware/validate.middleware");

// const authenticate = require("../middleware/auth.middleware");

// const authorize = require("../middleware/role.middleware");

// const { sendEmailValidation } = require("../validations/email.validation");

// router.get("/", controller.getAll);

// router.get("/:id", controller.getById);

// router.post("/send", sendEmailValidation, validate, emailController.send);

// router.post("/", sendEmailValidation, validate, controller.create);

// router.put("/:id", sendEmailValidation, validate, controller.update);

// router.delete("/:id", controller.remove);

// router.post(
//   "/test",
//   authenticate,
//   authorize("Super Admin"),
//   controller.sendTestEmail,
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const controller = require("../controllers/email.controller");

const validate = require("../middleware/validate.middleware");

const authenticate = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const { sendEmailValidation } = require("../validations/email.validation");

// =======================
// Email Actions
// =======================

router.post(
  "/send",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  sendEmailValidation,
  validate,
  controller.send,
);

router.post(
  "/resend/:id",

  controller.resend,
);

router.post(
  "/test",
  authenticate,
  authorize("Super Admin"),
  controller.sendTestEmail,
);

// =======================
// CRUD
// =======================

router.get(
  "/",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  controller.getAll,
);

router.get(
  "/:id",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  controller.getById,
);

router.post(
  "/",
  authenticate,
  authorize("Super Admin", "Admin"),
  sendEmailValidation,
  validate,
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Super Admin", "Admin"),
  sendEmailValidation,
  validate,
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
