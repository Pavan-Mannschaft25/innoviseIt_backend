const express = require("express");

const router = express.Router();

const auditController = require("../controllers/audit.controller");

const authenticate = require("../middleware/auth.middleware");

const authorize = require("../middleware/rbac.middleware");

/**
 * GET /api/audit-logs
 * Super Admin Only
 */
router.get("/", authenticate, authorize("Super Admin"), auditController.getAll);

/**
 * GET /api/audit-logs/:id
 */
router.get(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  auditController.getById,
);

/**
 * GET /api/audit-logs/admin/:adminId
 */
router.get(
  "/admin/:adminId",
  authenticate,
  authorize("Super Admin"),
  auditController.getByAdmin,
);

/**
 * GET /api/audit-logs/module/:module
 */
router.get(
  "/module/:module",
  authenticate,
  authorize("Super Admin"),
  auditController.getByModule,
);

module.exports = router;
