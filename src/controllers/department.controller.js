// const departmentService = require("../services/department.service");
// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// exports.getAll = asyncHandler(async (req, res) => {
//   const departments = await departmentService.getAll();

//   res
//     .status(200)
//     .json(
//       new ApiResponse(200, "Departments fetched successfully", departments),
//     );
// });

// exports.getById = asyncHandler(async (req, res) => {
//   const department = await departmentService.getById(req.params.id);

//   res
//     .status(200)
//     .json(new ApiResponse(200, "Department fetched successfully", department));
// });

// exports.create = asyncHandler(async (req, res) => {
//   const id = await departmentService.create(req.body);

//   res
//     .status(201)
//     .json(new ApiResponse(201, "Department created successfully", { id }));
// });

// exports.update = asyncHandler(async (req, res) => {
//   await departmentService.update(req.params.id, req.body);

//   res.status(200).json(new ApiResponse(200, "Department updated successfully"));
// });

// exports.remove = asyncHandler(async (req, res) => {
//   await departmentService.remove(req.params.id);

//   res.status(200).json(new ApiResponse(200, "Department deleted successfully"));
// });

const departmentService = require("../services/department.service");
const auditService = require("../services/audit.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const departments = await departmentService.getAll();

  res
    .status(200)
    .json(
      new ApiResponse(200, "Departments fetched successfully", departments),
    );
});

exports.getById = asyncHandler(async (req, res) => {
  const department = await departmentService.getById(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, "Department fetched successfully", department));
});

/**
 * Create Department
 */
// exports.create = asyncHandler(async (req, res) => {
//   const id = await departmentService.create(req.body);

//   // Get created department
//   const department = await departmentService.getById(id);

//   // Audit Log
//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Departments",
//     action: "CREATE",
//     description: `Created department: ${department.name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.status(201).json(
//     new ApiResponse(201, "Department created successfully", {
//       id,
//     }),
//   );
// });
exports.create = asyncHandler(async (req, res) => {
  const id = await departmentService.create(req.body);

  const department = await departmentService.getById(id);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Departments",
    action: "CREATE",
    description: `Created department: ${department.department_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Department created successfully", department));
});

/**
 * Update Department
 */
// exports.update = asyncHandler(async (req, res) => {
//   await departmentService.update(req.params.id, req.body);

//   // Get updated department
//   const department = await departmentService.getById(req.params.id);

//   // Audit Log
//   await auditService.logActivity({
//     admin_id: req.user.id,
//     module: "Departments",
//     action: "UPDATE",
//     description: `Updated department: ${department.name}`,
//     ip_address: req.ip,
//     user_agent: req.headers["user-agent"],
//   });

//   res.status(200).json(new ApiResponse(200, "Department updated successfully"));
// });
exports.update = asyncHandler(async (req, res) => {
  await departmentService.update(req.params.id, req.body);

  const department = await departmentService.getById(req.params.id);

  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Departments",
    action: "UPDATE",
    description: `Updated department: ${department.department_name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Department updated successfully", department));
});

/**
 * Delete Department
 */
exports.remove = asyncHandler(async (req, res) => {
  // Get department before deleting
  const department = await departmentService.getById(req.params.id);

  await departmentService.remove(req.params.id);

  // Audit Log
  await auditService.logActivity({
    admin_id: req.user.id,
    module: "Departments",
    action: "DELETE",
    description: `Deleted department: ${department.name}`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.status(200).json(new ApiResponse(200, "Department deleted successfully"));
});
