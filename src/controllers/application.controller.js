// const applicationService = require("../services/application.service");
// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// exports.create = asyncHandler(async (req, res) => {
//   const id = await applicationService.create({
//     ...req.body,
//     resume: req.file?.filename,
//   });

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Application submitted successfully", { id }));
// });

// exports.getAll = asyncHandler(async (req, res) => {
//   const result = await applicationService.getAll(req.query);

//   res.json(new ApiResponse(200, "Applications fetched successfully", result));
// });

// exports.getById = asyncHandler(async (req, res) => {
//   const application = await applicationService.getById(req.params.id);

//   res.json(
//     new ApiResponse(200, "Application fetched successfully", application),
//   );
// });

// exports.updateStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;

//   await applicationService.updateStatus(req.params.id, status);

//   res.json(new ApiResponse(200, "Application status updated successfully"));
// });

// exports.remove = asyncHandler(async (req, res) => {
//   await applicationService.remove(req.params.id);

//   res.json(new ApiResponse(200, "Application deleted successfully"));
// });

const applicationService = require("../services/application.service");
const auditService = require("../services/audit.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Candidate submits application
 * No audit log required
 */
exports.create = asyncHandler(async (req, res) => {
  const id = await applicationService.create({
    ...req.body,
    resume: req.file?.filename,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Application submitted successfully", { id }));
});

/**
 * Get all applications
 */
exports.getAll = asyncHandler(async (req, res) => {
  const result = await applicationService.getAll(req.query);

  res.json(new ApiResponse(200, "Applications fetched successfully", result));
});

/**
 * Get application by ID
 */
exports.getById = asyncHandler(async (req, res) => {
  const application = await applicationService.getById(req.params.id);

  res.json(
    new ApiResponse(200, "Application fetched successfully", application),
  );
});

/**
 * Update Application Status
 */
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  await applicationService.updateStatus(req.params.id, status);

  // Fetch updated application
  const application = await applicationService.getById(req.params.id);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Applications",
    action: "STATUS_UPDATE",
    description: `Updated ${application.first_name} ${application.last_name}'s application status to ${status}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Application status updated successfully"));
});

/**
 * Delete Application
 */
exports.remove = asyncHandler(async (req, res) => {
  // Fetch application before deleting
  const application = await applicationService.getById(req.params.id);

  await applicationService.remove(req.params.id);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Applications",
    action: "DELETE",
    description: `Deleted application of ${application.first_name} ${application.last_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Application deleted successfully"));
});
