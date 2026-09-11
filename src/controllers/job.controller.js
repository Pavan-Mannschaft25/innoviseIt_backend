// const jobService = require("../services/job.service");
// const auditService = require("../services/audit.service");

// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// exports.getAll = asyncHandler(async (req, res) => {
//   const result = await jobService.getAll(req.query);

//   res.json(new ApiResponse(200, "Jobs fetched successfully", result));
// });

const jobService = require("../services/job.service");
const auditService = require("../services/audit.service");
const linkedinService = require("../services/linkedin.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.getAll = asyncHandler(async (req, res) => {
  const query = { ...req.query };

  // If no Authorization header, it's the public website. Hide Closed jobs.
  if (!req.headers.authorization) {
    query.excludeClosed = true;
  }

  const result = await jobService.getAll(query);

  res.json(new ApiResponse(200, "Jobs fetched successfully", result));
});

exports.getById = asyncHandler(async (req, res) => {
  const job = await jobService.getById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  // If public user tries to view a Closed job, hide it
  if (!req.headers.authorization && job.status === "Closed") {
    throw new ApiError(404, "Job not found");
  }

  res.json(new ApiResponse(200, "Job fetched successfully", job));
});

exports.getById = asyncHandler(async (req, res) => {
  const job = await jobService.getById(req.params.id);

  res.json(new ApiResponse(200, "Job fetched successfully", job));
});

/**
 * Create Job
 */
// exports.create = asyncHandler(async (req, res) => {
//   const id = await jobService.create(req.body);

//   // Fetch created job
//   const job = await jobService.getById(id);

//   // Audit Log
//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Jobs",
//     action: "CREATE",
//     description: `Created job: ${job.title}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Job created successfully", { id }));
// });
exports.create = asyncHandler(async (req, res) => {
  const id = await jobService.create(req.body);

  // Fetch created job
  const job = await jobService.getById(id);

  // Post to LinkedIn
  await linkedinService.postJobToLinkedIn(job);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Jobs",
    action: "CREATE",
    description: `Created job: ${job.title}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Job created successfully", { id }));
});

/**
 * Update Job
 */
exports.update = asyncHandler(async (req, res) => {
  await jobService.update(req.params.id, req.body);

  // Fetch updated job
  const job = await jobService.getById(req.params.id);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Jobs",
    action: "UPDATE",
    description: `Updated job: ${job.title}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.status(200).json(new ApiResponse(200, "Job updated successfully"));
});

/**
 * Delete Job
 */
exports.remove = asyncHandler(async (req, res) => {
  // Fetch job before deleting
  const job = await jobService.getById(req.params.id);

  await jobService.remove(req.params.id);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Jobs",
    action: "DELETE",
    description: `Deleted job: ${job.title}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.status(200).json(new ApiResponse(200, "Job deleted successfully"));
});
