// // // const pool = require("../config/db");

// // // const create = async (application) => {
// // //   const [result] = await pool.query(
// // //     `
// // //     INSERT INTO applications
// // //     (
// // //       job_id,
// // //       first_name,
// // //       last_name,
// // //       email,
// // //       phone,
// // //       linkedin,
// // //       portfolio,
// // //       experience,
// // //       resume,
// // //       cover_letter
// // //     )
// // //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// // //     `,
// // //     [
// // //       application.job_id,
// // //       application.first_name,
// // //       application.last_name,
// // //       application.email,
// // //       application.phone,
// // //       application.linkedin,
// // //       application.portfolio,
// // //       application.experience,
// // //       application.resume,
// // //       application.cover_letter,
// // //     ],
// // //   );

// // //   return result.insertId;
// // // };

// // // const findAll = async (query) => {
// // //   const {
// // //     page = 1,
// // //     limit = 10,
// // //     search = "",
// // //     status,
// // //     job_id,
// // //     sort = "latest",
// // //   } = query;

// // //   const offset = (Number(page) - 1) * Number(limit);

// // //   let sql = `
// // //       SELECT
// // //           a.*,
// // //           jp.title AS job_title,
// // //           d.department_name
// // //       FROM applications a
// // //       JOIN job_positions jp
// // //           ON a.job_id = jp.id
// // //       JOIN departments d
// // //           ON jp.department_id = d.id
// // //       WHERE 1=1
// // //   `;

// // //   const params = [];

// // //   // Search
// // //   if (search) {
// // //     sql += `
// // //       AND (
// // //         a.first_name LIKE ?
// // //         OR a.last_name LIKE ?
// // //         OR a.email LIKE ?
// // //       )
// // //     `;

// // //     params.push(`%${search}%`, `%${search}%`, `%${search}%`);
// // //   }

// // //   // Status Filter
// // //   if (status) {
// // //     sql += " AND a.status = ?";
// // //     params.push(status);
// // //   }

// // //   // Job Filter
// // //   if (job_id) {
// // //     sql += " AND a.job_id = ?";
// // //     params.push(job_id);
// // //   }

// // //   // Sorting
// // //   sql +=
// // //     sort === "oldest"
// // //       ? " ORDER BY a.applied_at ASC"
// // //       : " ORDER BY a.applied_at DESC";

// // //   // Pagination
// // //   sql += " LIMIT ? OFFSET ?";

// // //   params.push(Number(limit));
// // //   params.push(offset);

// // //   const [rows] = await pool.query(sql, params);

// // //   // Count Query
// // //   let countSql = `
// // //       SELECT COUNT(*) AS total
// // //       FROM applications a
// // //       WHERE 1=1
// // //   `;

// // //   const countParams = [];

// // //   if (search) {
// // //     countSql += `
// // //       AND (
// // //         a.first_name LIKE ?
// // //         OR a.last_name LIKE ?
// // //         OR a.email LIKE ?
// // //       )
// // //     `;

// // //     countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
// // //   }

// // //   if (status) {
// // //     countSql += " AND a.status = ?";
// // //     countParams.push(status);
// // //   }

// // //   if (job_id) {
// // //     countSql += " AND a.job_id = ?";
// // //     countParams.push(job_id);
// // //   }

// // //   const [[count]] = await pool.query(countSql, countParams);

// // //   return {
// // //     applications: rows,
// // //     pagination: {
// // //       page: Number(page),
// // //       limit: Number(limit),
// // //       total: count.total,
// // //       totalPages: Math.ceil(count.total / Number(limit)),
// // //     },
// // //   };
// // // };

// // // const findById = async (id) => {
// // //   const [rows] = await pool.query(
// // //     `
// // //     SELECT
// // //       a.*,
// // //       jp.title AS job_title
// // //     FROM applications a
// // //     JOIN job_positions jp
// // //       ON a.job_id = jp.id
// // //     WHERE a.id = ?
// // //     `,
// // //     [id],
// // //   );

// // //   return rows[0];
// // // };

