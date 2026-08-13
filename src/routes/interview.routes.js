const express = require("express");

const router = express.Router();

const controller = require("../controllers/interview.controller");

router.post("/", controller.schedule);

router.get("/:id", controller.getById);

router.get("/application/:applicationId", controller.getByApplicationId);

router.put("/:id", controller.update);

router.patch("/:id/status", controller.updateStatus);

router.delete("/:id", controller.remove);

module.exports = router;
