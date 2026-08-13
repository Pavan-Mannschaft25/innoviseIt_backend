// const repository = require("../repositories/emailTemplate.repository");

// const getAll = async () => {
//   return await repository.findAll();
// };

// const getById = async (id) => {
//   const template = await repository.findById(id);

//   if (!template) {
//     throw new Error("Email template not found");
//   }

//   return template;
// };

// const create = async (data) => {
//   return await repository.create(data);
// };

// const update = async (id, data) => {
//   await getById(id);

//   await repository.update(id, data);
// };

// const remove = async (id) => {
//   await getById(id);

//   await repository.remove(id);
// };

// module.exports = {
//   getAll,
//   getById,
//   create,
//   update,
//   remove,
// };

const repository = require("../repositories/emailTemplate.repository");

const getAll = async () => {
  return await repository.findAll();
};

const getById = async (id) => {
  const template = await repository.findById(id);

  if (!template) {
    throw new Error("Email template not found");
  }

  return template;
};

// Find template by name
const getByName = async (name) => {
  const template = await repository.findByName(name);

  if (!template) {
    throw new Error(`Email template not found: ${name}`);
  }

  return template;
};

const create = async (data) => {
  return await repository.create(data);
};

const update = async (id, data) => {
  await getById(id);

  await repository.update(id, data);
};

const remove = async (id) => {
  await getById(id);

  await repository.remove(id);
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
};
