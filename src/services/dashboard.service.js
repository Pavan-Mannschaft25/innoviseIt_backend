// const dashboardRepository = require("../repositories/dashboard.repository");

// const getDashboard = async () => ({
//   summary: await dashboardRepository.getSummary(),
//   recentJobs: await dashboardRepository.getRecentJobs(),
//   recentApplications: await dashboardRepository.getRecentApplications(),
//   jobStatus: await dashboardRepository.getJobStatus(),
//   applicationStatus: await dashboardRepository.getApplicationStatus(),
//   departments: await dashboardRepository.getDepartmentWiseJobs(),
// });

// const getRecentActivities = async (limit) => {
//   return await dashboardRepository.getRecentActivities(limit);
// };

// module.exports = {
//   getDashboard,
//   getRecentActivities,
// };

const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboard = async () => ({
  summary: await dashboardRepository.getSummary(),

  recentJobs: await dashboardRepository.getRecentJobs(),

  recentApplications: await dashboardRepository.getRecentApplications(),

  jobStatus: await dashboardRepository.getJobStatus(),

  applicationStatus: await dashboardRepository.getApplicationStatus(),

  departments: await dashboardRepository.getDepartmentWiseJobs(),

  monthlyApplications: await dashboardRepository.getMonthlyApplications(),
});

const getRecentActivities = async (limit) => {
  return await dashboardRepository.getRecentActivities(limit);
};

module.exports = {
  getDashboard,
  getRecentActivities,
};
