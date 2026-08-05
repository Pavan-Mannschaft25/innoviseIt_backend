const jobRepository = require("../repositories/job.repository");
const departmentRepository = require("../repositories/department.repository");
const ApiError = require("../utils/ApiError");

const getAll = async (query) => {
  return await jobRepository.findAll(query);
};

const getById = async (id) => {
  const job = await jobRepository.findById(id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};

const create = async (data) => {
  const department = await departmentRepository.findById(data.department_id);

  if (!department) {
    throw new ApiError(400, "Invalid department");
  }

  return await jobRepository.create(data);
};

const update = async (id, data) => {
  await getById(id);

  const department = await departmentRepository.findById(data.department_id);

  if (!department) {
    throw new ApiError(400, "Invalid department");
  }

  await jobRepository.update(id, data);
};

const remove = async (id) => {
  await getById(id);

  await jobRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
