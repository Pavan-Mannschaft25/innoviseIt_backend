const pool = require("../config/db");

const create = async (data) => {
  const [result] = await pool.query(
    `
    INSERT INTO interviews
    (
      application_id,
      interview_date,
      interview_time,
      interview_timezone,
      duration_minutes,
      interview_type,
      interviewer_name,
      meeting_link,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      data.application_id,
      data.interview_date,
      data.interview_time,
      data.interview_timezone,
      data.duration_minutes,
      data.interview_type,
      data.interviewer_name,
      data.meeting_link,
      data.status || "Scheduled",
    ],
  );

  return result.insertId;
};

const findById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      i.*,
      a.first_name,
      a.last_name,
      a.email,
      a.phone,
      a.job_id,
      jp.title AS job_title,
      d.department_name

    FROM interviews i

    JOIN applications a
      ON i.application_id = a.id

    JOIN job_positions jp
      ON a.job_id = jp.id

    LEFT JOIN departments d
      ON jp.department_id = d.id

    WHERE i.id = ?
    `,
    [id],
  );

  return rows[0];
};

const findByApplicationId = async (applicationId) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM interviews
    WHERE application_id = ?
    ORDER BY interview_date DESC, interview_time DESC
    `,
    [applicationId],
  );

  return rows;
};

const update = async (id, data) => {
  await pool.query(
    `
    UPDATE interviews
    SET
      interview_date = ?,
      interview_time = ?,
      interview_timezone = ?,
      duration_minutes = ?,
      interview_type = ?,
      interviewer_name = ?,
      meeting_link = ?,
      status = ?
    WHERE id = ?
    `,
    [
      data.interview_date,
      data.interview_time,
      data.interview_timezone,
      data.duration_minutes,
      data.interview_type,
      data.interviewer_name,
      data.meeting_link,
      data.status,
      id,
    ],
  );
};

const updateStatus = async (id, status) => {
  await pool.query(
    `
    UPDATE interviews
    SET status = ?
    WHERE id = ?
    `,
    [status, id],
  );
};

const remove = async (id) => {
  await pool.query(
    `
    DELETE FROM interviews
    WHERE id = ?
    `,
    [id],
  );
};

module.exports = {
  create,
  findById,
  findByApplicationId,
  update,
  updateStatus,
  remove,
};
