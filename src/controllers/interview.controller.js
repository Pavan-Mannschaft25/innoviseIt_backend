const interviewService = require("../services/interview.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const schedule = asyncHandler(async (req, res) => {
  const interview = await interviewService.scheduleInterview(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, "Interview scheduled successfully", interview));
});

const getById = asyncHandler(async (req, res) => {
  const interview = await interviewService.getById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Interview fetched successfully", interview));
});

const getByApplicationId = asyncHandler(async (req, res) => {
  const interviews = await interviewService.getByApplicationId(
    req.params.applicationId,
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Interviews fetched successfully", interviews));
});

const update = asyncHandler(async (req, res) => {
  await interviewService.update(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, "Interview updated successfully", null));
});

const updateStatus = asyncHandler(async (req, res) => {
  await interviewService.updateStatus(req.params.id, req.body.status);

  res
    .status(200)
    .json(new ApiResponse(200, "Interview status updated successfully", null));
});

const remove = asyncHandler(async (req, res) => {
  await interviewService.remove(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Interview deleted successfully", null));
});

module.exports = {
  schedule,
  getById,
  getByApplicationId,
  update,
  updateStatus,
  remove,
};
