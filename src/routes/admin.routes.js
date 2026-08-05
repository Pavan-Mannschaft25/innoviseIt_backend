const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const validate = require("../middleware/validate.middleware");

const { createAdminValidation } = require("../validations/admin.validation");

// Only Super Admin

router.get("/", authenticate, authorize("Super Admin"), adminController.getAll);

router.get(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  adminController.getById,
);

router.post(
  "/",
  authenticate,
  authorize("Super Admin"),
  createAdminValidation,
  validate,
  adminController.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  adminController.update,
);

router.patch(
  "/:id/role",
  authenticate,
  authorize("Super Admin"),
  adminController.updateRole,
);

router.patch(
  "/:id/password",
  authenticate,
  authorize("Super Admin"),
  adminController.updatePassword,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  adminController.remove,
);

module.exports = router;
