const pool = require("../config/db");

const create = async (application) => {
  const [result] = await pool.query(
    `
    INSERT INTO applications
    (
      job_id,
      first_name,
      last_name,
      email,
      phone,
      linkedin,
      portfolio,
      experience,
      resume,
      cover_letter
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      application.job_id,
      application.first_name,
      application.last_name,
      application.email,
      application.phone,
      application.linkedin,
      application.portfolio,
      application.experience,
      application.resume,
      application.cover_letter,
    ],
  );

  return result.insertId;
};

const findAll = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    job_id,
    sort = "latest",
  } = query;

  const offset = (Number(page) - 1) * Number(limit);

  let sql = `
      SELECT
          a.*,
          jp.title AS job_title,
          d.department_name
      FROM applications a
      JOIN job_positions jp
          ON a.job_id = jp.id
      JOIN departments d
          ON jp.department_id = d.id
      WHERE 1=1
  `;

  const params = [];

  // Search
  if (search) {
    sql += `
      AND (
        a.first_name LIKE ?
        OR a.last_name LIKE ?
        OR a.email LIKE ?
      )
    `;

    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  // Status Filter
  if (status) {
    sql += " AND a.status = ?";
    params.push(status);
  }

  // Job Filter
  if (job_id) {
    sql += " AND a.job_id = ?";
    params.push(job_id);
  }

  // Sorting
  sql +=
    sort === "oldest"
      ? " ORDER BY a.applied_at ASC"
      : " ORDER BY a.applied_at DESC";

  // Pagination
  sql += " LIMIT ? OFFSET ?";

  params.push(Number(limit));
  params.push(offset);

  const [rows] = await pool.query(sql, params);

  // Count Query
  let countSql = `
      SELECT COUNT(*) AS total
      FROM applications a
      WHERE 1=1
  `;

  const countParams = [];

  if (search) {
    countSql += `
      AND (
        a.first_name LIKE ?
        OR a.last_name LIKE ?
        OR a.email LIKE ?
      )
    `;

    countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  if (status) {
    countSql += " AND a.status = ?";
    countParams.push(status);
  }

  if (job_id) {
    countSql += " AND a.job_id = ?";
    countParams.push(job_id);
  }

  const [[count]] = await pool.query(countSql, countParams);

  return {
    applications: rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: count.total,
      totalPages: Math.ceil(count.total / Number(limit)),
    },
  };
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      a.*,
      jp.title AS job_title
    FROM applications a
    JOIN job_positions jp
      ON a.job_id = jp.id
    WHERE a.id = ?
    `,
    [id],
  );

  return rows[0];
};

const updateStatus = async (id, status) => {
  const [result] = await pool.query(
    `
    UPDATE applications
    SET status = ?
    WHERE id = ?
    `,
    [status, id],
  );

  return result;
};

const remove = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM applications
    WHERE id = ?
    `,
    [id],
  );

  return result;
};

module.exports = {
  create,
  findAll,
  findById,
  updateStatus,
  remove,
};
