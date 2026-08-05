const departmentRepository = require("../repositories/department.repository");

const getAll = async () => {
  return await departmentRepository.findAll();
};

const getById = async (id) => {
  const department = await departmentRepository.findById(id);

  if (!department) {
    throw new Error("Department not found");
  }

  return department;
};

const create = async (data) => {
  return await departmentRepository.create(data);
};

const update = async (id, data) => {
  await getById(id);
  await departmentRepository.update(id, data);
};

const remove = async (id) => {
  await getById(id);
  await departmentRepository.remove(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
