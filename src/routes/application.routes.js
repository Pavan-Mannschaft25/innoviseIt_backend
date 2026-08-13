// // const express = require("express");

// // const router = express.Router();

// // const controller = require("../controllers/application.controller");

// // const upload = require("../middleware/upload.middleware");

// // const {
// //   createApplicationValidation,
// // } = require("../validations/application.validation");

// // const {
// //   updateStatusValidation,
// // } = require("../validations/applicationStatus.validation");

// // const validate = require("../middleware/validate.middleware");

// // router.post(
// //   "/",
// //   upload.single("resume"),
// //   createApplicationValidation,
// //   validate,
// //   controller.create,
// // );

// // router.get("/", controller.getAll);

// // router.get("/:id", controller.getById);

// // router.put(
// //   "/:id/status",
// //   updateStatusValidation,
// //   validate,
// //   controller.updateStatus,
// // );

// // router.delete("/:id", controller.remove);

// // module.exports = router;

// // const express = require("express");

// // const router = express.Router();

// // const controller = require("../controllers/application.controller");

// // const upload = require("../middleware/upload.middleware");

// // const authenticate = require("../middleware/auth.middleware");
// // const authorize = require("../middleware/role.middleware");

// // // Public

// // router.post("/", upload.single("resume"), controller.create);

// // // Protected

// // router.get(
// //   "/",
// //   authenticate,
// //   authorize("Super Admin", "Admin", "HR", "Recruiter"),
// //   controller.getAll,
// // );

// // router.get(
// //   "/:id",
// //   authenticate,
// //   authorize("Super Admin", "Admin", "HR", "Recruiter"),
// //   controller.getById,
// // );

// // // router.put(
// // //   "/:id/status",
// // //   authenticate,
// // //   authorize("Super Admin", "Admin", "HR", "Recruiter"),
// // //   controller.updateStatus,
// // // );

// // router.put(
// //   "/:id/status",
// //   authenticate,
// //   authorize("HR", "Recruiter", "Admin", "Super Admin"),
// //   controller.updateStatus,
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

// const controller = require("../controllers/application.controller");
// const upload = require("../middleware/upload.middleware");

// const authenticate = require("../middleware/auth.middleware");
// const authorize = require("../middleware/role.middleware");

// // =====================================================
// // PUBLIC
// // =====================================================

// // Candidate submits application
// router.post("/", upload.single("resume"), controller.create);

// // =====================================================
// // PROTECTED
// // =====================================================

// // Get all applications
// router.get(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   controller.getAll,
// );

// // =====================================================
// // RESUME
// // =====================================================

// // Generate secure temporary S3 resume URL
// router.get(
//   "/:id/resume",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   controller.getResumeUrl,
// );

// // =====================================================
// // APPLICATION BY ID
// // =====================================================

// router.get(
//   "/:id",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter"),
//   controller.getById,
// );

// // =====================================================
// // UPDATE STATUS
// // =====================================================

// router.put(
//   "/:id/status",
//   authenticate,
//   authorize("HR", "Recruiter", "Admin", "Super Admin"),
//   controller.updateStatus,
// );

// // =====================================================
// // DELETE
// // =====================================================

// router.delete(
//   "/:id",
//   authenticate,
//   authorize("Super Admin"),
//   controller.remove,
// );

// module.exports = router;

const express = require("express");

const router = express.Router();

const controller = require("../controllers/application.controller");

const upload = require("../middleware/upload.middleware");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

/**
 * =========================================================
 * PUBLIC
 * =========================================================
 */

/**
 * Candidate submits application
 */
router.post("/", upload.single("resume"), controller.create);

/**
 * =========================================================
 * PROTECTED
 * =========================================================
 */

/**
 * Get all applications
 */
router.get(
  "/",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  controller.getAll,
);

/**
 * Generate secure temporary S3 resume URL
 */
router.get(
  "/:id/resume",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  controller.getResumeUrl,
);

/**
 * Get application by ID
 */
router.get(
  "/:id",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter"),
  controller.getById,
);

/**
 * Update application status
 */
router.put(
  "/:id/status",
  authenticate,
  authorize("HR", "Recruiter", "Admin", "Super Admin"),
  controller.updateStatus,
);

/**
 * Delete application
 */
router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
