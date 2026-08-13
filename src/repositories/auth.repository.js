// const pool = require("../config/db");

// const findAdminByEmail = async (email) => {
//   const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [
//     email,
//   ]);

//   return rows[0];
// };

const pool = require("../config/db");

const findAdminByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [
    email,
  ]);

  return rows[0];
};

const saveResetToken = async (email, token, expiry) => {
  await pool.query(
    `
    UPDATE admins
    SET
        reset_token = ?,
        reset_token_expiry = ?
    WHERE email = ?
    `,
    [token, expiry, email],
  );
};

const findByResetToken = async (token) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM admins
    WHERE reset_token = ?
      AND reset_token_expiry > NOW()
    `,
    [token],
  );

  return rows[0];
};

const updatePassword = async (id, password) => {
  await pool.query(
    `
    UPDATE admins
    SET
      password = ?,
      reset_token = NULL,
      reset_token_expiry = NULL
    WHERE id = ?
    `,
    [password, id],
  );
};

const clearResetToken = async (id) => {
  await pool.query(
    `
      UPDATE admins
      SET
        reset_token = NULL,
        reset_token_expiry = NULL
      WHERE id = ?
    `,
    [id],
  );
};

module.exports = {
  findAdminByEmail,
  saveResetToken,
  findByResetToken,
  updatePassword,
  clearResetToken,
};
