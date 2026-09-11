// const pool = require("../config/db");

// const findAll = async (query) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     department_id,
//     status,
//     sort = "latest",
//   } = query;

//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT
//       jp.*,
//       d.department_name
//     FROM job_positions jp
//     JOIN departments d
//       ON jp.department_id = d.id
//     WHERE 1 = 1
//   `;

//   const params = [];

//   // Search
//   if (search) {
//     sql += ` AND jp.title LIKE ?`;
//     params.push(`%${search}%`);
//   }

//   // Department Filter
//   if (department_id) {
//     sql += ` AND jp.department_id = ?`;
//     params.push(department_id);
//   }

//   // Status Filter
//   // if (status) {
//   //   sql += ` AND jp.status = ?`;
//   //   params.push(status);
//   // }

//   // Status Filter
//   if (status) {
//     sql += ` AND jp.status = ?`;
//     params.push(status);
//   } else if (query.excludeClosed) {
//     // Exclude Closed jobs for public website
//     sql += ` AND (jp.status IS NULL OR jp.status != 'Closed')`;
//   }

//   // Sorting
//   sql +=
//     sort === "oldest"
//       ? " ORDER BY jp.created_at ASC"
//       : " ORDER BY jp.created_at DESC";

//   // Pagination
//   sql += " LIMIT ? OFFSET ?";

//   params.push(Number(limit));
//   params.push(Number(offset));

//   const [rows] = await pool.query(sql, params);

//   // Total Count
//   let countSql = `
//       SELECT COUNT(*) AS total
//       FROM job_positions jp
//       WHERE 1 = 1
//   `;

//   const countParams = [];

//   if (search) {
//     countSql += " AND jp.title LIKE ?";
//     countParams.push(`%${search}%`);
//   }

//   if (department_id) {
//     countSql += " AND jp.department_id = ?";
//     countParams.push(department_id);
//   }

//   if (status) {
//     countSql += " AND jp.status = ?";
//     countParams.push(status);
//   }

//   const [[count]] = await pool.query(countSql, countParams);

//   return {
//     jobs: rows,
//     pagination: {
//       page: Number(page),
//       limit: Number(limit),
//       total: count.total,
//       totalPages: Math.ceil(count.total / limit),
//     },
//   };
// };

// const findById = async (id) => {
//   const [rows] = await pool.query(
//     `
//     SELECT
//       jp.*,
//       d.department_name
//     FROM job_positions jp
//     JOIN departments d
//       ON jp.department_id=d.id
//     WHERE jp.id=?
//   `,
//     [id],
//   );

//   return rows[0];
// };

const pool = require("../config/db");

/**
 * Helper: Automatically close jobs whose deadline has passed
 */
const closeExpiredJobs = async () => {
  try {
    await pool.query(
      `UPDATE job_positions 
       SET status = 'Closed' 
       WHERE application_deadline IS NOT NULL 
       AND application_deadline < CURDATE() 
       AND status != 'Closed'`,
    );
  } catch (error) {
    console.error("Error auto-closing expired jobs:", error);
  }
};

const findAll = async (query) => {
  // 1. Auto-close expired jobs before fetching
  await closeExpiredJobs();

  const {
    page = 1,
    limit = 10,
    search = "",
    department_id,
    status,
    excludeClosed,
    sort = "latest",
  } = query;

  const offset = (page - 1) * limit;

  let sql = `
    SELECT
      jp.*,
      d.department_name
    FROM job_positions jp
    JOIN departments d
      ON jp.department_id = d.id
    WHERE 1 = 1
  `;

  const params = [];

  // Search
  if (search) {
    sql += ` AND jp.title LIKE ?`;
    params.push(`%${search}%`);
  }

  // Department Filter
  if (department_id) {
    sql += ` AND jp.department_id = ?`;
    params.push(department_id);
  }

  // Status Filter
  if (status) {
    sql += ` AND jp.status = ?`;
    params.push(status);
  } else if (excludeClosed) {
    // Exclude Closed jobs for public website
    sql += ` AND (jp.status IS NULL OR jp.status != 'Closed')`;
  }

  // Sorting
  sql +=
    sort === "oldest"
      ? " ORDER BY jp.created_at ASC"
      : " ORDER BY jp.created_at DESC";

  // Pagination
  sql += " LIMIT ? OFFSET ?";

  params.push(Number(limit));
  params.push(Number(offset));

  const [rows] = await pool.query(sql, params);

  // Total Count
  let countSql = `
      SELECT COUNT(*) AS total
      FROM job_positions jp
      WHERE 1 = 1
  `;

  const countParams = [];

  if (search) {
    countSql += " AND jp.title LIKE ?";
    countParams.push(`%${search}%`);
  }

  if (department_id) {
    countSql += " AND jp.department_id = ?";
    countParams.push(department_id);
  }

  if (status) {
    countSql += " AND jp.status = ?";
    countParams.push(status);
  } else if (excludeClosed) {
    countSql += " AND (jp.status IS NULL OR jp.status != 'Closed')";
    countParams.push; // Just for safety
  }

  const [[count]] = await pool.query(countSql, countParams);

  return {
    jobs: rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count.total,
      totalPages: Math.ceil(count.total / limit),
    },
  };
};

