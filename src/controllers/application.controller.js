// // const applicationService = require("../services/application.service");
// // const ApiResponse = require("../utils/ApiResponse");
// // const asyncHandler = require("../utils/asyncHandler");

// // exports.create = asyncHandler(async (req, res) => {
// //   const id = await applicationService.create({
// //     ...req.body,
// //     resume: req.file?.filename,
// //   });

// //   res
// //     .status(201)
// //     .json(new ApiResponse(201, "Application submitted successfully", { id }));
// // });

// // exports.getAll = asyncHandler(async (req, res) => {
// //   const result = await applicationService.getAll(req.query);

// //   res.json(new ApiResponse(200, "Applications fetched successfully", result));
// // });

// // exports.getById = asyncHandler(async (req, res) => {
// //   const application = await applicationService.getById(req.params.id);

// //   res.json(
// //     new ApiResponse(200, "Application fetched successfully", application),
// //   );
// // });

// // exports.updateStatus = asyncHandler(async (req, res) => {
// //   const { status } = req.body;

// //   await applicationService.updateStatus(req.params.id, status);

// //   res.json(new ApiResponse(200, "Application status updated successfully"));
// // });

// // exports.remove = asyncHandler(async (req, res) => {
// //   await applicationService.remove(req.params.id);

// //   res.json(new ApiResponse(200, "Application deleted successfully"));
// // });

// // const applicationService = require("../services/application.service");
// // const auditService = require("../services/audit.service");

// // const ApiResponse = require("../utils/ApiResponse");
// // const asyncHandler = require("../utils/asyncHandler");

// // /**
// //  * Candidate submits application
// //  * No audit log required
// //  */
// // // exports.create = asyncHandler(async (req, res) => {
// // //   const id = await applicationService.create({
// // //     ...req.body,
// // //     resume: req.file?.filename,
// // //   });

// // //   res
// // //     .status(201)
// // //     .json(new ApiResponse(201, "Application submitted successfully", { id }));
// // // });
// // exports.create = asyncHandler(async (req, res) => {
// //   const id = await applicationService.create({
// //     ...req.body,
// //     resumeFile: req.file,
// //   });

// //   res
// //     .status(201)
// //     .json(new ApiResponse(201, "Application submitted successfully", { id }));
// // });

// // /**
// //  * Get all applications
// //  */
// // // exports.getAll = asyncHandler(async (req, res) => {
// // //   const result = await applicationService.getAll(req.query);

// // //   res.json(new ApiResponse(200, "Applications fetched successfully", result));
// // // });
// // exports.getAll = asyncHandler(async (req, res) => {
// //   const result = await applicationService.getAll(req.query);

// //   const applicationsWithResumeUrl = await Promise.all(
// //     result.applications.map(async (application) => {
// //       let resume_url = null;

// //       if (application.resume) {
// //         resume_url = await getResumeSignedUrl(application.resume);
// //       }

// //       return {
// //         ...application,
// //         resume_url,
// //       };
// //     }),
// //   );

// //   result.applications = applicationsWithResumeUrl;

// //   res
// //     .status(200)
// //     .json(new ApiResponse(200, "Applications fetched successfully", result));
// // });

// // /**
// //  * Get application by ID
// //  */
// // exports.getById = asyncHandler(async (req, res) => {
// //   const application = await applicationService.getById(req.params.id);

// //   res.json(
// //     new ApiResponse(200, "Application fetched successfully", application),
// //   );
// // });

// // exports.getResumeUrl = asyncHandler(async (req, res) => {
// //   const result = await applicationService.getResumeUrl(req.params.id);

// //   res.json(new ApiResponse(200, "Resume URL generated successfully", result));
// // });

// // /**
// //  * Update Application Status
// //  */
// // exports.updateStatus = asyncHandler(async (req, res) => {
// //   const { status } = req.body;

// //   await applicationService.updateStatus(req.params.id, status);

// //   // Fetch updated application
// //   const application = await applicationService.getById(req.params.id);

// //   // Audit Log
// //   await auditService.logActivity({
// //     admin_id: req.user.id,
// //     module: "Applications",
// //     action: "STATUS_UPDATE",
// //     description: `Updated ${application.first_name} ${application.last_name}'s application status to ${status}`,
// //     ip_address: req.ip,
// //     user_agent: req.headers["user-agent"],
// //   });

// //   res.json(new ApiResponse(200, "Application status updated successfully"));
// // });

// // /**
// //  * Delete Application
// //  */
// // exports.remove = asyncHandler(async (req, res) => {
// //   // Fetch application before deleting
// //   const application = await applicationService.getById(req.params.id);

// //   await applicationService.remove(req.params.id);

// //   // Audit Log
// //   await auditService.logActivity({
// //     admin_id: req.user.id,
// //     module: "Applications",
// //     action: "DELETE",
// //     description: `Deleted application of ${application.first_name} ${application.last_name}`,
// //     ip_address: req.ip,
// //     user_agent: req.headers["user-agent"],
// //   });

