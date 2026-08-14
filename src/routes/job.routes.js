// // const express = require("express");

// // const router = express.Router();

// // const controller = require("../controllers/job.controller");
// // const validate = require("../middleware/validate.middleware");

// // const { createJobValidation } = require("../validations/job.validation");

// // router.get("/", controller.getAll);

// // router.get("/:id", controller.getById);

// // router.post("/", createJobValidation, validate, controller.create);

// // router.put("/:id", createJobValidation, validate, controller.update);

// // router.delete("/:id", controller.remove);

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/job.controller");

// const authenticate = require("../middleware/auth.middleware");
// const authorize = require("../middleware/role.middleware");

// // Public

// router.get("/", controller.getAll);

// router.get("/:id", controller.getById);

// // Protected

// router.post(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin"),
//   controller.create,
// );

// router.put(
//   "/:id",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR"),
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

const controller = require("../controllers/job.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

/**
 * Roles allowed to create and manage jobs
 */
const JOB_MANAGER_ROLES = [
  "Super Admin",
  "HR Administrator",
  "Talent Acquisition Manager",
  "HR Operations",
  "Hiring Manager", // Hiring managers might need to update job details
];

/**
 * =========================================================
 * PUBLIC ROUTES
 * =========================================================
 */

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs (Public for career site)
 * @access  Public
 */
router.get("/", controller.getAll);

/**
 * @route   GET /api/jobs/:id
 * @desc    Get job by ID
 * @access  Public
 */
router.get("/:id", controller.getById);

/**
 * =========================================================
 * PROTECTED ROUTES
 * =========================================================
 */

/**
 * @route   POST /api/jobs
 * @desc    Create a new job
 * @access  Private (HR Managers & Super Admins)
 */
router.post(
  "/",
  authenticate,
  authorize(...JOB_MANAGER_ROLES),
  controller.create,
);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job
 * @access  Private (HR Managers & Super Admins)
 */
router.put(
  "/:id",
  authenticate,
  authorize(...JOB_MANAGER_ROLES),
  controller.update,
);

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job
 * @access  Private (Super Admin Only)
 */
router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
