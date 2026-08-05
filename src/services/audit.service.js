const auditRepository = require("../repositories/audit.repository");

/**
 * Create Audit Log
 */
const create = async (auditData) => {
  return await auditRepository.create(auditData);
};

/**
 * Get All Audit Logs
 */
const getAll = async (filters) => {
  return await auditRepository.findAll(filters);
};

/**
 * Get Audit Log By ID
 */
const getById = async (id) => {
  const log = await auditRepository.findById(id);

  if (!log) {
    throw new Error("Audit log not found");
  }

  return log;
};

/**
 * Get Logs By Admin
 */
const getByAdmin = async (adminId) => {
  return await auditRepository.findByAdmin(adminId);
};

/**
 * Get Logs By Module
 */
const getByModule = async (module) => {
  return await auditRepository.findByModule(module);
};

/**
 * Helper Method
 * Used by the whole application
 */
const logActivity = async ({
  admin_id,
  module,
  action,
  description,
  ip_address,
  user_agent,
}) => {
  return await auditRepository.create({
    admin_id,
    module,
    action,
    description,
    ip_address,
    user_agent,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  getByAdmin,
  getByModule,
  logActivity,
};
