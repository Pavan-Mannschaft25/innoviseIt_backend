// const pool = require("../config/db");

// // const findAll = async () => {
// //   const [rows] = await pool.query(
// //     `SELECT
// //         id,
// //         full_name,
// //         email,
// //         role,
// //         created_at
// //      FROM admins
// //      ORDER BY created_at DESC`,
// //   );

// //   return rows;
// // };
// // const findAll = async (filters) => {
// //   const {
// //     page = 1,
// //     limit = 10,
// //     search = "",
// //     module,
// //     action,
// //     admin,
// //     sort = "created_at",
// //     order = "DESC",
// //   } = filters;

// //   const offset = (page - 1) * limit;

// //   let sql = `
// //     SELECT
// //       al.*,
// //       a.full_name,
// //       a.email,
// //       a.role
// //     FROM audit_logs al
// //     INNER JOIN admins a
// //       ON al.admin_id = a.id
// //     WHERE 1=1
// //   `;

// //   const values = [];

// //   if (search) {
// //     sql += `
// //       AND (
// //         al.description LIKE ?
// //         OR a.full_name LIKE ?
// //         OR a.email LIKE ?
// //       )
// //     `;

// //     values.push(`%${search}%`, `%${search}%`, `%${search}%`);
// //   }

// //   if (module) {
// //     sql += ` AND al.module = ?`;
// //     values.push(module);
// //   }

// //   if (action) {
// //     sql += ` AND al.action = ?`;
// //     values.push(action);
// //   }

// //   if (admin) {
// //     sql += ` AND al.admin_id = ?`;
// //     values.push(admin);
// //   }

// //   sql += ` ORDER BY ${sort} ${order}`;

// //   sql += ` LIMIT ? OFFSET ?`;

// //   values.push(Number(limit), Number(offset));

// //   const [rows] = await pool.query(sql, values);

// //   let countSql = `
// //     SELECT COUNT(*) AS total
// //     FROM audit_logs al
// //     INNER JOIN admins a
// //       ON al.admin_id = a.id
// //     WHERE 1=1
// //   `;

// //   const countValues = [];

// //   if (search) {
// //     countSql += `
// //       AND (
// //         al.description LIKE ?
// //         OR a.full_name LIKE ?
// //         OR a.email LIKE ?
// //       )
// //     `;

// //     countValues.push(`%${search}%`, `%${search}%`, `%${search}%`);
// //   }

// //   if (module) {
// //     countSql += ` AND al.module = ?`;
// //     countValues.push(module);
// //   }

// //   if (action) {
// //     countSql += ` AND al.action = ?`;
// //     countValues.push(action);
// //   }

// //   if (admin) {
// //     countSql += ` AND al.admin_id = ?`;
// //     countValues.push(admin);
// //   }

// //   const [[count]] = await pool.query(countSql, countValues);

// //   return {
// //     data: rows,
// //     total: count.total,
// //     page: Number(page),
// //     limit: Number(limit),
// //     totalPages: Math.ceil(count.total / limit),
// //   };
// // };
// const findAll = async (filters = {}) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     role = "",
//     sort = "created_at",
//     order = "DESC",
//   } = filters;

//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT
//       id,
//       full_name,
//       email,
//       role,
//       created_at
//     FROM admins
//     WHERE 1=1
//   `;

//   const values = [];

//   if (search) {
//     sql += `
//       AND (
//         full_name LIKE ?
//         OR email LIKE ?
//       )
//     `;

//     values.push(`%${search}%`, `%${search}%`);
//   }

//   if (role) {
//     sql += ` AND role=?`;
//     values.push(role);
//   }

//   sql += ` ORDER BY ${sort} ${order}`;
//   sql += ` LIMIT ? OFFSET ?`;

//   values.push(Number(limit), Number(offset));

//   const [rows] = await pool.query(sql, values);

//   let countSql = `
//       SELECT COUNT(*) total
//       FROM admins
//       WHERE 1=1
//   `;

//   const countValues = [];

//   if (search) {
//     countSql += `
//       AND (
//         full_name LIKE ?
//         OR email LIKE ?
//       )
//     `;

//     countValues.push(`%${search}%`, `%${search}%`);
//   }

//   if (role) {
//     countSql += ` AND role=?`;
//     countValues.push(role);
//   }

//   const [[count]] = await pool.query(countSql, countValues);

//   return {
//     data: rows,
//     total: count.total,
//     page,
//     limit,
//     totalPages: Math.ceil(count.total / limit),
//   };
// };

// const findById = async (id) => {
//   const [rows] = await pool.query(
//     `SELECT
//         id,
//         full_name,
//         email,
//         role,
//         created_at
//      FROM admins
//      WHERE id=?`,
//     [id],
//   );

//   return rows[0];
// };

