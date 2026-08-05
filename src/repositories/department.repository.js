const pool = require("../config/db");

const findAll = async () => {
  const [rows] = await pool.query(`SELECT * FROM departments ORDER BY id DESC`);
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM departments WHERE id = ?`, [
    id,
  ]);
  return rows[0];
};

const create = async (department) => {
  const { department_name, description } = department;

  const [result] = await pool.query(
    `INSERT INTO departments (department_name, description)
     VALUES (?, ?)`,
    [department_name, description],
  );

  return result.insertId;
};

const update = async (id, department) => {
  const { department_name, description } = department;

  await pool.query(
    `UPDATE departments
     SET department_name = ?, description = ?
     WHERE id = ?`,
    [department_name, description, id],
  );
};

const remove = async (id) => {
  await pool.query(`DELETE FROM departments WHERE id = ?`, [id]);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