// // // const updateStatus = async (id, status) => {
// // //   const [result] = await pool.query(
// // //     `
// // //     UPDATE applications
// // //     SET status = ?
// // //     WHERE id = ?
// // //     `,
// // //     [status, id],
// // //   );

// // //   return result;
// // // };

// // // const remove = async (id) => {
// // //   const [result] = await pool.query(
// // //     `
// // //     DELETE FROM applications
// // //     WHERE id = ?
// // //     `,
// // //     [id],
// // //   );

// // //   return result;
// // // };

// // // module.exports = {
// // //   create,
// // //   findAll,
// // //   findById,
// // //   updateStatus,
// // //   remove,
// // // };

// // const pool = require("../config/db");

// // // const create = async (application) => {
// // //   const [result] = await pool.query(
// // //     `
// // //     INSERT INTO applications
// // //     (
// // //       job_id,
// // //       first_name,
// // //       last_name,
// // //       email,
// // //       phone,
// // //       linkedin,
// // //       portfolio,
// // //       experience,
// // //       resume,
// // //       cover_letter
// // //     )
// // //     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// // //     `,
// // //     [
// // //       application.job_id,
// // //       application.first_name,
// // //       application.last_name,
// // //       application.email,
// // //       application.phone,
// // //       application.linkedin,
// // //       application.portfolio,
// // //       application.experience,
// // //       application.resume,
// // //       application.cover_letter,
// // //     ],
// // //   );

// // //   return result.insertId;
// // // };
// // const create = async (application) => {
// //   const [result] = await pool.query(
// //     `
// //       INSERT INTO applications
// //       (
// //         job_id,
// //         first_name,
// //         last_name,
// //         email,
// //         phone,
// //         linkedin,
// //         portfolio,
// //         experience,
// //         resume_key,
// //         resume_original_name,
// //         resume_mime_type,
// //         resume_size,
// //         cover_letter
// //       )
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// //     `,
// //     [
// //       application.job_id,
// //       application.first_name,
// //       application.last_name,
// //       application.email,
// //       application.phone,
// //       application.linkedin,
// //       application.portfolio,
// //       application.experience,
// //       application.resume_key,
// //       application.resume_original_name,
// //       application.resume_mime_type,
// //       application.resume_size,
// //       application.cover_letter,
// //     ],
// //   );

// //   return result.insertId;
// // };

// // const findAll = async (query) => {
// //   const {
// //     page = 1,
// //     limit = 10,
// //     search = "",
// //     status,
// //     job_id,
// //     sort = "latest",
// //   } = query;

// //   const offset = (Number(page) - 1) * Number(limit);

// //   let sql = `
// //     SELECT
// //       a.*,
// //       jp.title AS job_title,
// //       d.department_name
// //     FROM applications a

// //     LEFT JOIN job_positions jp
// //       ON a.job_id = jp.id

// //     LEFT JOIN departments d
// //       ON jp.department_id = d.id

// //     WHERE 1=1
// //   `;

// //   const params = [];

// //   // Search
// //   if (search) {
// //     sql += `
// //       AND (
// //         a.first_name LIKE ?
// //         OR a.last_name LIKE ?
// //         OR a.email LIKE ?
// //       )
// //     `;

// //     params.push(`%${search}%`, `%${search}%`, `%${search}%`);
// //   }

// //   // Status
// //   if (status) {
// //     sql += " AND a.status = ?";
// //     params.push(status);
// //   }

// //   // Job
// //   if (job_id) {
// //     sql += " AND a.job_id = ?";
// //     params.push(job_id);
// //   }

// //   // Sorting
// //   sql +=
// //     sort === "oldest"
// //       ? " ORDER BY a.applied_at ASC"
// //       : " ORDER BY a.applied_at DESC";

// //   // Pagination
// //   sql += " LIMIT ? OFFSET ?";

// //   params.push(Number(limit), offset);

// //   const [rows] = await pool.query(sql, params);

// //   // Count
// //   let countSql = `
// //     SELECT COUNT(*) AS total
// //     FROM applications a
// //     WHERE 1=1
// //   `;

// //   const countParams = [];

// //   if (search) {
// //     countSql += `
// //       AND (
// //         a.first_name LIKE ?
// //         OR a.last_name LIKE ?
// //         OR a.email LIKE ?
// //       )
// //     `;

