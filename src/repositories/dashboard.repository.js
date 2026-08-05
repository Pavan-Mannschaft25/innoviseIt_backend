const pool = require("../config/db");

const getSummary = async () => {
  const [[totalJobs]] = await pool.query(`
    SELECT COUNT(*) AS totalJobs
    FROM job_positions
  `);

  const [[openJobs]] = await pool.query(`
    SELECT COUNT(*) AS openJobs
    FROM job_positions
    WHERE status = 'Open'
  `);

  const [[departments]] = await pool.query(`
    SELECT COUNT(*) AS totalDepartments
    FROM departments
  `);

  const [[applications]] = await pool.query(`
    SELECT COUNT(*) AS totalApplications
    FROM applications
  `);

  const [[pending]] = await pool.query(`
    SELECT COUNT(*) AS pendingApplications
    FROM applications
    WHERE status = 'Pending'
  `);

  const [[interview]] = await pool.query(`
    SELECT COUNT(*) AS interviewApplications
    FROM applications
    WHERE status = 'Interview'
  `);

  const [[selected]] = await pool.query(`
    SELECT COUNT(*) AS selectedApplications
    FROM applications
    WHERE status = 'Selected'
  `);

  const [[rejected]] = await pool.query(`
    SELECT COUNT(*) AS rejectedApplications
    FROM applications
    WHERE status = 'Rejected'
  `);

  const [[today]] = await pool.query(`
    SELECT COUNT(*) AS todayApplications
    FROM applications
    WHERE DATE(applied_at) = CURDATE()
  `);

  return {
    totalJobs: totalJobs.totalJobs,
    openJobs: openJobs.openJobs,
    totalDepartments: departments.totalDepartments,
    totalApplications: applications.totalApplications,
    pendingApplications: pending.pendingApplications,
    interviewApplications: interview.interviewApplications,
    selectedApplications: selected.selectedApplications,
    rejectedApplications: rejected.rejectedApplications,
    todayApplications: today.todayApplications,
  };
};

const getRecentJobs = async () => {
  const [rows] = await pool.query(`
    SELECT
      jp.id,
      jp.title,
      jp.location,
      jp.status,
      jp.created_at,
      d.department_name
    FROM job_positions jp
    JOIN departments d
      ON jp.department_id=d.id
    ORDER BY jp.created_at DESC
    LIMIT 5
  `);

  return rows;
};

const getRecentApplications = async () => {
  const [rows] = await pool.query(`
    SELECT
      a.id,
      CONCAT(a.first_name,' ',a.last_name) applicant,
      a.email,
      a.status,
      a.applied_at,
      jp.title
    FROM applications a
    JOIN job_positions jp
      ON a.job_id=jp.id
    ORDER BY a.applied_at DESC
    LIMIT 5
  `);

  return rows;
};

const getJobStatus = async () => {
  const [rows] = await pool.query(`
    SELECT
      status,
      COUNT(*) value
    FROM job_positions
    GROUP BY status
  `);

  return rows;
};

const getApplicationStatus = async () => {
  const [rows] = await pool.query(`
    SELECT
      status,
      COUNT(*) value
    FROM applications
    GROUP BY status
  `);

  return rows;
};

const getDepartmentWiseJobs = async () => {
  const [rows] = await pool.query(`
    SELECT
      d.department_name,
      COUNT(jp.id) jobs
    FROM departments d
    LEFT JOIN job_positions jp
      ON d.id=jp.department_id
    GROUP BY d.department_name
  `);

  return rows;
};

const getRecentActivities = async (limit = 10) => {
  const sql = `
    SELECT
      al.id,
      al.module,
      al.action,
      al.description,
      al.created_at,

      a.full_name AS admin

    FROM audit_logs al

    INNER JOIN admins a
      ON al.admin_id = a.id

    ORDER BY al.created_at DESC

    LIMIT ?
  `;

  const [rows] = await pool.query(sql, [Number(limit)]);

  return rows;
};

const getMonthlyApplications = async () => {
  const [rows] = await pool.query(`
    SELECT
      YEAR(applied_at) AS year,
      MONTH(applied_at) AS monthNumber,
      DATE_FORMAT(MIN(applied_at), '%b') AS month,
      COUNT(*) AS apps
    FROM applications
    GROUP BY
      YEAR(applied_at),
      MONTH(applied_at)
    ORDER BY
      YEAR(applied_at),
      MONTH(applied_at)
  `);

  return rows;
};

module.exports = {
  getSummary,
  getRecentJobs,
  getRecentApplications,
  getJobStatus,
  getApplicationStatus,
  getDepartmentWiseJobs,
  getRecentActivities,
  getMonthlyApplications,
};
