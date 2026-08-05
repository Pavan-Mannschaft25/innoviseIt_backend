// const authService = require("../services/auth.service");
// const ApiResponse = require("../utils/ApiResponse");
// const asyncHandler = require("../utils/asyncHandler");

// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const result = await authService.login(email, password);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   await authService.forgotPassword(email);

//   res.json(
//     new ApiResponse(
//       200,

//       "Password reset email sent successfully.",
//     ),
//   );
// });

// const resetPassword = asyncHandler(async (req, res) => {
//   const { token, password } = req.body;

//   await authService.resetPassword(token, password);

//   res.json(new ApiResponse(200, "Password reset successfully."));
// });

// module.exports = {
//   forgotPassword,
//   login,
//   resetPassword,
// };

const authService = require("../services/auth.service");
const auditService = require("../services/audit.service");

const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Login
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    // Audit Log
    await auditService.logActivity({
      admin_id: result.admin.id,
      module: "Authentication",
      action: "LOGIN",
      description: `${result.admin.full_name} logged into the system`,
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot Password
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  await authService.forgotPassword(email);

  res.json(new ApiResponse(200, "Password reset email sent successfully."));
});

/**
 * Reset Password
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  // authService should return the admin/user
  const admin = await authService.resetPassword(token, password);

  // Audit Log
  await auditService.logActivity({
    admin_id: admin.id,
    module: "Authentication",
    action: "RESET_PASSWORD",
    description: `${admin.full_name} reset password`,
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  });

  res.json(new ApiResponse(200, "Password reset successfully."));
});

module.exports = {
  login,
  forgotPassword,
  resetPassword,
};
