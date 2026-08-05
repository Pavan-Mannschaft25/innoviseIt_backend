const pool = require("../config/db");

/**
 * Create Audit Log
 */
const create = async (audit) => {
  const sql = `
    INSERT INTO audit_logs
    (
      admin_id,
      module,
      action,
      description,
      ip_address,
      user_agent
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await pool.query(sql, [
    audit.admin_id,
    audit.module,
    audit.action,
    audit.description,
    audit.ip_address,
    audit.user_agent,
  ]);

  return result.insertId;
};

/**
 * Get All Audit Logs
 */
const findAll = async () => {
  const sql = `
    SELECT
      al.*,
      a.full_name,
      a.email,
      a.role
    FROM audit_logs al
    INNER JOIN admins a
      ON al.admin_id = a.id
    ORDER BY al.created_at DESC
  `;

  const [rows] = await pool.query(sql);

  return rows;
};

/**
 * Get Audit Log By ID
 */
const findById = async (id) => {
  const sql = `
    SELECT
      al.*,
      a.full_name,
      a.email,
      a.role
    FROM audit_logs al
    INNER JOIN admins a
      ON al.admin_id = a.id
    WHERE al.id = ?
  `;

  const [rows] = await pool.query(sql, [id]);

  return rows[0];
};

/**
 * Get Logs By Admin
 */
const findByAdmin = async (adminId) => {
  const sql = `
    SELECT *
    FROM audit_logs
    WHERE admin_id = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(sql, [adminId]);

  return rows;
};

/**
 * Get Logs By Module
 */
const findByModule = async (module) => {
  const sql = `
    SELECT *
    FROM audit_logs
    WHERE module = ?
    ORDER BY created_at DESC
  `;

  const [rows] = await pool.query(sql, [module]);

  return rows;
};

module.exports = {
  create,
  findAll,
  findById,
  findByAdmin,
  findByModule,
};