// //   res.json(new ApiResponse(200, "Application deleted successfully"));
// // });

// const applicationService = require("../services/application.service");
// const auditService = require("../services/audit.service");

// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// const { getResumeSignedUrl } = require("../utils/s3Url");

// /**
//  * Candidate submits application
//  * No audit log required
//  */
// exports.create = asyncHandler(async (req, res) => {
//   const id = await applicationService.create({
//     ...req.body,
//     resumeFile: req.file,
//   });

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Application submitted successfully", { id }));
// });

// /**
//  * Get all applications
//  */
// exports.getAll = asyncHandler(async (req, res) => {
//   const result = await applicationService.getAll(req.query);

//   const applicationsWithResumeUrl = await Promise.all(
//     result.applications.map(async (application) => {
//       let resume_url = null;

//       if (application.resume) {
//         resume_url = await getResumeSignedUrl(application.resume);
//       }

//       return {
//         ...application,
//         resume_url,
//       };
//     }),
//   );

//   result.applications = applicationsWithResumeUrl;

//   res
//     .status(200)
//     .json(new ApiResponse(200, "Applications fetched successfully", result));
// });

// /**
//  * Get application by ID
//  */
// exports.getById = asyncHandler(async (req, res) => {
//   const application = await applicationService.getById(req.params.id);

//   if (application?.resume) {
//     application.resume_url = await getResumeSignedUrl(application.resume);
//   }

//   res.json(
//     new ApiResponse(200, "Application fetched successfully", application),
//   );
// });

// /**
//  * Generate Resume Signed URL
//  */
// exports.getResumeUrl = asyncHandler(async (req, res) => {
//   const result = await applicationService.getResumeUrl(req.params.id);

//   if (!result || !result.resume) {
//     return res.status(404).json(new ApiResponse(404, "Resume not found"));
//   }

//   const resume_url = await getResumeSignedUrl(result.resume);

//   res.json(
//     new ApiResponse(200, "Resume URL generated successfully", {
//       resume_url,
//     }),
//   );
// });

// /**
//  * Update Application Status
//  */
// exports.updateStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;

//   await applicationService.updateStatus(req.params.id, status);

//   // Fetch updated application
//   const application = await applicationService.getById(req.params.id);

//   // Audit Log
//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Applications",
//     action: "STATUS_UPDATE",
//     description: `Updated ${application.first_name} ${application.last_name}'s application status to ${status}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Application status updated successfully"));
// });

// /**
//  * Delete Application
//  */
// exports.remove = asyncHandler(async (req, res) => {
//   // Fetch application before deleting
//   const application = await applicationService.getById(req.params.id);

//   await applicationService.remove(req.params.id);

//   // Audit Log
//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Applications",
//     action: "DELETE",
//     description: `Deleted application of ${application.first_name} ${application.last_name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Application deleted successfully"));
// });

const applicationService = require("../services/application.service");
const auditService = require("../services/audit.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * =========================================================
 * CREATE APPLICATION
 * PUBLIC
 * =========================================================
 */
exports.create = asyncHandler(async (req, res) => {
  const id = await applicationService.create({
    ...req.body,
    resumeFile: req.file,
  });

  res.status(201).json(
    new ApiResponse(201, "Application submitted successfully", {
      id,
    }),
  );
});

/**
 * =========================================================
 * GET ALL APPLICATIONS
 * PROTECTED
 * =========================================================
 */
exports.getAll = asyncHandler(async (req, res) => {
  const result = await applicationService.getAll(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, "Applications fetched successfully", result));
});

/**
 * =========================================================
 * GET APPLICATION BY ID
 * PROTECTED
 * =========================================================
 */
exports.getById = asyncHandler(async (req, res) => {
  const application = await applicationService.getById(req.params.id);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Application fetched successfully", application),
    );
});

/**
 * =========================================================
 * GENERATE SECURE RESUME URL
 * PROTECTED
 * =========================================================
 */
exports.getResumeUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await applicationService.getResumeUrl(id);

  res.status(200).json({
    success: true,
    message: "Resume URL generated successfully",
    data: result,
  });
});

/**
 * =========================================================
 * UPDATE APPLICATION STATUS
 * PROTECTED
 * =========================================================
 */
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const application = await applicationService.updateStatus(
    req.params.id,
    status,
  );

  /**
   * Audit Log
   */
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Applications",
    action: "STATUS_UPDATE",
    description: `Updated ${application.first_name} ${application.last_name}'s application status to ${status}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Application status updated successfully",
        application,
      ),
    );
});

/**
 * =========================================================
 * DELETE APPLICATION
 * PROTECTED
 * =========================================================
 */
exports.remove = asyncHandler(async (req, res) => {
  const application = await applicationService.getById(req.params.id);

  await applicationService.remove(req.params.id);

  /**
   * Audit Log
   */
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Applications",
    action: "DELETE",
    description: `Deleted application of ${application.first_name} ${application.last_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Application deleted successfully"));
});