const findById = async (id) => {
  // 1. Auto-close expired jobs before fetching
  await closeExpiredJobs();

  const [rows] = await pool.query(
    `
    SELECT
      jp.*,
      d.department_name
    FROM job_positions jp
    JOIN departments d
      ON jp.department_id=d.id
    WHERE jp.id=?
  `,
    [id],
  );

  return rows[0];
};

const create = async (job) => {
  const [result] = await pool.query(
    `INSERT INTO job_positions
    (
      department_id,
      title,
      location,
      employment_type,
      experience_level,
      salary_min,
      salary_max,
      description,
      responsibilities,
      requirements,
      benefits,
      status,
      openings,
      application_deadline
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      job.department_id,
      job.title,
      job.location,
      job.employment_type,
      job.experience_level,
      job.salary_min,
      job.salary_max,
      job.description,
      job.responsibilities,
      job.requirements,
      job.benefits,
      job.status,
      job.openings,
      job.application_deadline,
    ],
  );

  console.log("Insert Result:", result);

  return result.insertId;
};

// const update = async (id, job) => {
//   const [result] = await pool.query(
//     `
//     UPDATE job_positions
//     SET
//       department_id = ?,
//       title = ?,
//       location = ?,
//       employment_type = ?,
//       experience_level = ?,
//       salary_min = ?,
//       salary_max = ?,
//       description = ?,
//       responsibilities = ?,
//       requirements = ?,
//       benefits = ?,
//       status = ?,
//       openings = ?,
//       application_deadline = ?
//     WHERE id = ?
//     `,
//     [
//       job.department_id,
//       job.title,
//       job.location,
//       job.employment_type,
//       job.experience_level,
//       job.salary_min,
//       job.salary_max,
//       job.description,
//       job.responsibilities,
//       job.requirements,
//       job.benefits,
//       job.status,
//       job.openings,
//       job.application_deadline,
//       id,
//     ],
//   );

//   return result;
// };
const update = async (id, job) => {
  // Convert ISO date to MySQL DATE format
  if (job.application_deadline) {
    job.application_deadline = new Date(job.application_deadline)
      .toISOString()
      .split("T")[0];
  }

  const [result] = await pool.query(
    `
    UPDATE job_positions
    SET
      department_id = ?,
      title = ?,
      location = ?,
      employment_type = ?,
      experience_level = ?,
      salary_min = ?,
      salary_max = ?,
      description = ?,
      responsibilities = ?,
      requirements = ?,
      benefits = ?,
      status = ?,
      openings = ?,
      application_deadline = ?
    WHERE id = ?
    `,
    [
      job.department_id,
      job.title,
      job.location,
      job.employment_type,
      job.experience_level,
      job.salary_min,
      job.salary_max,
      job.description,
      job.responsibilities,
      job.requirements,
      job.benefits,
      job.status,
      job.openings,
      job.application_deadline,
      id,
    ],
  );

  return result;
};

const remove = async (id) => {
  const [result] = await pool.query("DELETE FROM job_positions WHERE id = ?", [
    id,
  ]);

  return result;
};

const findTitleById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT title
    FROM job_positions
    WHERE id=?
    `,
    [id],
  );

  return rows[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  findTitleById,
};
