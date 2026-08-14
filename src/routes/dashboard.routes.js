// const express = require("express");

// const router = express.Router();

// const dashboardController = require("../controllers/dashboard.controller");

// router.get("/", dashboardController.getDashboard);

// module.exports = router;

// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/dashboard.controller");

// const authenticate = require("../middleware/auth.middleware");
// const authorize = require("../middleware/role.middleware");

// router.get(
//   "/",
//   authenticate,
//   authorize("Super Admin", "Admin", "HR", "Recruiter", "Viewer"),
//   controller.getDashboard,
// );

// router.get("/recent-activities", authenticate, controller.getRecentActivities);

// module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/dashboard.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

/**
 * Roles allowed to view the main Dashboard
 */
const DASHBOARD_ROLES = [
  "Super Admin",
  "HR Administrator",
  "Talent Acquisition Manager",
  "Recruiter",
  "Talent Sourcer",
  "Hiring Manager",
  "HR Operations",
  "Management Viewer",
  "Auditor",
];

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard stats
 * @access  Private (Authenticated Users with Dashboard Access)
 */
router.get(
  "/",
  authenticate,
  authorize(...DASHBOARD_ROLES),
  controller.getDashboard,
);

/**
 * @route   GET /api/dashboard/recent-activities
 * @desc    Get recent activities/audit logs for dashboard widget
 * @access  Private (Any authenticated user)
 */
router.get("/recent-activities", authenticate, controller.getRecentActivities);

module.exports = router;
