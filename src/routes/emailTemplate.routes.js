const express = require("express");

const router = express.Router();

const controller = require("../controllers/emailTemplate.controller");

const validate = require("../middleware/validate.middleware");

const {
  createTemplateValidation,
} = require("../validations/emailTemplate.validation");

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", createTemplateValidation, validate, controller.create);

router.put("/:id", createTemplateValidation, validate, controller.update);

router.delete("/:id", controller.remove);

module.exports = router;
