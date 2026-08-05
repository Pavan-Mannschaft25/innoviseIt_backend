// const express = require("express");

// const router = express.Router();

// const dashboardController = require("../controllers/dashboard.controller");

// router.get("/", dashboardController.getDashboard);

// module.exports = router;

const express = require("express");

const router = express.Router();

const controller = require("../controllers/dashboard.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.get(
  "/",
  authenticate,
  authorize("Super Admin", "Admin", "HR", "Recruiter", "Viewer"),
  controller.getDashboard,
);

router.get("/recent-activities", authenticate, controller.getRecentActivities);

module.exports = router;
