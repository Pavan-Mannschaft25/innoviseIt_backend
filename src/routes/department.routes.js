// // const express = require("express");
// // const router = express.Router();

// // const controller = require("../controllers/department.controller");
// // const validate = require("../middleware/validate.middleware");
// // const {
// //   createDepartmentValidation,
// // } = require("../validations/department.validation");

// // // GET all
// // router.get("/", controller.getAll);

// // // GET by id
// // router.get("/:id", controller.getById);

// // // POST
// // router.post("/", createDepartmentValidation, validate, controller.create);

// // // PUT
// // router.put("/:id", createDepartmentValidation, validate, controller.update);

// // // DELETE
// // router.delete("/:id", controller.remove);

// // module.exports = router;

// // const express = require("express");

// // const router = express.Router();

// // const controller = require("../controllers/department.controller");

// // const authenticate = require("../middleware/auth.middleware");
// // const authorize = require("../middleware/role.middleware");

// // router.get("/", authenticate, controller.getAll);

// // router.get("/:id", authenticate, controller.getById);

// // router.post(
// //   "/",
// //   authenticate,
// //   authorize("Super Admin", "Admin"),
// //   controller.create,
// // );

// // router.put(
// //   "/:id",
// //   authenticate,
// //   authorize("Super Admin", "Admin"),
// //   controller.update,
// // );

// // router.delete(
// //   "/:id",
// //   authenticate,
// //   authorize("Super Admin"),
// //   controller.remove,
// // );

// // module.exports = router;

// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/department.controller");
// const authenticate = require("../middleware/auth.middleware");
// const authorize = require("../middleware/role.middleware");

// /**
//  * =========================================================
//  * PUBLIC ROUTES
//  * =========================================================
//  */

// // Get all departments
// router.get("/", controller.getAll);

// // Get department by ID
// router.get("/:id", controller.getById);

// /**
//  * =========================================================
//  * PROTECTED ADMIN ROUTES
//  * =========================================================
//  */

// // Create department
// router.post(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin"),
//   controller.create,
// );

// // Update department
// router.put(
//   "/:id",
//   authenticate,
//   authorize("Super Admin", "Admin"),
//   controller.update,
// );

// // Delete department
// router.delete(
//   "/:id",
//   authenticate,
//   authorize("Super Admin"),
//   controller.remove,
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/department.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

/**
 * Roles allowed to manage departments
 */
const DEPT_MANAGER_ROLES = [
  "Super Admin",
  "HR Administrator",
  "Talent Acquisition Manager",
  "HR Operations",
];

/**
 * =========================================================
 * PUBLIC ROUTES
 * =========================================================
 */

/**
 * @route   GET /api/departments
 * @desc    Get all departments
 * @access  Public (Used by public career site and dropdowns)
 */
router.get("/", controller.getAll);

/**
 * @route   GET /api/departments/:id
 * @desc    Get department by ID
 * @access  Public
 */
router.get("/:id", controller.getById);

/**
 * =========================================================
 * PROTECTED ADMIN ROUTES
 * =========================================================
 */

/**
 * @route   POST /api/departments
 * @desc    Create department
 * @access  Private (HR & Super Admins)
 */
router.post(
  "/",
  authenticate,
  authorize(...DEPT_MANAGER_ROLES),
  controller.create,
);

/**
 * @route   PUT /api/departments/:id
 * @desc    Update department
 * @access  Private (HR & Super Admins)
 */
router.put(
  "/:id",
  authenticate,
  authorize(...DEPT_MANAGER_ROLES),
  controller.update,
);

/**
 * @route   DELETE /api/departments/:id
 * @desc    Delete department
 * @access  Private (Super Admin Only)
 */
router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