// //     countParams.push(`%${search}%`, `%${search}%`, `%${search}%`);
// //   }

// //   if (status) {
// //     countSql += " AND a.status = ?";
// //     countParams.push(status);
// //   }

// //   if (job_id) {
// //     countSql += " AND a.job_id = ?";
// //     countParams.push(job_id);
// //   }

// //   const [[count]] = await pool.query(countSql, countParams);

// //   return {
// //     applications: rows,

// //     pagination: {
// //       page: Number(page),
// //       limit: Number(limit),
// //       total: count.total,
// //       totalPages: Math.ceil(count.total / Number(limit)),
// //     },
// //   };
// // };

// // const findById = async (id) => {
// //   const [rows] = await pool.query(
// //     `
// //     SELECT
// //       a.*,
// //       jp.title AS job_title,
// //       d.department_name
// //     FROM applications a

// //     LEFT JOIN job_positions jp
// //       ON a.job_id = jp.id

// //     LEFT JOIN departments d
// //       ON jp.department_id = d.id

// //     WHERE a.id = ?
// //     `,
// //     [id],
// //   );

// //   return rows[0];
// // };

// // const updateStatus = async (id, status) => {
// //   const [result] = await pool.query(
// //     `
// //     UPDATE applications
// //     SET status = ?
// //     WHERE id = ?
// //     `,
// //     [status, id],
// //   );

// //   return result;
// // };

// // const remove = async (id) => {
// //   const [result] = await pool.query(
// //     `
// //     DELETE FROM applications
// //     WHERE id = ?
// //     `,
// //     [id],
// //   );

// //   return result;
// // };

// // module.exports = {
// //   create,
// //   findAll,
// //   findById,
// //   updateStatus,
// //   remove,
// // };

// const pool = require("../config/db");

// /**
//  * =========================================================
//  * CREATE APPLICATION
//  * =========================================================
//  */
// const create = async (application) => {
//   const [result] = await pool.query(
//     `
//       INSERT INTO applications
//       (
//         job_id,
//         first_name,
//         last_name,
//         email,
//         phone,
//         linkedin,
//         portfolio,
//         experience,
//         resume_key,
//         resume_original_name,
//         resume_mime_type,
//         resume_size,
//         cover_letter
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `,
//     [
//       application.job_id,
//       application.first_name,
//       application.last_name,
//       application.email,
//       application.phone || null,
//       application.linkedin || null,
//       application.portfolio || null,
//       application.experience || null,
//       application.resume_key,
//       application.resume_original_name,
//       application.resume_mime_type,
//       application.resume_size,
//       application.cover_letter || null,
//     ],
//   );

//   return result.insertId;
// };

// /**
//  * =========================================================
//  * GET ALL APPLICATIONS
//  * =========================================================
//  */
// const findAll = async (query = {}) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     status,
//     job_id,
//     sort = "latest",
//   } = query;

//   const pageNumber = Math.max(Number(page) || 1, 1);
//   const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

//   const offset = (pageNumber - 1) * limitNumber;

//   let sql = `
//     SELECT
//       a.*,
//       jp.title AS job_title,
//       d.department_name
//     FROM applications a

//     LEFT JOIN job_positions jp
//       ON a.job_id = jp.id

//     LEFT JOIN departments d
//       ON jp.department_id = d.id

//     WHERE 1=1
//   `;

//   const params = [];

//   /**
//    * Search
//    */
//   if (search) {
//     sql += `
//       AND (
//         a.first_name LIKE ?
//         OR a.last_name LIKE ?
//         OR a.email LIKE ?
//       )
//     `;

//     const searchValue = `%${search}%`;

//     params.push(searchValue, searchValue, searchValue);
//   }

//   /**
//    * Status
//    */
//   if (status) {
//     sql += ` AND a.status = ?`;
//     params.push(status);
//   }

//   /**
//    * Job
//    */
//   if (job_id) {
//     sql += ` AND a.job_id = ?`;
//     params.push(job_id);
//   }

