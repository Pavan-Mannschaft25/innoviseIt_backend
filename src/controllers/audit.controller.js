// const auditService = require("../services/audit.service");

// /**
//  * GET /api/audit-logs
//  * Get all audit logs
//  */
// const getAll = async (req, res, next) => {
//   try {
//     const logs = await auditService.getAll();

//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Audit logs fetched successfully",
//       data: logs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * GET /api/audit-logs/:id
//  * Get audit log by ID
//  */
// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const log = await auditService.getById(id);

//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Audit log fetched successfully",
//       data: log,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * GET /api/audit-logs/admin/:adminId
//  * Get logs by admin
//  */
// const getByAdmin = async (req, res, next) => {
//   try {
//     const { adminId } = req.params;

//     const logs = await auditService.getByAdmin(adminId);

//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Admin audit logs fetched successfully",
//       data: logs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * GET /api/audit-logs/module/:module
//  * Get logs by module
//  */
// const getByModule = async (req, res, next) => {
//   try {
//     const { module } = req.params;

//     const logs = await auditService.getByModule(module);

//     res.status(200).json({
//       success: true,
//       statusCode: 200,
//       message: "Module audit logs fetched successfully",
//       data: logs,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getAll,
//   getById,
//   getByAdmin,
//   getByModule,
// };

const auditService = require("../services/audit.service");

/**
 * GET /api/audit-logs
 * Get all audit logs
 */
const getAll = async (req, res, next) => {
  try {
    const logs = await auditService.getAll(req.query);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Audit logs fetched successfully",
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/audit-logs/:id
 * Get audit log by ID
 */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid audit log ID.",
      });
    }

    const log = await auditService.getById(id);

    if (!log) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Audit log not found.",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Audit log fetched successfully.",
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/audit-logs/admin/:adminId
 * Get audit logs by admin
 */
const getByAdmin = async (req, res, next) => {
  try {
    const { adminId } = req.params;

    if (isNaN(adminId)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Invalid admin ID.",
      });
    }

    const logs = await auditService.getByAdmin(adminId);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Admin audit logs fetched successfully.",
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/audit-logs/module/:module
 * Get audit logs by module
 */
const getByModule = async (req, res, next) => {
  try {
    const { module } = req.params;

    const logs = await auditService.getByModule(module);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Module audit logs fetched successfully.",
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  getByAdmin,
  getByModule,
};
