// const pool = require("../config/db");

// const findAll = async () => {
//   const [rows] = await pool.query(
//     "SELECT * FROM email_templates ORDER BY created_at DESC",
//   );

//   return rows;
// };

// const findById = async (id) => {
//   const [rows] = await pool.query("SELECT * FROM email_templates WHERE id=?", [
//     id,
//   ]);

//   return rows[0];
// };

// const create = async (template) => {
//   const [result] = await pool.query(
//     `
//     INSERT INTO email_templates
//     (
//         name,
//         subject,
//         body
//     )
//     VALUES(?,?,?)
//     `,
//     [template.name, template.subject, template.body],
//   );

//   return result.insertId;
// };

// const update = async (id, template) => {
//   await pool.query(
//     `
//     UPDATE email_templates
//     SET
//       name=?,
//       subject=?,
//       body=?
//     WHERE id=?
//     `,
//     [template.name, template.subject, template.body, id],
//   );
// };

// const remove = async (id) => {
//   await pool.query("DELETE FROM email_templates WHERE id=?", [id]);
// };

// module.exports = {
//   findAll,
//   findById,
//   create,
//   update,
//   remove,
// };

const pool = require("../config/db");

const findAll = async () => {
  const [rows] = await pool.query(
    "SELECT * FROM email_templates ORDER BY created_at DESC",
  );

  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM email_templates WHERE id = ?",
    [id],
  );

  return rows[0];
};

// Find template by name
const findByName = async (name) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM email_templates
    WHERE name = ?
    LIMIT 1
    `,
    [name],
  );

  return rows[0];
};

const create = async (template) => {
  const [result] = await pool.query(
    `
    INSERT INTO email_templates
    (
      name,
      subject,
      body
    )
    VALUES (?, ?, ?)
    `,
    [template.name, template.subject, template.body],
  );

  return result.insertId;
};

const update = async (id, template) => {
  await pool.query(
    `
    UPDATE email_templates
    SET
      name = ?,
      subject = ?,
      body = ?
    WHERE id = ?
    `,
    [template.name, template.subject, template.body, id],
  );
};

const remove = async (id) => {
  await pool.query("DELETE FROM email_templates WHERE id = ?", [id]);
};

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
};