//   /**
//    * Sorting
//    */
//   sql +=
//     sort === "oldest"
//       ? ` ORDER BY a.applied_at ASC`
//       : ` ORDER BY a.applied_at DESC`;

//   /**
//    * Pagination
//    */
//   sql += ` LIMIT ? OFFSET ?`;

//   params.push(limitNumber, offset);

//   const [rows] = await pool.query(sql, params);

//   /**
//    * Count
//    */
//   let countSql = `
//     SELECT COUNT(*) AS total
//     FROM applications a
//     WHERE 1=1
//   `;

//   const countParams = [];

//   if (search) {
//     countSql += `
//       AND (
//         a.first_name LIKE ?
//         OR a.last_name LIKE ?
//         OR a.email LIKE ?
//       )
//     `;

//     const searchValue = `%${search}%`;

//     countParams.push(searchValue, searchValue, searchValue);
//   }

//   if (status) {
//     countSql += ` AND a.status = ?`;
//     countParams.push(status);
//   }

//   if (job_id) {
//     countSql += ` AND a.job_id = ?`;
//     countParams.push(job_id);
//   }

//   const [[count]] = await pool.query(countSql, countParams);

//   return {
//     applications: rows,
//     pagination: {
//       page: pageNumber,
//       limit: limitNumber,
//       total: Number(count.total),
//       totalPages: Math.ceil(Number(count.total) / limitNumber),
//     },
//   };
// };

// /**
//  * =========================================================
//  * GET APPLICATION BY ID
//  * =========================================================
//  */
// const findById = async (id) => {
//   const [rows] = await pool.query(
//     `
//       SELECT
//         a.*,
//         jp.title AS job_title,
//         d.department_name
//       FROM applications a

//       LEFT JOIN job_positions jp
//         ON a.job_id = jp.id

//       LEFT JOIN departments d
//         ON jp.department_id = d.id

//       WHERE a.id = ?
//       LIMIT 1
//     `,
//     [id],
//   );

//   return rows[0] || null;
// };

// /**
//  * =========================================================
//  * UPDATE STATUS
//  * =========================================================
//  */
// const updateStatus = async (id, status) => {
//   const [result] = await pool.query(
//     `
//       UPDATE applications
//       SET status = ?
//       WHERE id = ?
//     `,
//     [status, id],
//   );

//   return result;
// };

// /**
//  * =========================================================
//  * DELETE APPLICATION
//  * =========================================================
//  */
// const remove = async (id) => {
//   const [result] = await pool.query(
//     `
//       DELETE FROM applications
//       WHERE id = ?
//     `,
//     [id],
//   );

//   return result;
// };

// module.exports = {
//   create,
//   findAll,
//   findById,
//   updateStatus,
//   remove,
// };

// const pool = require("../config/db");

// /**
//  * =========================================================
//  * CREATE APPLICATION
//  * =========================================================
//  */
// const create = async (application) => {
//   const [result] = await pool.query(
//     `
//       INSERT INTO applications
//       (
//         job_id,
//         first_name,
//         last_name,
//         email,
//         phone,
//         current_location,
//         linkedin,
//         portfolio,
//         experience,
//         salary_expectation,
//         availability,
//         source,
//         authorized_to_work,
//         requires_sponsorship,
//         resume_key,
//         resume_original_name,
//         resume_mime_type,
//         resume_size,
//         cover_letter
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `,
//     [
//       application.job_id,
//       application.first_name,
//       application.last_name,
//       application.email,
//       application.phone || null,
//       application.current_location || null,
//       application.linkedin || null,
//       application.portfolio || null,
//       application.experience || null,
//       application.salary_expectation || null,
//       application.availability || null,
//       application.source || null,
//       application.authorized_to_work || null,
//       application.requires_sponsorship || null,
//       application.resume_key,
//       application.resume_original_name,
//       application.resume_mime_type,
//       application.resume_size,
//       application.cover_letter || null,
//     ],
//   );

//   return result.insertId;
// };

// /**
//  * =========================================================
//  * GET ALL APPLICATIONS
//  * =========================================================
//  */
// const findAll = async (query = {}) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     status,
//     job_id,
//     sort = "latest",
//   } = query;

//   const pageNumber = Math.max(Number(page) || 1, 1);
//   const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

//   const offset = (pageNumber - 1) * limitNumber;

//   let sql = `
//     SELECT
//       a.*,
//       jp.title AS job_title,
//       d.department_name
//     FROM applications a

