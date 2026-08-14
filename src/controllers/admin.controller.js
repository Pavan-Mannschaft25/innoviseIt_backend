// // const adminService = require("../services/admin.service");
// // const ApiResponse = require("../utils/ApiResponse");
// // const asyncHandler = require("../utils/asyncHandler");

// // exports.getAll = asyncHandler(async (req, res) => {
// //   const admins = await adminService.getAll();

// //   res.json(new ApiResponse(200, "Admins fetched successfully", admins));
// // });

// // exports.getById = asyncHandler(async (req, res) => {
// //   const admin = await adminService.getById(req.params.id);

// //   res.json(new ApiResponse(200, "Admin fetched successfully", admin));
// // });

// // exports.create = asyncHandler(async (req, res) => {
// //   const admin = await adminService.create(req.body);

// //   res
// //     .status(201)
// //     .json(new ApiResponse(201, "Admin created successfully", admin));
// // });

// // exports.update = asyncHandler(async (req, res) => {
// //   const admin = await adminService.update(req.params.id, req.body);

// //   res.json(new ApiResponse(200, "Admin updated successfully", admin));
// // });

// // exports.updateRole = asyncHandler(async (req, res) => {
// //   const admin = await adminService.updateRole(req.params.id, req.body.role);

// //   res.json(new ApiResponse(200, "Role updated successfully", admin));
// // });

// // exports.updateRole = asyncHandler(async (req, res) => {
// //   const admin = await adminService.updateRole(req.params.id, req.body.role);

// //   res.json(new ApiResponse(200, "Role updated successfully", admin));
// // });

// // exports.updatePassword = asyncHandler(async (req, res) => {
// //   await adminService.updatePassword(req.params.id, req.body.password);

// //   res.json(new ApiResponse(200, "Password updated successfully"));
// // });

// // exports.remove = asyncHandler(async (req, res) => {
// //   await adminService.remove(req.params.id);

// //   res.json(new ApiResponse(200, "Admin deleted successfully"));
// // });

// const adminService = require("../services/admin.service");
// const auditService = require("../services/audit.service");

// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// exports.getAll = asyncHandler(async (req, res) => {
//   // const admins = await adminService.getAll();
//   const admins = await adminService.getAll(req.query);

//   res.json(new ApiResponse(200, "Admins fetched successfully", admins));
// });

// exports.getById = asyncHandler(async (req, res) => {
//   const admin = await adminService.getById(req.params.id);

//   res.json(new ApiResponse(200, "Admin fetched successfully", admin));
// });

// /**
//  * Create Admin
//  */
// exports.create = asyncHandler(async (req, res) => {
//   const admin = await adminService.create(req.body);

//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Admins",
//     action: "CREATE",
//     description: `Created admin: ${admin.full_name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Admin created successfully", admin));
// });

// /**
//  * Update Admin
//  */
// exports.update = asyncHandler(async (req, res) => {
//   const admin = await adminService.update(req.params.id, req.body);

//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Admins",
//     action: "UPDATE",
//     description: `Updated admin: ${admin.full_name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Admin updated successfully", admin));
// });

// /**
//  * Update Admin Role
//  */
// exports.updateRole = asyncHandler(async (req, res) => {
//   const admin = await adminService.updateRole(req.params.id, req.body.role);

//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Admins",
//     action: "ROLE_UPDATE",
//     description: `Changed ${admin.full_name}'s role to ${admin.role}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Role updated successfully", admin));
// });

// /**
//  * Update Password
//  */
// exports.updatePassword = asyncHandler(async (req, res) => {
//   const admin = await adminService.getById(req.params.id);

//   await adminService.updatePassword(req.params.id, req.body.password);

//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Admins",
//     action: "PASSWORD_UPDATE",
//     description: `Updated password for ${admin.full_name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Password updated successfully"));
// });

// /**
//  * Delete Admin
//  */
// exports.remove = asyncHandler(async (req, res) => {
//   const admin = await adminService.getById(req.params.id);

//   await adminService.remove(req.params.id);

//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Admins",
//     action: "DELETE",
//     description: `Deleted admin: ${admin.full_name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.json(new ApiResponse(200, "Admin deleted successfully"));
// });

const adminService = require("../services/admin.service");
const auditService = require("../services/audit.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const result = await adminService.getAll(req.query);
  res.json(new ApiResponse(200, "Admins fetched successfully", result));
});

exports.getById = asyncHandler(async (req, res) => {
  const admin = await adminService.getById(req.params.id);
  res.json(new ApiResponse(200, "Admin fetched successfully", admin));
});

exports.create = asyncHandler(async (req, res) => {
  const admin = await adminService.create(req.body);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Admins",
    action: "CREATE",
    description: `Created admin: ${admin.full_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Admin created successfully", admin));
});

exports.update = asyncHandler(async (req, res) => {
  const admin = await adminService.update(req.params.id, req.body);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Admins",
    action: "UPDATE",
    description: `Updated admin: ${admin.full_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Admin updated successfully", admin));
});

exports.updateRole = asyncHandler(async (req, res) => {
  const admin = await adminService.updateRole(req.params.id, req.body.role);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Admins",
    action: "ROLE_UPDATE",
    description: `Changed ${admin.full_name}'s role to ${admin.role}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Role updated successfully", admin));
});

exports.updatePassword = asyncHandler(async (req, res) => {
  const admin = await adminService.getById(req.params.id);
  await adminService.updatePassword(req.params.id, req.body.password);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Admins",
    action: "PASSWORD_UPDATE",
    description: `Updated password for ${admin.full_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Password updated successfully"));
});

exports.remove = asyncHandler(async (req, res) => {
  const admin = await adminService.getById(req.params.id);
  await adminService.remove(req.params.id);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Admins",
    action: "DELETE",
    description: `Deleted admin: ${admin.full_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Admin deleted successfully"));
});
