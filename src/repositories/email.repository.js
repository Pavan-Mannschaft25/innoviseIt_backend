const pool = require("../config/db");

// const findAll = async () => {
//   const [rows] = await pool.query(`
//       SELECT
//       e.*,
//       a.full_name AS sender_name
//       FROM email_logs e
//       LEFT JOIN admins a
//       ON e.sent_by=a.id
//       ORDER BY e.created_at DESC
//   `);

//   return rows;
// };

const findAll = async ({ page = 1, limit = 10, search = "", status = "" }) => {
  const offset = (page - 1) * limit;

  let sql = `
    SELECT
      e.*,
      a.full_name AS sender_name
    FROM email_logs e
    LEFT JOIN admins a
      ON e.sent_by = a.id
    WHERE 1=1
  `;

  const values = [];

  if (search) {
    sql += `
      AND (
        e.recipient LIKE ?
        OR e.subject LIKE ?
      )
    `;

    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }

  if (status) {
    sql += ` AND e.status=? `;
    values.push(status);
  }

  sql += `
    ORDER BY e.created_at DESC
    LIMIT ?
    OFFSET ?
  `;

  values.push(Number(limit));
  values.push(offset);

  const [rows] = await pool.query(sql, values);

  return rows;
};

const count = async ({ search = "", status = "" }) => {
  let sql = `
      SELECT COUNT(*) total
      FROM email_logs
      WHERE 1=1
  `;

  const values = [];

  if (search) {
    sql += `
    AND (
      recipient LIKE ?
      OR subject LIKE ?
    )
    `;

    values.push(`%${search}%`);
    values.push(`%${search}%`);
  }

  if (status) {
    sql += ` AND status=?`;

    values.push(status);
  }

  const [rows] = await pool.query(sql, values);

  return rows[0].total;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `
      SELECT
      e.*,
      a.full_name AS sender_name
      FROM email_logs e
      LEFT JOIN admins a
      ON e.sent_by=a.id
      WHERE e.id=?
      `,
    [id],
  );

  return rows[0];
};

const create = async (email) => {
  const [result] = await pool.query(
    `
    INSERT INTO email_logs
    (
      recipient,
      subject,
      body,
      status,
      error_message,
      sent_by
    )
    VALUES(?,?,?,?,?,?)
    `,
    [
      email.recipient,
      email.subject,
      email.body,
      email.status,
      email.error_message || null,
      email.sent_by,
    ],
  );

  return result.insertId;
};

const update = async (id, email) => {
  await pool.query(
    `
      UPDATE email_logs
      SET
      recipient=?,
      subject=?,
      body=?,
      status=?
      WHERE id=?
      `,

    [email.recipient, email.subject, email.body, email.status, id],
  );
};

const updateStatus = async (id, status, errorMessage = null) => {
  await pool.query(
    `
    UPDATE email_logs
    SET
      status=?,
      error_message=?,
      updated_at=NOW()
    WHERE id=?
    `,
    [status, errorMessage, id],
  );
};

const remove = async (id) => {
  await pool.query("DELETE FROM email_logs WHERE id=?", [id]);
};

module.exports = {
  findAll,
  count,
  findById,
  create,
  update,
  updateStatus,
  remove,
};
