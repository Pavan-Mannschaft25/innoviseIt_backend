const dashboardService = require("../services/dashboard.service");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

exports.getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard();

  res.json(new ApiResponse(200, "Dashboard fetched successfully", data));
});

exports.getRecentActivities = async (req, res, next) => {
  try {
    const limit = req.query.limit || 10;

    const activities = await dashboardService.getRecentActivities(limit);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Recent activities fetched successfully",
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};
