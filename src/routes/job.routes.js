// const express = require("express");

// const router = express.Router();

// const controller = require("../controllers/job.controller");
// const validate = require("../middleware/validate.middleware");

// const { createJobValidation } = require("../validations/job.validation");

// router.get("/", controller.getAll);

// router.get("/:id", controller.getById);

// router.post("/", createJobValidation, validate, controller.create);

// router.put("/:id", createJobValidation, validate, controller.update);

// router.delete("/:id", controller.remove);

// module.exports = router;

const express = require("express");

const router = express.Router();

const controller = require("../controllers/job.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Public

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

// Protected

router.post(
  "/",
  authenticate,
  authorize("Super Admin", "Admin"),
  controller.create,
);

router.put(
  "/:id",
  authenticate,
  authorize("Super Admin", "Admin", "HR"),
  controller.update,
);

router.delete(
  "/:id",
  authenticate,
  authorize("Super Admin"),
  controller.remove,
);

module.exports = router;
