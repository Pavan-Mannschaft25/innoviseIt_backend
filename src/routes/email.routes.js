const express = require("express");

const router = express.Router();

const controller = require("../controllers/email.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Only Super Admin can test email

router.post(
  "/test",
  authenticate,
  authorize("Super Admin"),
  controller.sendTestEmail,
);

module.exports = router;
