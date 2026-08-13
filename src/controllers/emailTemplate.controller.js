const service = require("../services/emailTemplate.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const data = await service.getAll();

  res.json(new ApiResponse(200, "Email templates fetched successfully", data));
});

exports.getById = asyncHandler(async (req, res) => {
  const data = await service.getById(req.params.id);

  res.json(new ApiResponse(200, "Email template fetched successfully", data));
});

exports.create = asyncHandler(async (req, res) => {
  const id = await service.create(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Email template created successfully", { id }));
});

exports.update = asyncHandler(async (req, res) => {
  await service.update(req.params.id, req.body);

  res.json(new ApiResponse(200, "Email template updated successfully"));
});

exports.remove = asyncHandler(async (req, res) => {
  await service.remove(req.params.id);

  res.json(new ApiResponse(200, "Email template deleted successfully"));
});