//     LEFT JOIN job_positions jp
//       ON a.job_id = jp.id

//     LEFT JOIN departments d
//       ON jp.department_id = d.id

//     WHERE 1=1
//   `;

//   const params = [];

//   /**
//    * Search
//    */
//   if (search) {
//     sql += `
//       AND (
//         a.first_name LIKE ?
//         OR a.last_name LIKE ?
//         OR a.email LIKE ?
//       )
//     `;

//     const searchValue = `%${search}%`;

//     params.push(searchValue, searchValue, searchValue);
//   }

//   /**
//    * Status
//    */
//   if (status) {
//     sql += ` AND a.status = ?`;
//     params.push(status);
//   }

//   /**
//    * Job
//    */
//   if (job_id) {
//     sql += ` AND a.job_id = ?`;
//     params.push(job_id);
//   }

//   /**
//    * Sorting
//    */
//   sql +=
//     sort === "oldest"
//       ? ` ORDER BY a.applied_at ASC`
//       : ` ORDER BY a.applied_at DESC`;

//   /**
//    * Pagination
//    */
//   sql += ` LIMIT ? OFFSET ?`;

//   params.push(limitNumber, offset);

//   const [rows] = await pool.query(sql, params);

//   /**
//    * Count
//    */
//   let countSql = `
//     SELECT COUNT(*) AS total
//     FROM applications a
//     WHERE 1=1
//   `;

//   const countParams = [];

//   if (search) {
//     countSql += `
//       AND (
//         a.first_name LIKE ?
//         OR a.last_name LIKE ?
//         OR a.email LIKE ?
//       )
//     `;

//     const searchValue = `%${search}%`;

//     countParams.push(searchValue, searchValue, searchValue);
//   }

//   if (status) {
//     countSql += ` AND a.status = ?`;
//     countParams.push(status);
//   }

//   if (job_id) {
//     countSql += ` AND a.job_id = ?`;
//     countParams.push(job_id);
//   }

//   const [[count]] = await pool.query(countSql, countParams);

//   return {
//     applications: rows,
//     pagination: {
//       page: pageNumber,
//       limit: limitNumber,
//       total: Number(count.total),
//       totalPages: Math.ceil(Number(count.total) / limitNumber),
//     },
//   };
// };

// /**
//  * =========================================================
//  * GET APPLICATION BY ID
//  * =========================================================
//  */
// const findById = async (id) => {
//   const [rows] = await pool.query(
//     `
//       SELECT
//         a.*,
//         jp.title AS job_title,
//         d.department_name
//       FROM applications a

//       LEFT JOIN job_positions jp
//         ON a.job_id = jp.id

//       LEFT JOIN departments d
//         ON jp.department_id = d.id

//       WHERE a.id = ?
//       LIMIT 1
//     `,
//     [id],
//   );

//   return rows[0] || null;
// };

// /**
//  * =========================================================
//  * UPDATE STATUS
//  * =========================================================
//  */
// const updateStatus = async (id, status) => {
//   const [result] = await pool.query(
//     `
//       UPDATE applications
//       SET status = ?
//       WHERE id = ?
//     `,
//     [status, id],
//   );

//   return result;
// };

// /**
//  * =========================================================
//  * DELETE APPLICATION
//  * =========================================================
//  */
// const remove = async (id) => {
//   const [result] = await pool.query(
//     `
//       DELETE FROM applications
//       WHERE id = ?
//     `,
//     [id],
//   );

//   return result;
// };

// module.exports = {
//   create,
//   findAll,
//   findById,
//   updateStatus,
//   remove,
// };

const pool = require("../config/db");