// // const findByEmail = async (email) => {
// //   const [rows] = await pool.query("SELECT * FROM admins WHERE email=?", [
// //     email,
// //   ]);

// //   return rows[0];
// // };

// // const create = async (admin) => {
// //   const [result] = await pool.query(
// //     `INSERT INTO admins
// //     (
// //       full_name,
// //       email,
// //       password,
// //       role
// //     )
// //     VALUES(?,?,?,?)`,
// //     [admin.full_name, admin.email, admin.password, admin.role],
// //   );

// //   return result.insertId;
// // };
// const findByEmail = async (email) => {
//   const [rows] = await pool.query(
//     "SELECT * FROM admins WHERE email = ?",

//     [email],
//   );

//   return rows[0];
// };

// const create = async (admin) => {
//   const [result] = await pool.query(
//     `
//     INSERT INTO admins
//     (
//         full_name,
//         email,
//         password,
//         role
//     )
//     VALUES
//     (
//         ?, ?, ?, ?
//     )
//     `,

//     [admin.full_name, admin.email, admin.password, admin.role],
//   );

//   return result.insertId;
// };

// const update = async (id, data) => {
//   const [result] = await pool.query(
//     `
//     UPDATE admins
//     SET
//       full_name=?,
//       email=?
//     WHERE id=?
//     `,
//     [data.full_name, data.email, id],
//   );

//   return result;
// };

// const updateRole = async (id, role) => {
//   const [result] = await pool.query(
//     `
//     UPDATE admins
//     SET role=?
//     WHERE id=?
//     `,
//     [role, id],
//   );

//   return result;
// };

// const updatePassword = async (id, password) => {
//   const [result] = await pool.query(
//     `
//     UPDATE admins
//     SET password=?
//     WHERE id=?
//     `,
//     [password, id],
//   );

//   return result;
// };

// const remove = async (id) => {
//   const [result] = await pool.query(
//     `
//     DELETE FROM admins
//     WHERE id=?
//     `,
//     [id],
//   );

//   return result;
// };

// module.exports = {
//   findAll,
//   findById,
//   findByEmail,
//   create,
//   update,
//   updateRole,
//   updatePassword,
//   remove,
// };

const pool = require("../config/db");

const findAll = async (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    role = "",
    status = "",
    sort = "created_at",
    order = "DESC",
  } = filters;

  const offset = (page - 1) * limit;
  let sql = `
    SELECT id, full_name, email, role, status, last_login, created_at
    FROM admins WHERE 1=1
  `;
  const values = [];

  if (search) {
    sql += ` AND (full_name LIKE ? OR email LIKE ?)`;
    values.push(`%${search}%`, `%${search}%`);
  }
  if (role) {
    sql += ` AND role = ?`;
    values.push(role);
  }
  if (status) {
    sql += ` AND status = ?`;
    values.push(status);
  }

  sql += ` ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
  values.push(Number(limit), Number(offset));

  const [rows] = await pool.query(sql, values);

  let countSql = `SELECT COUNT(*) as total FROM admins WHERE 1=1`;
  const countValues = [];
  if (search) {
    countSql += ` AND (full_name LIKE ? OR email LIKE ?)`;
    countValues.push(`%${search}%`, `%${search}%`);
  }
  if (role) {
    countSql += ` AND role = ?`;
    countValues.push(role);
  }
  if (status) {
    countSql += ` AND status = ?`;
    countValues.push(status);
  }

  const [[count]] = await pool.query(countSql, countValues);

  return {
    data: rows,
    total: count.total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(count.total / limit),
  };
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, role, status, last_login, created_at FROM admins WHERE id = ?`,
    [id],
  );
  return rows[0];
};

const findByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const create = async (admin) => {
  const [result] = await pool.query(
    `INSERT INTO admins (full_name, email, password, role, status) VALUES (?, ?, ?, ?, ?)`,
    [
      admin.full_name,
      admin.email,
      admin.password,
      admin.role,
      admin.status || "Active",
    ],
  );
  return result.insertId;
};

const update = async (id, data) => {
  const [result] = await pool.query(
    `UPDATE admins SET full_name = ?, email = ?, status = ? WHERE id = ?`,
    [data.full_name, data.email, data.status, id],
  );
  return result;
};

const updateRole = async (id, role) => {
  const [result] = await pool.query(`UPDATE admins SET role = ? WHERE id = ?`, [
    role,
    id,
  ]);
  return result;
};

const updatePassword = async (id, password) => {
  const [result] = await pool.query(
    `UPDATE admins SET password = ? WHERE id = ?`,
    [password, id],
  );
  return result;
};

const remove = async (id) => {
  const [result] = await pool.query(`DELETE FROM admins WHERE id = ?`, [id]);
  return result;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  updateRole,
  updatePassword,
  remove,
};