/**
 * =========================================================
 * CREATE APPLICATION
 * =========================================================
 */
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
        current_location,
        linkedin,
        portfolio,
        experience,
        salary_expectation,
        availability,
        source,
        authorized_to_work,
        requires_sponsorship,
        resume_key,
        resume_original_name,
        resume_mime_type,
        resume_size,
        cover_letter
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      application.job_id,
      application.first_name,
      application.last_name,
      application.email,
      application.phone || null,
      application.current_location || null,
      application.linkedin || null,
      application.portfolio || null,
      application.experience || null,
      application.salary_expectation || null,
      application.availability || null,
      application.source || null,
      application.authorized_to_work || null,
      application.requires_sponsorship || null,
      application.resume_key,
      application.resume_original_name,
      application.resume_mime_type,
      application.resume_size,
      application.cover_letter || null,
    ],
  );

  return result.insertId;
};

/**
 * =========================================================
 * GET ALL APPLICATIONS
 * =========================================================
 */
const findAll = async (query = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    job_id,
    sort = "latest",
  } = query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const limitNumber = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const offset = (pageNumber - 1) * limitNumber;

  let sql = `
    SELECT
      a.*,
      jp.title AS job_title,
      d.department_name
    FROM applications a

    LEFT JOIN job_positions jp
      ON a.job_id = jp.id

    LEFT JOIN departments d
      ON jp.department_id = d.id

    WHERE 1=1
  `;

  const params = [];

  /**
   * Search
   */
  if (search) {
    sql += `
      AND (
        a.first_name LIKE ?
        OR a.last_name LIKE ?
        OR a.email LIKE ?
      )
    `;

    const searchValue = `%${search}%`;

    params.push(searchValue, searchValue, searchValue);
  }

  /**
   * Status
   */
  if (status) {
    sql += ` AND a.status = ?`;
    params.push(status);
  }

  /**
   * Job
   */
  if (job_id) {
    sql += ` AND a.job_id = ?`;
    params.push(job_id);
  }

  /**
   * Sorting
   */
  sql +=
    sort === "oldest"
      ? ` ORDER BY a.applied_at ASC`
      : ` ORDER BY a.applied_at DESC`;

  /**
   * Pagination
   */
  sql += ` LIMIT ? OFFSET ?`;

  params.push(limitNumber, offset);

  const [rows] = await pool.query(sql, params);

  /**
   * Count
   */
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

    const searchValue = `%${search}%`;

    countParams.push(searchValue, searchValue, searchValue);
  }

  if (status) {
    countSql += ` AND a.status = ?`;
    countParams.push(status);
  }

  if (job_id) {
    countSql += ` AND a.job_id = ?`;
    countParams.push(job_id);
  }

  const [[count]] = await pool.query(countSql, countParams);

  return {
    applications: rows,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total: Number(count.total),
      totalPages: Math.ceil(Number(count.total) / limitNumber),
    },
  };
};

/**
 * =========================================================
 * GET APPLICATION BY ID
 * =========================================================
 */
const findById = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT
        a.*,
        jp.title AS job_title,
        d.department_name
      FROM applications a

      LEFT JOIN job_positions jp
        ON a.job_id = jp.id

      LEFT JOIN departments d
        ON jp.department_id = d.id

      WHERE a.id = ?
      LIMIT 1
    `,
    [id],
  );

  return rows[0] || null;
};

/**
 * =========================================================
 * UPDATE STATUS
 * =========================================================
 */
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

/**
 * =========================================================
 * UPDATE INTERVIEW APPROVAL STATUS
 * =========================================================
 */
const updateInterviewApprovalStatus = async (id, status, adminId = null) => {
  let sql = `UPDATE applications SET interview_approval_status = ?`;
  const params = [status];

  if (status === "Approved") {
    sql += `, approved_by = ?, approved_at = NOW()`;
    params.push(adminId);
  } else if (status === "Rejected") {
    sql += `, approved_by = ?, approved_at = NULL`;
    params.push(adminId);
  } else if (status === "Pending") {
    sql += `, approved_by = NULL, approved_at = NULL`;
  }

  sql += ` WHERE id = ?`;
  params.push(id);

  const [result] = await pool.query(sql, params);

  return result;
};

/**
 * =========================================================
 * DELETE APPLICATION
 * =========================================================
 */
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
  updateInterviewApprovalStatus,
  remove,
};
